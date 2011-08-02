<?php

/**
 * activity feed block
 *
 * @category   Mage
 * @package    Gigya_Socialize
 * @author     
 */
class Gigya_Socialize_Block_Plugin_Recommendations extends Gigya_Socialize_Block_Plugin_Abstract //Mage_Core_Block_Template
{

	public function _prepareLayout(){
	}
	
    public function getPluginName() {
    	return 'recommendations';
    }
    
    public function getPluginDisplayName() {
    	return $this->__('Recommendations');
    }
    public function getConfigGroupName() {
    	return 'recommendations';
    }
    
	//TODO:make this a real configuration option.
    public function isEnabled($storeId=null) {
    	$originalReturnValue=parent::isEnabled($storeId);
    	return $originalReturnValue;
    }

    //TODO:make this a real configuration option.
    public function isConfigured($storeId=null) {
    	$originalReturnValue=parent::isConfigured($storeId);
    	return $originalReturnValue;
    }
    
    
    /**
     * Retrieve username for form field
     *
     * @return string
     */
    public function getAdvancedSettings()
    {
    	return $this->getSetting('advanced');//Mage::helper('socialize')->getConfig()->getProductReactionsBarAdvancedSettings();
    }
    
    
}
