<?php

/**
 * login plugin block
 *
 * @category   Mage
 * @package    Gigya_Socialize
 * @author     
 */
class Gigya_Socialize_Block_Plugin_Login extends Gigya_Socialize_Block_Plugin_Abstract //Mage_Core_Block_Template
{

	public function getPluginName() {
    	return 'login';
    }
    
    public function getPluginDisplayName() {
    	return $this->__('Login');
    }
    public function getConfigGroupName() {
    	return 'login';
    }
    
    /**
     * Retrieve form posting url
     *
     * @return string
     */
    public function getPostActionUrl()
    {
        return $this->helper('customer')->getLoginPostUrl();
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
    
}
