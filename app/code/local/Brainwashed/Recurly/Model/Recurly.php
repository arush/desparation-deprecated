<?php

class Brainwashed_Recurly_Model_Recurly extends Mage_Payment_Model_Method_Abstract {
 
	protected $_code = 'recurly';
	 
	protected $_isInitializeNeeded      = true;
	protected $_canUseInternal          = false;
	protected $_canUseForMultishipping  = false;
 
	public function getOrderPlaceRedirectUrl() {
		return Mage::getUrl('recurly/standard/redirect', array('_forced_secure' => true));
	}
 
}