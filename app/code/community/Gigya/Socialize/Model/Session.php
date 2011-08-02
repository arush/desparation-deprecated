<?php

$socializeLibPath=Mage::getModuleDir('', 'Gigya_Socialize'). DS . 'lib';
$gigyaSDKPath= $socializeLibPath . DS . 'GSSDK.php';
require_once ($gigyaSDKPath);

/**
 * Gigya session model
 *
 * @category   Social Optimization
 * @package    Gigya_Socialize
 * @author
 * @copyright   Copyright (c) 2010 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

class Gigya_Socialize_Model_Session extends Mage_Core_Model_Session_Abstract
{
	
    public function __construct()
    {
        $namespace = 'socialize';
        $customerSession=Mage::getSingleton('customer/session');
        if ($customerSession->getCustomerConfigShare()->isWebsiteScope()) {
            $namespace .= '_' . (Mage::app()->getStore()->getWebsite()->getCode());
        }

        $this->init($namespace);
        Mage::dispatchEvent('socialize_session_init', array('socialize_session'=>$this));
    }

    public function getUserFields() {
    	//ignoreing deprecated:  'UIDSig','UIDSignature','signatureTimestamp'
    	// note that when returned from getUserInfo we have "provider" and when returned from "getUserInfo" its "loginProvider"
    	
    	return array('provider','signature','timestamp','UID','nickname',
    	             'photoURL','thumbnailURL','birthDay','birthMonth',
    	             'birthYear','gender','email','proxiedEmail',
    	             'country','state','city','zip','firstName',
    	             'lastName','profileURL','isSiteUID',
    	             'isLoggedIn','isConnected','isSiteUser',
    	             'loginProvider','loginProviderUID');
    }
    
    public function getUserInfo() {
    	$this->clearUser();
    	$customerSession=Mage::getSingleton('customer/session');
    	$UID=$customerSession->getCustomer()->getId();
    	
    	if ($UID) {
	    	$helper = Mage::helper('socialize');
	    	$cfg=$helper->getConfig();
	    	$secretKey= $cfg->getSecretKey();
	    	$apiKey = $cfg->getApiKey();
			
			// Step 1 - Defining the request 
			$method = "socialize.getUserInfo";
			$request = new GSRequest($apiKey,$secretKey,$method);
		
			// Step 2 - Adding parameters
			$request->setParam("uid", $customerSession->getCustomer()->getId());
						
			// Step 3 - Sending the request
			$response = $request->send();
						
			// Step 4 - handling the request's response.
			if($response->getErrorCode()==0)
			{    // SUCCESS! response status = OK 
				
				// Validate the signature  
			    $valid = SigUtils::validateUserSignature($response->getString("UID",""), $response->getString("signatureTimestamp",""),   
			                            $secretKey, $response->getString("UIDSignature",""));  
			    if ($valid) {
			    	Mage::log($response->getLog() );
			    	Mage::log($response->getResponseText() );  
			    	$user=$response->getData();
					foreach ($this->getUserFields() as $uf) {
						$setter='set'.ucfirst($uf);
						$this->$setter($user->getString($uf,null)); // PHP5 only?
						// ("setting $uf to " . $user->getString($uf,null) );
					}
					
				}
				else {
					Mage::log('Invalid signature on response from socialize.getUserInfo');  
				}
			} 
			else 
			{  // Error
				Mage::log('Got error on socialize.getUserInfo: ' . $response->getErrorMessage());
			}
    	}
    }
    
	public function setUserFromRequest($req) {
		foreach ($this->getUserFields() as $uf) {
			$setter='set'.ucfirst($uf);
			$this->$setter($req->getParam($uf)); // PHP5 only?
		}
		/*
		$this->setUID($req->getParam('UID'));
		$this->setTimestamp($req->getParam('timestamp'));
		$this->setSignature($req->getParam('signature'));
		$this->setNickname($req->getParam('nickname'));
		$this->setIsSiteUID($req->getParam('isSiteUID'));
		*/
		return $this;
	}     		

	public function clearUser() {
		//TODO: use unset somehow
		
		foreach ($this->getUserFields() as $uf) {
			$setter='set'.ucfirst($uf);
			$this->$setter(null); // PHP5 only?
		}
/*				
		$this->setUID(null);
		$this->setTimestamp(null);
		$this->setSignature(null);
		$this->setNickname(null);
		$this->setIsSiteUID(null);
*/
		}
	
	public function isLoggedIn() {
		return (null!=($this->getUID()));
	}
	
	//Mage::getSingleton('core/session')->setBlahBlahBlah('my data');
    //$myData = Mage::getSingleton('core/session')->getBlahBlahBlah();
	
    /**
     * Customer object
     *
     * @var Mage_Customer_Model_Customer
     */
//    protected $_customer;

    /**
     * Flag with customer id validations result
     *
     * @var bool
     */
//    protected $_isCustomerIdChecked = null;

    /**
     * Retrieve customer sharing configuration model
     *
     * @return Mage_Customer_Model_Config_Share
     */
/*    public function getCustomerConfigShare()
    {
        return Mage::getSingleton('customer/config_share');
    }
*/
/*	
    public function __construct()
    {
    	echo '__construct: ' .__FILE__ . __CLASS__;
    	
        $namespace = 'customer';
        if ($this->getCustomerConfigShare()->isWebsiteScope()) {
            $namespace .= '_' . (Mage::app()->getStore()->getWebsite()->getCode());
        }

        $this->init($namespace);
        Mage::dispatchEvent('customer_session_init', array('customer_session'=>$this));
    }
*/
    /**
     * Set customer object and setting customer id in session
     *
     * @param   Mage_Customer_Model_Customer $customer
     * @return  Mage_Customer_Model_Session
     */
/*    public function setCustomer(Mage_Customer_Model_Customer $customer)
    {
        // check if customer is not confirmed
        if ($customer->isConfirmationRequired()) {
            if ($customer->getConfirmation()) {
                throw new Exception('This customer is not confirmed and cannot log in.',
                    Mage_Customer_Model_Customer::EXCEPTION_EMAIL_NOT_CONFIRMED
                );
            }
        }
        $this->_customer = $customer;
        $this->setId($customer->getId());
        // save customer as confirmed, if it is not
        if ((!$customer->isConfirmationRequired()) && $customer->getConfirmation()) {
            $customer->setConfirmation(null)->save();
            $customer->setIsJustConfirmed(true);
        }
        return $this;
    }
*/
    /**
     * Retrieve costomer model object
     *
     * @return Mage_Customer_Model_Customer
     */
/*    public function getCustomer()
    {
        if ($this->_customer instanceof Mage_Customer_Model_Customer) {
            return $this->_customer;
        }

        $customer = Mage::getModel('customer/customer')
            ->setWebsiteId(Mage::app()->getStore()->getWebsiteId());
        if ($this->getId()) {
            $customer->load($this->getId());
        }

        $this->setCustomer($customer);
        return $this->_customer;
    }
*/
    /**
     * Retrieve customer id from current session
     *
     * @return int || null
     */
/*    public function getCustomerId()
    {
        if ($this->isLoggedIn()) {
            return $this->getId();
        }
        return null;
    }
*/
    /**
     * Get customer group id
     * If customer is not logged in system not logged in group id will be returned
     *
     * @return int
     */
/*    public function getCustomerGroupId()
    {
        if ($this->isLoggedIn()) {
            return $this->getCustomer()->getGroupId();
        } else {
            return Mage_Customer_Model_Group::NOT_LOGGED_IN_ID;
        }
    }
*/
    /**
     * Checking custommer loggin status
     *
     * @return bool
     */
/*    public function isLoggedIn()
    {
        return (bool)$this->getId() && (bool)$this->checkCustomerId($this->getId());
    }
*/
    /**
     * Check exists customer (light check)
     *
     * @param int $customerId
     * @return bool
     */
/*    public function checkCustomerId($customerId)
    {
        if ($this->_isCustomerIdChecked === null) {
            $this->_isCustomerIdChecked = Mage::getResourceSingleton('customer/customer')->checkCustomerId($customerId);
        }
        return $this->_isCustomerIdChecked;
    }
*/
    /**
     * Customer authorization
     *
     * @param   string $username
     * @param   string $password
     * @return  bool
     */
/*    public function login($username, $password)
    {
        $customer = Mage::getModel('customer/customer')
            ->setWebsiteId(Mage::app()->getStore()->getWebsiteId());

        if ($customer->authenticate($username, $password)) {
            $this->setCustomerAsLoggedIn($customer);
            return true;
        }
        return false;
    }
*/
/*    public function setCustomerAsLoggedIn($customer)
    {
        $this->setCustomer($customer);
        Mage::dispatchEvent('customer_login', array('customer'=>$customer));
        return $this;
    }
*/
    /**
     * Authorization customer by identifier
     *
     * @param   int $customerId
     * @return  bool
     */
/*    public function loginById($customerId)
    {
        $customer = Mage::getModel('customer/customer')->load($customerId);
        if ($customer->getId()) {
            $this->setCustomerAsLoggedIn($customer);
            return true;
        }
        return false;
    }
*/
    /**
     * Logout customer
     *
     * @return Mage_Customer_Model_Session
     */
    
/*    public function logout()
    {
        if ($this->isLoggedIn()) {
            Mage::dispatchEvent('customer_logout', array('customer' => $this->getCustomer()) );
            $this->setId(null);
        }
        return $this;
    }
*/
    /**
     * Authenticate controller action by login customer
     *
     * @param   Mage_Core_Controller_Varien_Action $action
     * @return  bool
     */
    
/*    public function authenticate(Mage_Core_Controller_Varien_Action $action, $loginUrl = null)
    {
        if (!$this->isLoggedIn()) {
            $this->setBeforeAuthUrl(Mage::getUrl('* / * REMOVE THE SPACES  / * ', array('_current'=>true)));
            if (is_null($loginUrl)) {
                $loginUrl = Mage::helper('customer')->getLoginUrl();
            }
            $action->getResponse()->setRedirect($loginUrl);
            return false;
        }
        return true;
    }
*/}

    
    
    
