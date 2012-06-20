<?php

class Arush_Get_PartyController extends Mage_Core_Controller_Front_Action
{
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
			echo 'nice try asshole';
		}
    }

}

