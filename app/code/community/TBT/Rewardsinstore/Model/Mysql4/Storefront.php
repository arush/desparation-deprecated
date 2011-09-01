<?php

class TBT_Rewardsinstore_Model_Mysql4_Storefront extends Mage_Core_Model_Mysql4_Abstract {
    
    protected function _construct()
    {
        $this->_init('rewardsinstore/storefront', 'storefront_id');
    }   
    
    /**
     * Initialize unique fields
     *
     * @return Mage_Core_Model_Mysql4_Abstract
     */
    protected function _initUniqueFields()
    {
        $this->_uniqueFields = array(array(
            'field' => 'code',
            'title' => Mage::helper('rewardsinstore')->__('Storefront with the same URL Code')
        ));
        return $this;
    }
}

?>