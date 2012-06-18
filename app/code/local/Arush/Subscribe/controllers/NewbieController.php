<?php
class Arush_Subscribe_NewbieController extends Mage_Core_Controller_Front_Action
{
	public function indexAction(){
		if($this->getRequest()->isPost()){
			
			$email = $this->getRequest()->getPost('email');

			// this is sent when user enters firstname as an option
			if($this->getRequest()->getPost('fname')) {
				$fname = $this->getRequest()->getPost('fname');
			}
			else {
				$fname = '';
			}

			// this is sent when user enters gender as an option
			if($this->getRequest()->getPost('gender')) {
				$gender = $this->getRequest()->getPost('gender');
			}
			else {
				$gender = '';
			}


			// get standard values for mailchimp api call
			$storeId = Mage::app()->getStore()->getId();			
			$listId = Mage::helper('monkey')->getDefaultList($storeId);
			$time = strtotime("now");
			$ip = $_SERVER['REMOTE_ADDR'];

			// get variable values
			$source = 'unknown';

			// put them all in an array
			$mergeVars = array(
							'STATUS' => 'interested',
							'FNAME' => $fname,
							'GENDER' => $gender,
							'SOURCE' => $source,
							'OPTIN_IP' => $ip,
							'OPTIN_TIME' => $time
							);

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
						'message' => $api->errorMessage
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
		else {
			
			print_r(json_encode(
				array(
					'status' => 0,
					'errorMessage' => "nice try asshole"				
					)
				));


		}
		
	}
}