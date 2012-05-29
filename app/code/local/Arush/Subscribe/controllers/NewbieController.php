<?php
class Arush_Subscribe_NewbieController extends Mage_Core_Controller_Front_Action
{
	public function indexAction(){
		if($this->getRequest()->isPost()){
			$int1 = $this->getRequest()->getPost('int1');
			$int2 = $this->getRequest()->getPost('int2');
			$result = $int1 * $int2;
			Mage::getSingleton('customer/session')->addSuccess("$int1 * $int2 = $result");
		}
		else {
			
			// get standard values for mailchimp api call
			$storeId = Mage::app()->getStore()->getId();			
			$listId = Mage::helper('monkey')->getDefaultList($storeId);
			$time = strtotime("now");
			$ip = $_SERVER['REMOTE_ADDR'];

			// get variable values
			$source = 'unknown';
			$email = 'uckshit@getbrandid.com';
			
			// put them all in an array
			$mergeVars = array(
							'STATUS' => 'interested',
							'SOURCE' => $source,
							'OPTIN_IP' => $ip,
							'OPTIN_TIME' => $time
							);

			print_r(json_encode(
				array(
					'list id' => $listId,
					'email' => $email,
					'mergeVars' => $mergeVars
					)
				));

			// call ebizmarts api
			$api = Mage::getSingleton('monkey/api');
			$retval = $api->listSubscribe(
								$listId,
								$email,
								$mergeVars,
								'html' /* email type */,
								true /* double opt-in */,
								false /* update existing */,
								true /* replace interests */ ,
								true /* send welcome */);

			if ($api->errorCode){
				
				print_r(json_encode(
					array(
						'status' => $api->errorCode,
						'state' => "failed",
						'errorMessage' => $api->errorMessage
						)
				));

			} else {
				
				print_r(json_encode(
					array(
						'status' => 1,
						'state' => "success",
						'message' => "Almost done - we just sent you a confirmation email, click the link inside!"
						)
				));

		
			}

		}
		
	}
}