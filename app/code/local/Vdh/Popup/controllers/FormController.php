<?php
class Vdh_Popup_FormController extends Mage_Core_Controller_Front_Action {

	public function countAction() {
		$count = 0;	
		foreach(Mage::helper('popup')->getUrls() as $url) {

			$c = curl_init();
			curl_setopt($c, CURLOPT_URL, Mage::getBaseUrl() . $url);
			curl_setopt($c, CURLOPT_HEADER, true);
			curl_setopt($c, CURLOPT_NOBODY, true);
			curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($c, CURLOPT_FOLLOWLOCATION, true);
			curl_setopt($c, CURLOPT_SSL_VERIFYPEER, false);
			curl_exec($c);
			$httpcode = curl_getinfo($c, CURLINFO_HTTP_CODE);
			$size = curl_getinfo($c, CURLINFO_CONTENT_LENGTH_DOWNLOAD);
			curl_close($c);
			print_r($httpcode . ' - ' . $size . ' - ' .Mage::getBaseUrl() . $url);			
			if ($httpcode == 200 && $size > 0) {
				$count++;
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
