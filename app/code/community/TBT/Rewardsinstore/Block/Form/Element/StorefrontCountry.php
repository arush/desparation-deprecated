<?php

/**
 * This form element displays a list of available coutries based on the Directory module
 */
class TBT_Rewardsinstore_Block_Form_Element_StorefrontCountry extends Varien_Data_Form_Element_Abstract
{
	public function __construct($attributes=array())
    {
        parent::__construct($attributes);
    }

    public function getElementHtml()
    {
        $country_id = $this->getData('value');
        return Mage::getBlockSingleton('directory/data')
            ->getCountryHtmlSelect($country_id, 'storefront[country_id]', 'country_id', $this->getData('label'));
    }
}