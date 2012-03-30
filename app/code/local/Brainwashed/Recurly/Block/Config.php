<?php
class Brainwashed_Recurly_Block_Config extends Mage_Core_Block_Template {

    protected function _construct() {
        parent::_construct();
		$this->setTemplate('brainwashed/recurly/config.phtml');
    }
    
    protected function _isOnceOff() {
    	$planCodes = array();
    	$plans = Mage::helper('recurly')->getPlans();
    	foreach($plans as $plan){
    		$planCodes[] = $plan->plan_code;
    	}
		$quote = Mage::getSingleton('checkout/session')->getQuote();
        foreach ($quote->getAllItems() as $item) {
        	if (!in_array($item->getSku(), $planCodes)) {
        		return true;
        	}
        }		
    	return false;
    }
}