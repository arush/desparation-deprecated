<?php
class Arush_Subscribe_NewbieController extends Mage_Core_Controller_Front_Action
{
	public function indexAction(){

		//this is used to check if the request came internally or POSTed from a frontend form
		$parameters = $this->getRequest()->getParams();

		if($this->getRequest()->isPost()){
			
			/* get variables to pass */
				$email = $this->getRequest()->getPost('email');
				$source = $this->getRequest()->getPost('source');

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
			/* end get variables to pass */

			//subscribe setting MALE to false, because this is not coming from MALE
			$api = Mage::helper('subscribe')->doSubscribe(false, $fname, $email, $gender, $source);

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
		else if(isset($parameters[0])){
			
			if(isset($parameters[0])) {$fname = $parameters[0];}
			else {$fname = '';}
			if(isset($parameters[1])) {$email = $parameters[1];}
			else {$email = '';}
			if(isset($parameters[2])) {$gender = $parameters[2];}
			else {$gender = '';}
			if(isset($parameters[3])) {$source = $parameters[3];}
			else {$source = "not yet known";}

			if(isset($parameters[4])) {$male = $parameters[4];}
			else {$male = "not yet known";}

			


			//subscribe setting MALE to true, because this is coming from MALE

			$api = Mage::helper('subscribe')->doSubscribe(true, $fname, $email, $gender, $source, $male);

			if ($api->errorCode == 214){
				// already on the list, must check their status and update as necessary
				// at this point $source is irrelevant, so drop it
				$this->_redirect('get/party/exists', array($fname, $email, $gender, $source /*even though we dont need this*/, $male));

			}
			else if($api->errorCode) {
				Mage::log('Tried to list member info and got this error: ', json_encode($api), 'male.log');

				print_r(json_encode(
					array(
						'status' => $api->errorCode,
						'state' => "failed",
						'message' => $api->errorMessage
						)
				));
			}
			else {
				
				print_r(json_encode(
					array(
						'status' => 1,
						'state' => "success",
						'message' => "Almost done - we just sent you a confirmation email, click the link inside and then come back here "
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