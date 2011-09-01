<?php

class TBT_Rewardsinstore_Block_Manage_Storefront_Grid_Address extends Mage_Adminhtml_Block_Widget_Grid_Column_Renderer_Abstract {

    /**
     * Renderer the Region column for the storefront grid
     *
     * @param Varien_Object $row
     * @return string
     */
    public function render (Varien_Object $row) {
        
        $text = '';
        if ($id = $row->getId()) {
            if ($storefront = Mage::getModel('rewardsinstore/storefront')->load($id)) {
                $text = $this->_getStorefrontColumnText($storefront);
            }
        }
        return $text;
    }
    
    /**
     * Returns text for the state/province from region_id
     *
     * @param unknown_type $storefront
     * @return string
     */
    protected function _getStorefrontColumnText($storefront) {
        if ($address = $storefront->getFormattedAddress()) {
            return $address;
        }
        return '';
    }

}