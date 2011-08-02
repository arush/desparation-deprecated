<?php

/**
 * product comments block
 *
 * @category   Mage
 * @package    Gigya_Socialize
 * @author     
 */
class Gigya_Socialize_Block_Plugin_Comments extends Gigya_Socialize_Block_Plugin_Abstract //Mage_Core_Block_Template
{
	private $_streamID='';

    public function getPluginName() {
    	return 'comments';
    }
    
    public function getPluginDisplayName() {
    	return $this->__('Comments');
    }
    public function getConfigGroupName() {
    	return 'product_comments';
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
    public function getCategoryId()
    {
    	return Mage::helper('socialize')->getConfig()->getCommentsProductCommentsCategoryId();
    }
    public function getAdvancedSettings()
    {
    	return Mage::helper('socialize')->getConfig()->getProductCommentsAdvancedSettings();
    }
    
    public function getStreamId() {
    	$product = Mage::registry('product');
    	return $product->getId();
    }
    
    
}
