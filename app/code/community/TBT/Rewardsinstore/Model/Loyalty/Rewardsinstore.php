<?php

class TBT_Rewardsinstore_Model_Loyalty_Rewardsinstore extends Mage_Core_Model_Abstract 
{
    protected function _beforeSave() {
    
    	// TODO: Add check for instance of Storefront
    	$this->validateStorefrontSubscription();
    	parent::_beforeSave();

    }
    
    protected function _afterSave() {
    
    	// TODO: Add check for instance of Storefront
    	$this->updateStorefrontMetrics();
    	parent::_afterSave();
    }
    
    protected function _afterDelete() {
    
    	// TODO: Add check for instance of Storefront
    	$this->updateStorefrontMetrics();
    	parent::_afterDelete();
    }
    
    private function updateStorefrontMetrics() {
    	
    	$response = Mage::helper('rewardsinstore/loyalty_checker')->submitStorefrontMetrics();
    	Mage::helper('rewardsinstore')->log($response);
    }
    
    private function validateStorefrontSubscription() {
    
    	$usage = Mage::getModel('rewardsinstore/storefront')->getCollection()->getSize() + ($this->getId() ? 0 : 1);
    
    	$response = Mage::helper('rewardsinstore/loyalty_checker')->fetchVerifySubscriptionResponse($usage);	
    	$data = json_decode($response, true);
    	
    	if ($data['result'] != 'subscription_valid') {
    		throw new Mage_Core_Exception($data['message']);
    	}
    }
}

?>