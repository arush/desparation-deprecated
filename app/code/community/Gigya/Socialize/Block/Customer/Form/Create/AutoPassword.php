<?php
class Gigya_Socialize_Block_Customer_Form_Create_AutoPassword extends Mage_Core_Block_Template
{
    protected function _toHtml()
    {
        $value=Mage::helper('socialize')->isEnabledAndConfigured();
        if (!$value) return '';
        
        return parent::_toHtml();
    }	
}