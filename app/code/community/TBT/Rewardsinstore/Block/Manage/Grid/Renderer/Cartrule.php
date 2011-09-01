<?php

class TBT_Rewardsinstore_Block_Manage_Grid_Renderer_Cartrule extends Mage_Adminhtml_Block_Widget_Grid_Column_Renderer_Abstract {

    /**
     * Renderer the Storefronts column for Cartrules
     *
     * @param Varien_Object $row
     * @return string
     */
    public function render (Varien_Object $row) {
        
        $text = '';
        if ($id = $row->getId()) {
            if ($cartrule = Mage::getModel('rewardsinstore/cartrule')->load($id)) {
                $text = $this->_getStorefrontColumnText($cartrule);
            }
        }
        return $text;
    }
    
    /**
     * Returns text for the Storefronts column in cartrule grid
     *
     * @param TBT_Rewardsinstore_Model_Cartrule $cartrule
     * @return string
     */
    protected function _getStorefrontColumnText($cartrule) {
        
        $storefrontIds = $cartrule->getStorefrontIds();
        
        $names = Mage::getModel('rewardsinstore/storefront')
            ->getCollection()
            ->filterOnIds($storefrontIds)
            ->getColumnValues('name');

        // Special case if all storefronts are selected
        if (Mage::getModel('rewardsinstore/storefront')->getCollection()->getSize() === count($names)) {
            return  Mage::helper('rewardsinstore')->__('All Storefronts'); 
        }
        
        return Mage::helper('rewardsinstore')->arrayToString($names, ', ', 5);
    }

}