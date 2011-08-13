<?php

class Arush_Oneall_Model_Observer {

	public function addIdentifier($observer) {
		if($profile = Mage::getSingleton('oneall/session')->getIdentifier()) {
			Mage::helper('oneall/identifiers')
				->save_identifier($observer->getCustomer()->getId(), $profile);
			Mage::getSingleton('oneall/session')->setIdentifier(false);
		}
	}

	public function onConfigSave($observer) {
		if(Mage::getStoreConfig('oneall/vars/apikey') != Mage::getStoreConfig('oneall/options/apikey') || strlen(Mage::getStoreConfig('oneall/vars/appid'))<1){
			Mage::helper('oneall/rpxcall')->rpxLookupSave();
		}
	}

}