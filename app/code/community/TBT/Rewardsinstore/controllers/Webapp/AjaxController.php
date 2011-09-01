<?php

require_once ('app/code/community/TBT/Rewardsinstore/controllers/RewardsinstoreController.php');
class TBT_Rewardsinstore_Webapp_AjaxController extends TBT_Rewardsinstore_RewardsinstoreController
{

    protected function _construct()
    {
        parent::_construct();
        $this->_usedModuleName = "rewardsinstore";
        
        //if (Mage::getSingleton('admin/session')->isLoggedIn() && !$this->getRequest()->has('key')) {
        //    $this->_redirect('*/*');
        //}
    }
    
    /**
     * Acl permissions
     */
    protected function _isAllowed() {
        return Mage::getSingleton('admin/session')->isAllowed('rewards/instore');
    }
    
    public function preDispatch()
    {
        parent::preDispatch();
        
        if (!Mage::getSingleton('admin/session')->isLoggedIn()) {
            $this->_redirect('rewardsinstore/webapp/login');
        }
        
        return $this;
    }
    
    public function logoutAction()
    {
        $this->logout();
        $this->_redirectUrl($this->getRequest()->getHeader('Referer'));
        return;
    }
    
    public function mainAction()
    {
        if ($this->getRequest()->has('storefront_id')) {
            $this->setStorefront($this->getRequest()->get('storefront_id'));
        }
        
//        Mage::getSingleton('admin/session')->getCookie()->set(
//        	'rewardsinstore-key',
//            $this->getRequest()->get('key')
//            //,set period here so it automatically dies
//        );
        
        $this->loadLayout();
        $this->renderLayout();
    }
    
    public function fetchCustomersAction()
    {
        $this->keepAliveAction();
        
        $simplifiedCustomers = array();
        
        if ($this->getRequest()->has('term') && ($text = $this->getRequest()->getQuery('term'))) {
            try {
                $customers = Mage::getModel('rewards/customer')->getCollection()
                    ->addNameToSelect()
                    ->addAttributeToFilter(array(
                        array('attribute' => 'name', 'like' => "%{$text}%"),
                        array('attribute' => 'email', 'like' => "%{$text}%")))
                        //array('attribute' => 'telephone', 'like' => "%{$text}%")))
                    ->setPageSize(5);
                
                foreach ($customers as $customer) {
                    $rewardsCustomer = Mage::helper('rewardsinstore/customer')->getRewardsCustomer($customer);
                    $rewardsCustomer->loadCollections();
                    
                    $simplifiedCustomers[] = (object) array(
                        'name' => $customer->getName(),
                        'email' => $customer->getEmail(),
                        'points' => $rewardsCustomer->getUsablePointsBalance(1));
                }
                
                $this->getResponse()->setBody(Zend_Json::encode(array(
                    'success' => 1,
                    'customers' => $simplifiedCustomers
                )));
            } catch (Exception $ex) {
                Mage::helper('rewardsinstore')->logException($ex);
                $this->getResponse()->setBody(Zend_Json::encode(array(
                    'success' => 0,
                    'errorMsg' => $this->__("Could not retrieve list of customers. Please contact support.")
                )));
            }
            
            return $this;
        }
    }
    
    public function rewardCustomerAction()
    {
        $this->keepAliveAction();
        
        $this->getResponse()->setBody("");
        
        $email = $this->getRequest()->getQuery('email');
        $subtotal = $this->getRequest()->getQuery('subtotal');
        $storefrontId = Mage::getSingleton('admin/session')->getStorefrontId();
        
        // Validate values passed from webapp
        if (!$email) {
            $this->getResponse()->setBody(Zend_Json::encode(array(
                'success' => 0,
                'errorMsg' => $this->__("Email address is invalid.")
            )));
            return $this;
        }
        
        $storefront = Mage::getModel('rewardsinstore/storefront')->load($storefrontId);
        $customer = Mage::getModel('customer/customer')
            ->setWebsiteId($storefront->getWebsiteId())
            ->loadByEmail($email);
        
        if (!$customer->getId()) {
            Mage::helper('rewardsinstore')->log("The following customer was somehow selected, though apparently it doesn't exist (Email: {$email})");
            Mage::helper('rewardsinstore')->log(Mage::helper('rewards/debug')->getPrintableData($customer));
            $this->getResponse()->setBody(Zend_Json::encode(array(
                'success' => 0,
                'errorMsg' => $this->__("Customer with email address {$email} does not exist.")
            )));
            return $this;
        }
        
        // TODO: validate subtotal to be greater than 0
        $data = array(
            'subtotal' => $subtotal
        );
        
        $passwd = Mage::helper('rewardsinstore')->retrieveCustomerData($customer->getId());
        $customer->setPassword($passwd);
        
        $rewardsCustomer = Mage::helper('rewardsinstore/customer')->getRewardsCustomer($customer);
        
        try {
            $transfers = Mage::helper('rewardsinstore/pos')
                ->rewardCustomer($customer->getId(), $storefrontId, $data);
            
            $rewardsCustomer->loadCollections();
            Mage::helper('rewardsinstore/pos')->emailCustomer($rewardsCustomer);
            
            $result = $this->createAjaxResultFromTransfers($transfers);
            $result['success'] = 1;
            
            $this->getResponse()->setBody(Zend_Json::encode($result));
        } catch (Exception $ex) {
            Mage::helper('rewardsinstore')->logException($ex);
            $this->getResponse()->setBody(Zend_Json::encode(array(
                'success' => 0,
                'errorMsg' => $this->__("Failed to reward points to customer.")
            )));
            
            Mage::helper('rewardsinstore/pos')->emailCustomer($rewardsCustomer);
        }
        
        return $this;
    }
    
    public function createCustomerAction()
    {
        $this->keepAliveAction();
        
        try {
            $firstName = ucfirst($this->getRequest()->get('firstName'));
            $lastName = ucfirst($this->getRequest()->get('lastName'));
            $email = $this->getRequest()->get('email');
            
            $storefrontId = Mage::getSingleton('admin/session')->getStorefrontId();
            $storefront = Mage::getModel('rewardsinstore/storefront')->load($storefrontId);
            $website = Mage::getModel('core/website')->load($storefront->getWebsiteId());
            $store = $website->getDefaultStore();
            
            $customer = Mage::getModel('customer/customer');
            $customer->setWebsiteId($website->getId())
                ->setStore($store)
                ->setIsCreatedInstore(true)
                ->setStorefrontId($storefrontId)
                ->setFirstname($firstName)
                ->setLastname($lastName)
                ->setEmail($email)
                ->setPassword($customer->generatePassword(8))
                ->save();
            
            if (!$customer->getId()) {
                Mage::helper('rewardsinstore')->log("Failed to create the following customer. (Email: {$email})");
                Mage::helper('rewardsinstore')->log(Mage::helper('rewards/debug')->getPrintableData($customer));
                $this->getResponse()->setBody(Zend_Json::encode(array(
                    'success' => 0,
                    'errorMsg' => $this->__("Failed to create customer.")
                )));
                return $this;
            }
            
            Mage::helper('rewardsinstore')->stashCustomerData($customer);
            
            $transfers = Mage::helper('rewardsinstore/transfer')->getInstoreSignupTransfers($customer->getId());
            $result = $this->createAjaxResultFromTransfers($transfers);
            $result['success'] = 1;
            
            $this->getResponse()->setBody(Zend_Json::encode($result));
        } catch (Exception $ex) {
            Mage::helper('rewardsinstore')->logException($ex);
            $this->getResponse()->setBody(Zend_Json::encode(array(
                'success' => 0,
                'errorMsg' => $this->__($ex->getMessage())
            )));
        }
        
        return $this;
    }
    
    public function setStorefrontAction()
    {
        $this->keepAliveAction();
        
        try {
            if (!$this->getRequest()->has('storefrontId')
                || !($storefront = $this->setStorefront($this->getRequest()->get('storefrontId')))) {
                    Mage::helper('rewardsinstore')->log("Cashier managed to select a non-storefront (or passed in null). Storefront ID: [". $this->getRequest()->get('storefrontId') ."]");
                    $this->getResponse()->setBody(Zend_Json::encode(array(
                        'success' => 0,
                        'errorMsg' => $this->__("Invalid storefront selected.")
                    )));
                    return $this;
            }
            
            $this->getResponse()->setBody(Zend_Json::encode(array(
                'success' => 1,
                'storefrontName' => $storefront->getName()
            )));
        } catch (Exception $ex) {
            Mage::helper('rewardsinstore')->logException($ex);
            $this->getResponse()->setBody(Zend_Json::encode(array(
                'success' => 0,
                'errorMsg' => $this->__("Storefront location does not exist.")
            )));
        }
        
        return $this;
    }
    
    public function keepAliveAction()
    {
        Mage::getSingleton('admin/session')->getCookie()->set(
        	'rewardsinstore-key',
            Mage::getModel('adminhtml/url')->getSecretKey("webapp_ajax", "main")
        );
        
        return $this;
    }
    
    protected function setStorefront($storefrontId)
    {
        $storefront = Mage::getModel('rewardsinstore/storefront')->load($storefrontId);
        if ($storefront->getId() == $storefrontId) {
            Mage::getSingleton('admin/session')->setStorefrontId($storefrontId);
            return $storefront;
        }
        
        return null;
    }
    
    protected function createAjaxResultFromTransfers($transfers) {
        
            // Initialize result structure
            $result = array(
                'transfers' => array(),
                'points' => 0
            );
            
            foreach ($transfers as $transfer) {
                array_push($result['transfers'],
                    Mage::helper('rewardsinstore/transfer')->getTransferSummary($transfer));
                
                $result['points'] += $transfer->getQuantity();
            }
            return $result;
    }
    
    /**
     * TODO: We should be able to get all the information required for the email
     * from the customer model, and config values for templates, etc.
     *
     * This should probably be moved into a helper class
     */
    protected function sendCustomerWelcomeEmailSimple($customer) {
        
        return $this;
        
        // TODO: return if customer has already been sent a welcome email
        
        // TODO: get storefront, storeview, points, etc from customer model
        
        // TODO: get email template from config
        
        // TODO: call sendCustomerWelcomeEmail(...) with appropriate params
        
        // TODO: Replace this block with the above (emailing disabled on order for now)
        if ($rewardsCustomer->getUsablePointsBalance(1) == 0) {
            $store = Mage::getModel('core/website')->load($storefront->getWebsiteId())->getDefaultStore();
            if ($result['points'] > 0) {
                $this->sendCustomerWelcomeEmail($customer, $result['points'], $store->getId(),
                    'rewardsinstore/create_account/email_template',
                    'rewardsinstore/create_account/email_identity'
                );
            } else {
                // TODO: cover this case
            }
        }
        
    }
    
    protected function sendCustomerWelcomeEmail($customer, $points, $storeId, $emailTemplate, $emailIdentity)
    {
        $translate = Mage::getSingleton('core/translate');
        $translate->setTranslateInline(false);
        Mage::getModel('core/email_template')
            ->setDesignConfig(array('area'=>'frontend', 'store'=> $storeId))
            ->sendTransactional(
                Mage::getStoreConfig($emailTemplate, $storeId),
                Mage::getStoreConfig($emailIdentity, $storeId),
                $customer->getEmail(),
                $customer->getName(),
                array('customer' => $customer, 'back_url' => "", 'points' => $points));
        $translate->setTranslateInline(true);
    }
    
    protected function logout()
    {
        $session = Mage::getSingleton('admin/session')->unsetAll();
        $session->getCookie()->delete($session->getSessionName());
        $session->getCookie()->delete('rewardsinstore-key');
    }
}
