<?php
echo '<br/><br/><br/>THIS IS NOT USED ANYWHERE (I THIKN)<br/><br/><br/>';

/**
 * product comments block
 *
 * @category   Mage
 * @package    Gigya_Socialize
 * @author     
 */
class Gigya_Socialize_Block_Catalog_Product_Comments extends Gigya_Socialize_Block_Plugin //Mage_Core_Block_Template
{
	private $_streamID='';
	
	//TODO:make this a real configuration option.
    public function isEnabled() {
    	return parent::isEnabled();
    }

    //TODO:make this a real configuration option.
    public function isConfigured() {
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
    	return $this->getProductId();
    }
    
}
