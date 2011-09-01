<?php

/**
 * This form element displays a list of available coutries based on the Directory module
 */
class TBT_Rewardsinstore_Block_Form_Element_StorefrontRegion extends Varien_Data_Form_Element_Abstract
{
	public function __construct($attributes=array())
    {
        parent::__construct($attributes);
    }

    public function getElementHtml()
    {
        // Note: this renderer is not actually used right now, another is set in the storefront form
        return Mage::getBlockSingleton('directory/data')->getRegionHtmlSelect();
    }
}