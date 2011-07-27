<?php
class Vdh_Popup_Helper_Data extends Mage_Core_Helper_Abstract {


	public function getTriggerUrl() {
		return Mage::getStoreConfig('popup/general/trigger');
	}
	
	public function getUrls() {
		$url = Mage::getStoreConfig('popup/general/url');
		if (!$url) { array(); }
		return unserialize($url);
	}
}