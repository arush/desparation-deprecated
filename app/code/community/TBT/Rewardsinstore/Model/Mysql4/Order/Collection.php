<?php
class TBT_Rewardsinstore_Model_Mysql4_Order_Collection extends Mage_Sales_Model_Mysql4_Order_Collection
{

    protected function _construct()
    {
        $this->_init('rewardsinstore/order');
    }

    /**
     * Init collection select
     *
     * @return TBT_Rewardsinstore_Model_Mysql4_Order_Collection
     */
    protected function _initSelect()
    {
        parent::_initSelect();
        
        // join the base orders' data to allow us to treat these as full-fledged orders
        $base = Mage::getModel('sales/order')->getResource();
        $this->getSelect()->joinLeft($base->getMainTable(), "{$base->getMainTable()}.{$base->getIdFieldName()} = {$this->getMainTable()}.{$this->getIdFieldName()}");
        
        return $this;
    }
}
?>
