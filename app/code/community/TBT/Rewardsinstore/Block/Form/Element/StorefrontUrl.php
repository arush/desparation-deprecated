<?php

/**
 * This form element displays the Storefront URL as a hyperlink if one exists
 */
class TBT_Rewardsinstore_Block_Form_Element_StorefrontUrl extends Varien_Data_Form_Element_Abstract
{
	public function __construct($attributes=array())
    {
        parent::__construct($attributes);
        $this->setType('label');
    }

    public function getElementHtml()
    {
        // TODO: prevent this line from wrapping with long url
    	$html = $this->getBold() ? '<strong>' : '';
    	$html.= $this->buildHyperlink($this->getEscapedValue());
    	$html.= $this->getBold() ? '</strong>' : '';
    	$html.= $this->getAfterElementHtml();
    	return $html;
    }
    
    protected function buildHyperlink($code) {
        
        $base_url = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_LINK);
        $base_url.= TBT_Rewardsinstore_Model_Storefront::URL_TYPE_STOREFRONT;
        
        $url = $base_url . '?' . ($code ? $code : '<strong>URL_Code</strong>');
        
        // Only hyperlink if storefront exists
        if ($code) {
            $url = '<a href=' . $url . ' target="_blank">' . $url . '</a>';
        }
        
        return $url;
    }

}