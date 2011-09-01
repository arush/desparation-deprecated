<?php

class TBT_Rewardsinstore_Block_System_Config_CreateInstoreProduct extends Mage_Adminhtml_Block_System_Config_Form_Field {
    
    /**
     * Temporary button for creating the Instore product used for Instore orders
     */
    protected function _getElementHtml(Varien_Data_Form_Element_Abstract $element) {
        
        $this->setElement($element);
        $url = $this->getUrl('rewardsinstore/pos_order/createinstoreproduct'); //

        Mage::app()->setCurrentStore(Mage_Core_Model_App::ADMIN_STORE_ID);
        $id = Mage::getStoreConfig('rewardsinstore/hidden_config/instore_product_id');
        
        if (is_null($id)) {
            $html = $this->getLayout()->createBlock('adminhtml/widget_button')
            ->setType('button')
            ->setClass('scalable')
            ->setLabel('Create Product')
            ->setOnClick("setLocation('$url')")
            ->toHtml();
        } else {
            $html = $this->getLayout()->createBlock('adminhtml/widget_button')
            ->setType('text')
            ->setClass('scalable')
            ->setLabel('Already Created with id ' . $id)
            ->setDisabled(true)
            ->toHtml();
        }

        return $html;
    }

}
