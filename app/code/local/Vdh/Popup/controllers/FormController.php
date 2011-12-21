<?php
class Vdh_Popup_FormController extends Mage_Core_Controller_Front_Action {

	public function countAction() {
		$count = 0;	
		foreach(Mage::helper('popup')->getUrls() as $url) {
			try {
				$template = explode('/', $url);
				$this->loadLayout();
		        $this->getLayout()->getBlock('root')->setTemplate('vdh/popup/'. $template[5] . '.phtml');
		        if (strlen($this->getLayout()->getBlock('root')->toHtml()) > 0) { count++; }
			
			} catch(Exception $e) {
				print_r($e);
			}
		}
		print_r($count);
	}
	
	
	public function pageAction() {
		$formData = $this->getRequest()->getParams();		
        $this->loadLayout();
        $this->getLayout()->getBlock('root')->setTemplate('vdh/popup/'. trim($formData['index'], '/') . '.phtml');
		$this->getLayout()->getBlock('root')->setData($formData);
    	$this->renderLayout();	
	}	
}
