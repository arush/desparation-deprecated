<?php
class TBT_Rewardsinstore_Model_Mysql4_Order extends Mage_Sales_Model_Mysql4_Order
{
    // override parent members to ensure our mashing logic works properly
    protected $_useIsObjectNew = true;
    protected $_isPkAutoIncrement = false;

    protected function _construct()
    {
        $this->_init('rewardsinstore/order', 'order_id');
    }

    /**
     * Retrieve select object for load object data
     *
     * @param   string $field
     * @param   mixed $value
     * @return  Zend_Db_Select
     */
    protected function _getLoadSelect($field, $value, $object)
    {
        $select = parent::_getLoadSelect($field, $value, $object);
        
        // join the base order's data to allow us to treat this as a full-fledged order
        $base = Mage::getModel('sales/order')->getResource();
        $select->joinLeft($base->getMainTable(), "{$base->getMainTable()}.{$base->getIdFieldName()} = {$this->getMainTable()}.{$this->getIdFieldName()}");
        
        // if we're polluting this model, then we must allow the user to load a regular order
        // into it, with Instore fields null, so we need a fancy-pants UNION in the query!
        if ($object->getOrderPollution()) {
            $select2 = $this->_getReadAdapter()->select()
                ->from($this->getMainTable())
                ->where("{$base->getMainTable()}.{$base->getIdFieldName()}=?", $value)
                ->joinRight($base->getMainTable(), "{$base->getMainTable()}.{$base->getIdFieldName()} = {$this->getMainTable()}.{$this->getIdFieldName()}");
            $select = $this->_getReadAdapter()->select()->union(array($select, $select2));
        }
        
        return $select;
    }

    /**
     * Retrieve grid table
     *
     * @return string
     */
    public function getGridTable()
    {
		return parent::getGridTable() ?
			Mage::getModel('sales/order')->getResource()->getMainTable() . '_grid'
				: false;
    }
}

?>