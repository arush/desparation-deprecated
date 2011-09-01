<?php
class TBT_Rewardsinstore_Model_Mysql4_Cartrule extends Mage_SalesRule_Model_Mysql4_Rule
{
    // override parent members to ensure our mashing logic works properly
    protected $_useIsObjectNew = true;
    protected $_isPkAutoIncrement = false;

    protected function _construct()
    {
        $this->_init('rewardsinstore/cartrule', 'rule_id');
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
        
        // join the base rule's data to allow us to treat this as a full-fledged rule
        $table_name = Mage::getModel('rewards/salesrule_rule')->getResource()->getMainTable();
        $select->joinLeft($table_name, "`{$table_name}`.`rule_id` = `{$this->getMainTable()}`.`rule_id`");
        
        return $select;
    }
}

?>