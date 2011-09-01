<?php
class TBT_Rewardsinstore_Model_Mysql4_Quote_Collection extends Mage_Sales_Model_Mysql4_Quote_Collection
{

    protected function _construct()
    {
        $this->_init('rewardsinstore/quote');
        $this->_setIdFieldName('quote_id');
    }

    /**
     * Init collection select
     *
     * @return TBT_Rewardsinstore_Model_Mysql4_Quote_Collection
     */
    protected function _initSelect()
    {
        parent::_initSelect();
        
        // join the base quotes' data to allow us to treat these as full-fledged quotes
        $base = Mage::getModel('sales/quote')->getResource();
        $this->getSelect()->joinLeft($base->getMainTable(), "{$base->getMainTable()}.{$base->getIdFieldName()} = main_table.{$this->getIdFieldName()}");
        
        return $this;
    }
}
?>
