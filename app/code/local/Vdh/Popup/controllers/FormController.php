<?php
class Vdh_Popup_FormController extends Mage_Core_Controller_Front_Action {

	public function pageAction() {
		$formData = $this->getRequest()->getParams();		
        $this->loadLayout();
        $this->getLayout()->getBlock('root')->setTemplate('vdh/popup/'. trim($formData['index'], '/') . '.phtml');
		$this->getLayout()->getBlock('root')->setData($formData);
    	$this->renderLayout();	
	}	
}
