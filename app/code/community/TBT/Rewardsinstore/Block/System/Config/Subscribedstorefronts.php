<?php

class TBT_Rewardsinstore_Block_System_Config_Subscribedstorefronts extends Mage_Adminhtml_Block_System_Config_Form_Field {
    
    protected function _getElementHtml(Varien_Data_Form_Element_Abstract $element) {
    
        return Mage::helper('rewardsinstore/loyalty_checker')->getUsageText();
    }

}
