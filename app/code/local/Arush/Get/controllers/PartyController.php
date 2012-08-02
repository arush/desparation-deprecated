<?php

class Arush_Get_PartyController extends Mage_Core_Controller_Front_Action
{
	public function subscribeAction() {
		if($this->getRequest()->isPost()){
		//this is comes directly from MALE
			
			$email = 'not yet known';
			$fname = 'not yet known';
			$gender = 'not yet known';
			$source = 'not yet known';
			$male = 'not far along enough yet';

			if(array_key_exists('email',$this->getRequest()->getPost())) {
				$email = $this->getRequest()->getPost('email');
			}
			
			if(array_key_exists('fname',$this->getRequest()->getPost())) {
				$fname = $this->getRequest()->getPost('fname');
			}
			
			if(array_key_exists('gender',$this->getRequest()->getPost())) {
				$gender = $this->getRequest()->getPost('gender');
			}
			
			if(array_key_exists('source',$this->getRequest()->getPost())) {
				$source = $this->getRequest()->getPost('source');
			}
			if(array_key_exists('male',$this->getRequest()->getPost())) {
				$male = $this->getRequest()->getPost('male');
			}

			$params = array($fname, $email, $gender, $source, $male);

			$this->_redirect('subscribe/newbie', $params);
		}
		else {
			echo json_encode('nice try asshole');
		}

	}
    public function existsAction() {
    	// get standard values for mailchimp api call
		$storeId = Mage::app()->getStore()->getId();			
		$listId = Mage::helper('monkey')->getDefaultList($storeId);
		if($this->getRequest()->isPost()){
			//this is only used when a form posts directly to this Action
			$email = $this->getRequest()->getPost('email');
			$fname = $this->getRequest()->getPost('fname');
			$gender = $this->getRequest()->getPost('gender');
		}
		else {
			$parameters = $this->getRequest()->getParams();
			$fname = $parameters[0];
			$email = $parameters[1];
			$gender = $parameters[2];
			// dont need source if email already exists
			$male = $parameters[4];
		}

		$emailarray = array($email);

		// call ebizmarts api
		$api = Mage::getSingleton('monkey/api');
		$retval = $api->listMemberInfo($listId, $emailarray);

		if ($api->errorCode){
			// if person is not on the list... this should never happen, just a fallback.
			Mage::log('Tried to list member info and got this error: ', json_encode($api), 'male.log');

			print_r(json_encode(
				array(
					'status' => $api->errorCode,
					'state' => "failed",
					'message' => "Sorry, something went wrong... I've logged this and am working on a solution. "
					)
			));

		} else {
			// person is on the list, check their status and update accordingly
			$status = $retval['data'][0]['merges']['STATUS'];
			if($status == 'member') {
				// this shouldn't happen, write to log. This person may have unsubscribed
				Mage::log('This person is saving with MALE, but already a member on mailchimp. May have unsubscribed. ', json_encode($retval), 'male.log');
				// TO DO: save to magento

			}
			else {
				$this->_redirect("get/party/update", array($fname,$retval['data'][0]['email'], $gender, $parameters[4]));
			}
		}
		
    }
    
    public function updateAction() {
		$parameters = $this->getRequest()->getParams();
		// $email = $email[1];
		$fname = $parameters[0];
		$email = $parameters[1];
		$gender = $parameters[2];
		$male = $parameters[3];

		// echo json_encode($parameters);
		// put them all in an array
		$mergeVars = array(
						'MALE' => 'in progress',
						'FNAME' => $fname,
						'GENDER' => $gender,
						'MALE' => $male
						);
		
		$storeId = Mage::app()->getStore()->getId();			
		$listId = Mage::helper('monkey')->getDefaultList($storeId);

    	// call ebizmarts api
		$api = Mage::getSingleton('monkey/api');
		$retval = $api->listUpdateMember($listId, $email, $mergeVars, 'html', false/* boolean replace_interests */ );

		if ($api->errorCode){
				
				Mage::log('Tried to update member and got this error: ', json_encode($api), 'male.log');

				print_r(json_encode(
					array(
						'status' => $api->errorCode,
						'state' => "failed",
						'message' => "Well, this is embarrassing. It seems something's gone wrong... I've logged it and am working on a solution. "
						)
				));

			} else {
				/* change status to 2 because flow is different for existing user saves */
				print_r(json_encode(
					array(
						'status' => 2,
						'state' => "success",
						'message' => "Awesome, all saved. "
						)
				));
		
			}

    }

    public function startedAction(){
    $this->loadLayout();
    $this->renderLayout();
    }

    public function passwordAction(){
    	if ($this->getRequest()->isPost()) {
			$password = $this->getRequest()->getPost('pword');
			if($password == 'brutalrelevance') {
				$response = array("status" => true);
			}
			else {
				$response = array("status" => false);
			}
			echo json_encode($response);
		}
		else {
			echo json_encode('nice try asshole');
		}
    }

}

