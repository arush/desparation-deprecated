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

class Gigya_Socialize_Model_Observer {

        public function onCustomerDeleteAfter($observer) {
        	
        	Mage::log('gigya socialize onCustomerDeleteAfter');
        	
        	
	    	$helper = Mage::helper('socialize');
	    	$cfg=$helper->getConfig();
		    	        	
        	$value=$cfg->getSetting('enabled','general');
	        if ($value) {
	        	
	        	$event = $observer->getEvent();
	        	$customer= $event->getCustomer();

	        	Mage::log('gigya socialize onCustomerDeleteAfter deleted customer ID was:' .$customer->getId());

		    	$secretKey= $cfg->getSecretKey();
				$apiKey = $cfg->getApiKey();
				
				// Step 1 - Defining the request 
				$method = "socialize.deleteAccount";
				$request = new GSRequest($apiKey,$secretKey,$method);
			
				Mage::log('gigya socialize onCustomerDeleteAfter: deleted $customer->getId() was ' .$customer->getId() ) ;
				// Step 2 - Adding parameters
				$request->setParam("uid", $customer->getId());
							
				// Step 3 - Sending the request
				$response = $request->send();
							
				// Step 4 - handling the request's response.
				if($response->getErrorCode()==0)
				{    // SUCCESS! response status = OK   
					Mage::log('gigya socialize onCustomerDeleteAfter: customer '. $customer->getId() .' deleted');
					   
				} 
				else 
				{  // Error
					Mage::log('gigya socialize onCustomerDeleteAfter: socialize.deleteAccount returned :' . $response->getErrorMessage());
					Mage::log('gigya socialize onCustomerDeleteAfter: socialize.deleteAccount response->getLog()  :' . $response->getLog());
					
				}
	        	
	        	
	        }
        }
    }