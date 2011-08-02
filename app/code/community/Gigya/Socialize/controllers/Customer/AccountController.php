<?php
/**
 * Gigya Customer account controller
 *
 * @category   Social Optimization
 * @package    Gigya_Socialize
 * @author     Eyal Peleg <epeleg@gmail.com> for gigya Inc
 * @copyright  Copyright (c) 2010 Gigya Inc (http://Gigya.com)
 * @license    
 */

$socializeLibPath=Mage::getModuleDir('', 'Gigya_Socialize'). DS . 'lib';
$gigyaSDKPath= $socializeLibPath . DS . 'GSSDK.php';
require_once ($gigyaSDKPath);

//echo(Mage::getModuleDir('controllers', 'Mage_Customer') . DS . 'AccountController.php');
require_once Mage::getModuleDir('controllers', 'Mage_Customer') . DS . 'AccountController.php';

class Gigya_Socialize_Customer_AccountController extends Mage_Customer_AccountController
{

	public function validActions() {
		return 'create|login|logoutSuccess|forgotpassword|forgotpasswordpost|confirm|confirmation|linking';
	}
	
    public function preDispatch()
    {
    	//I override this to add the linking Action as a valid one.
    	//this is also the reason why I call the grand parent and not parent class's preDispatch()
    	// becase the default implementation does not enable to simply override the list of valid actions.
   	
        Mage_Core_Controller_Front_Action::preDispatch();
        
        if (!$this->getRequest()->isDispatched()) {
            return;
        }

        $action = $this->getRequest()->getActionName();
        if (!preg_match('/^(' . $this->validActions() . ')/i', $action)) {
            if (!$this->_getSession()->authenticate($this)) {
                $this->setFlag('', 'no-dispatch', true);
            }
        } else {
            $this->_getSession()->setNoReferer(true);
        }
    }
    	
    public function loginAction()
    {
        if ($this->_getSession()->isLoggedIn()) {
            $this->_redirect('*/*/');
            return;
        }
        //This is so that if the user logins on the gigya widget and then clicks register or login on the 
        Mage::getSingleton('socialize/session')->clearUser();
        parent::loginAction();
    }

    /**
     * Customer register form page
     */
    public function createAction()
    {
        if ($this->_getSession()->isLoggedIn()) {
            $this->_redirect('*/*');
            return;
        }

        Mage::getSingleton('socialize/session')->clearUser();
        parent::loginAction();
     }
     public function createPostAction() {
        $session = $this->_getSession();
        if ($session->isLoggedIn()) {
            $this->_redirect('*/*/');
            return;
        }
        $session->setEscapeMessages(true); // prevent XSS injection in user input
        if ($this->getRequest()->isPost()) {
            $errors = array();

            if (!$customer = Mage::registry('current_customer')) {
                $customer = Mage::getModel('customer/customer')->setId(null);
            }

            /* @var $customerForm Mage_Customer_Model_Form */
            $customerForm = Mage::getModel('customer/form');
            $customerForm->setFormCode('customer_account_create')
                ->setEntity($customer);

            $customerData = $customerForm->extractData($this->getRequest());

            if ($this->getRequest()->getParam('is_subscribed', false)) {
                $customer->setIsSubscribed(1);
            }

            /**
             * Initialize customer group id
             */
            $customer->getGroupId();

            if ($this->getRequest()->getPost('create_address')) {
                /* @var $address Mage_Customer_Model_Address */
                $address = Mage::getModel('customer/address');
                /* @var $addressForm Mage_Customer_Model_Form */
                $addressForm = Mage::getModel('customer/form');
                $addressForm->setFormCode('customer_register_address')
                    ->setEntity($address);

                $addressData    = $addressForm->extractData($this->getRequest(), 'address', false);
                $addressErrors  = $addressForm->validateData($addressData);
                if ($addressErrors === true) {
                    $address->setId(null)
                        ->setIsDefaultBilling($this->getRequest()->getParam('default_billing', false))
                        ->setIsDefaultShipping($this->getRequest()->getParam('default_shipping', false));
                    $addressForm->compactData($addressData);
                    $customer->addAddress($address);

                    $addressErrors = $address->validate();
                    if (is_array($addressErrors)) {
                        $errors = array_merge($errors, $addressErrors);
                    }
                } else {
                    $errors = array_merge($errors, $addressErrors);
                }
            }

            try {
                $customerErrors = $customerForm->validateData($customerData);
                if ($customerErrors !== true) {
                    $errors = array_merge($customerErrors, $errors);
                } else {
                    $customerForm->compactData($customerData);
                    $customer->setPassword($this->getRequest()->getPost('password'));
                    $customer->setConfirmation($this->getRequest()->getPost('confirmation'));
                    $customerErrors = $customer->validate();
                    if (is_array($customerErrors)) {
                        $errors = array_merge($customerErrors, $errors);
                    }
                }

                $validationResult = count($errors) == 0;

                if (true === $validationResult) {
                    $customer->save();
                    $this->linkCustomerToSocializeUser($customer,null,null);
                    
                    if ($customer->isConfirmationRequired()) {
                        $customer->sendNewAccountEmail('confirmation', $session->getBeforeAuthUrl());
                        $session->addSuccess($this->__('Account confirmation is required. Please, check your email for the confirmation link. To resend the confirmation email please <a href="%s">click here</a>.', Mage::helper('customer')->getEmailConfirmationUrl($customer->getEmail())));
                        $this->_redirectSuccess(Mage::getUrl('*/*/index', array('_secure'=>true)));
                        return;
                    } else {
                        $session->setCustomerAsLoggedIn($customer);
                        $url = $this->_welcomeCustomer($customer);
                        $this->_redirectSuccess($url);
                        return;
                    }
                } else {
                    $session->setCustomerFormData($this->getRequest()->getPost());
                    if (is_array($errors)) {
                        foreach ($errors as $errorMessage) {
                            $session->addError($errorMessage);
                        }
                    } else {
                        $session->addError($this->__('Invalid customer data'));
                    }
                }
            } catch (Mage_Core_Exception $e) {
                $session->setCustomerFormData($this->getRequest()->getPost());
                if ($e->getCode() === Mage_Customer_Model_Customer::EXCEPTION_EMAIL_EXISTS) {
                    $url = Mage::getUrl('customer/account/forgotpassword');
                    $message = $this->__('There is already an account with this email address. If you are sure that it is your email address, <a href="%s">click here</a> to get your password and access your account.', $url);
                    $session->setEscapeMessages(false);
                } else {
                    $message = $e->getMessage();
                }
                $session->addError($message);
            } catch (Exception $e) {
                $session->setCustomerFormData($this->getRequest()->getPost())
                    ->addException($e, $this->__('Cannot save the customer.'));
            }
        }

        $this->_redirectError(Mage::getUrl('*/*/create', array('_secure' => true)));
     	
     }    
   /**
     * Login post action
     */

	public function loginPostAction()
    {
        if ($this->_getSession()->isLoggedIn()) {
            $this->_redirect('*/*/');
            return;
        }
        
        if ($this->getRequest()->isPost()) { // meaning its a site login
        	$this->siteLoginPostAction();
        	$this->_loginPostRedirect();
        }
		else { // meaning its a socialize login
			$this->socializeLoginPostAction();
		}
    }
	
    //TODO:maybe this should be a call to parent::LoginPostAction() ?
    protected function siteLoginPostAction(){
        $session = $this->_getSession();
        $login = $this->getRequest()->getPost('login');
        if (!empty($login['username']) && !empty($login['password'])) {
           try {
               $session->login($login['username'], $login['password']);
               if ($session->getCustomer()->getIsJustConfirmed()) {
                   $this->_welcomeCustomer($session->getCustomer(), true);
               }
           } catch (Mage_Core_Exception $e) {
           		$session->addError($message);
                $session->setUsername($login['username']);
           } catch (Exception $e) {
                    // Mage::logException($e); // PA DSS violation: this exception log can disclose customer password
           }
        } 
        else {
                $session->addError($this->__('Login and password are required.'));
        }
    }

    protected function socializeLoginPostAction(){
    	$req=$this->getRequest();
    	$helper=Mage::helper('socialize');
		
    	$UID=$req->getParam('UID');
    	$timestamp=$req->getParam('timestamp');
    	$signature=$req->getParam('signature');
    	
    	$cfg=$helper->getConfig();
		$secret= $cfg->getSecretKey();
    	$nickname=$req->getParam('nickname');

    	if (SigUtils::validateUserSignature($UID, $timestamp, $secret, $signature)) {
    		Mage::getSingleton('socialize/session')->setUserFromRequest($req);
    		
    		$customer = Mage::getModel('customer/customer');
			//$customer  = new Mage_Customer_Model_Customer();
			
    		$customer->setWebsiteId(Mage::app()->getWebsite()->getId());
			$customer->load($UID);
			//Zend_Debug::dump($customer->debug()); 
			//$helper=Mage::helper('socialize');
			if(!$customer->getId()) { 
				$this->_redirect('*/*/linking');
				return;
			}
			else {
				//user is member of the site.
	           $session=$this->_getSession();
	           try {
	           	   //echo('<br/>calling login on session');
	               $session->loginById($customer->getId());
	               if ($session->getCustomer()->getIsJustConfirmed()) {
	               		//echo('<br/>getIsJustConfirmed()');
	                   $this->_welcomeCustomer($session->getCustomer(), true);
	               }
	               //echo('<br/>calling _loginPostRedirect');
	           } catch (Mage_Core_Exception $e) {
	           		$session->addError($e);
	                $session->setUsername($login['username']);
	           } catch (Exception $e) {
	           		$session->addError($e);
	                    // Mage::logException($e); // PA DSS violation: this exception log can disclose customer password
	           }
               $this->_loginPostRedirect();				
			}
						
    	}
    	else {
    		//TODO: what should happen if the signiture is invalid ?
    		$session=$this->_getSession();
            $session->addError($this->__('Invalid signiture.'));
            $this->_loginPostRedirect(); 
    	}
    	
    	
    	//echo(Mage::getModuleDir('', 'Gigya_Socialize'));
    	

    }
	
    //TODO:move linking and linkingPOST to Socialize IndexController, will need to change URLs in the helper to poitn to socialize/ instead of customer
    /**
     * Customer Linking form page
     */
    public function linkingAction()
    {

   	  	$req=$this->getRequest();
		$params=$req->getParams();
		
    	$UID=$req->getParam('UID');
    	$timestamp=$req->getParam('timestamp');
    	$signature=$req->getParam('signature');
    	
    	$cfg=Mage::getSingleton('socialize/config');
		$secret= $cfg->getSecretKey();
    	

    	if (SigUtils::validateUserSignature($UID, $timestamp, $secret, $signature)) {
    		//echo '<br/>Got valid signiture<br/>';
    	}    	
    
    	
        if ($this->_getSession()->isLoggedIn()) {
            $this->_redirect('*/*/');
            return;
        }
        
        $this->getResponse()->setHeader('Login-Required', 'true');

        $this->loadLayout();
        $layout=$this->getLayout();

        //$this->generateLayoutXml()->generateLayoutBlocks();
        
        $linkingBlock=$layout->getBlock('socialize_customer_form_linking');
        $registerBlock=$layout->getBlock('customer_form_register');

        
        $register_form_data=$registerBlock->getFormData();
        $socializeSession=Mage::getSingleton('socialize/session');
        
        $register_form_data->setEmail($socializeSession->getEmail());
        $register_form_data->setFirstname($socializeSession->getFirstName());
        $register_form_data->setLastname($socializeSession->getLastName());
        $gender=$socializeSession->getGender();
        if ($gender != null) {
	        if ((strtolower($gender[0]) === 'm')) {
	        	$register_form_data->setGender(1);
	        }
	        else if ((strtolower($gender[0]) === 'f')) {
	        	$register_form_data->setGender(2);
	        }
        };
        
        $year=$socializeSession->getBirthYear();
        $month=$socializeSession->getBirthMonth();
        $day=$socializeSession->getBirthDay();
        $register_form_data->setDob($year.'-'.$month.'-'.$day);
        
        //register_form_data->setData('street', array('1'=>'abcde'));
        
        $this->_initLayoutMessages('customer/session');
        $this->_initLayoutMessages('catalog/session');
        
        $this->renderLayout();

    }

    /**
     * 
     * Link the $customer to the current Socialize User
     * @param string $username - if not null then used to login before linking
     * @param string $password
     */
    protected function linkCustomerToSocializeUser($customer=null,$username=null,$password=null) {
    	$socializeSession=Mage::getSingleton('socialize/session');
    	$UID=$socializeSession->getUID();
    	if ($UID==null) return true; // because this is called both after a normal create user and after a create that is needed for linking since its the same form that calls to creaePostAction
    	
    	Mage::log('entering linkCustomerToSocializeUser');
    	$helper = Mage::helper('socialize');
    	$cfg=$helper->getConfig();
    	$secretKey= $cfg->getSecretKey();
    	
    	Mage::log('entering linkCustomerToSocializeUser $socializeSession->getUID()= ' . $socializeSession->getUID());
    	
    	$timestamp=$socializeSession->getTimestamp();
    	$signature=$socializeSession->getSignature();
    	
    	
    	
    	if ( ($socializeSession==null) || ($timestamp==null) || ($timestamp=='') || (SigUtils::validateUserSignature($UID, $timestamp, $secretKey, $signature))) {
    		Mage::log('trying to login');
    		$session = $this->_getSession();
    		
    		if ($username!=null) { // try to login
	           try {
	               $session->login($username, $password);
	           } catch (Mage_Core_Exception $e) {
	           		$session->addError('login failed, please try again.');
	                $session->setUsername($username);
	                Mage::log('login for user ' . $username . ' failed');
	                return false;
	           } catch (Exception $e) {
	           			Mage::log('an exception occured while trying login for user ' . $username);
	                    // Mage::logException($e); // PA DSS violation: this exception log can disclose customer password
	                return false;
	           }
    		}
    		
    		if ($customer==null) {
    			Mage::log('getting customer from session');
    			$customer=$session->getCustomer();
    		}
    		
    		if ($session->getCustomer()->getIsJustConfirmed()) {
    			$this->_welcomeCustomer($customer, true);
    		}
    		
			$apiKey = $cfg->getApiKey();
			//$secret already assigned near the top of the function
			
			// Step 1 - Defining the request 
			$method = "socialize.notifyRegistration";
			$request = new GSRequest($apiKey,$secretKey,$method);
		
			// Step 2 - Adding parameters
			$request->setParam("uid", $UID );
			$request->setParam("siteUID", $customer->getId());
						
			// Step 3 - Sending the request
			$response = $request->send();
						
			// Step 4 - handling the request's response.
			if($response->getErrorCode()==0)
			{    // SUCCESS! response status = OK   
				$socializeSession->getUserInfo();   
			} 
			else 
			{  // Error
				//echo ("Got error on setStatus: " . $response->getErrorMessage());
				Mage::log('socialize.notifyRegistration returned :' . $response->getErrorMessage());
				Mage::log('socialize.notifyRegistration response->getLog() :' . $response->getLog());
			}

			$this->_loginPostRedirect();
				
    	}
    	else {
    		//TODO: what should happen if the signiture is invalid ?
    		$session = $this->_getSession();
            $session->addError($this->__('Invalid signiture (435). '));
            return false;
    	}
    	
    }
    
    public function linkingPostAction()   {
    	
    	$login = $this->getRequest()->getPost('login');
    	if (!empty($login['username']) && !empty($login['password'])) {
	    	$this->linkCustomerToSocializeUser(null,$login['username'], $login['password']);
    	}
    	$this->_loginPostRedirect();
    	
    	/*
    	$helper = Mage::helper('socialize');
    	$cfg=$helper->getConfig();
    	$secretKey= $cfg->getSecretKey();
    	
    	$socializeSession=Mage::getSingleton('socialize/session');
    	$UID=$socializeSession->getUID();
    	$timestamp=$socializeSession->getTimestamp();
    	$signature=$socializeSession->getSignature();
		
    	if (SigUtils::validateUserSignature($UID, $timestamp, $secretKey, $signature)) {
    		echo '<br/>Got valid signiture<br/>';
	    	echo '<br/>IN linkingPostAction<br/>';
	
	        $session = $this->_getSession();
	        $login = $this->getRequest()->getPost('login');
        	if (!empty($login['username']) && !empty($login['password'])) {
	           try {
	               $session->login($login['username'], $login['password']);
	               if ($session->getCustomer()->getIsJustConfirmed()) {
	                   $this->_welcomeCustomer($session->getCustomer(), true);
	                   echo("getIsJustConfirmed");	                   
	               }
	           } catch (Mage_Core_Exception $e) {
	           		$session->addError($message);
	                $session->setUsername($login['username']);
	           } catch (Exception $e) {
	                    // Mage::logException($e); // PA DSS violation: this exception log can disclose customer password
	           }
	           
	           	echo("Should now Link!");
				//$secret already assigned near the top of the function
				$apiKey = $cfg->getApiKey();
				
				// Step 1 - Defining the request 
				$method = "socialize.notifyRegistration";
				$request = new GSRequest($apiKey,$secretKey,$method);
			
				// Step 2 - Adding parameters
				$request->setParam("uid", $UID );
				$request->setParam("siteUID", $session->getCustomer()->getId());
							
				// Step 3 - Sending the request
				$response = $request->send();
							
				// Step 4 - handling the request's response.
				if($response->getErrorCode()==0)
				{    // SUCCESS! response status = OK   
					echo "Success in setStatus operation.";
					$socializeSession->getUserInfo();   
				} 
				else 
				{  // Error
					echo ("Got error on setStatus: " . $response->getErrorMessage());
				}
				
				$this->_loginPostRedirect();

	        } 
	        else {
	                $session->addError($this->__('Login and password are required.'));
	        }
    	}
    	else {
    		//TODO: what should happen if the signiture is invalid ?
    		$session = $this->_getSession();
            $session->addError($this->__('Invalid signiture. '));
    	}
    	*/
   	}
   	
}
