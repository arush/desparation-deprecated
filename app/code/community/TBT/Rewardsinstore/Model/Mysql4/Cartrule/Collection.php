<?php
class TBT_Rewardsinstore_Model_Mysql4_Cartrule_Collection extends Mage_SalesRule_Model_Mysql4_Rule_Collection
{

    protected function _construct()
    {
        $this->_init('rewardsinstore/cartrule');
    }

    /**
     * Init collection select
     *
     * @return TBT_Rewardsinstore_Model_Mysql4_Cartrule_Collection
     */
    public function _initSelect()
    {
        parent::_initSelect();
        
        // join the base rules' data to allow us to treat these as full-fledged rules
        $table_name = Mage::getModel('rewards/salesrule_rule')->getResource()->getMainTable();
        $this->getSelect()->joinLeft($table_name, "`{$table_name}`.`rule_id` = `main_table`.`rule_id`");
        
        return $this;
    }
    
    public function setOrder($field, $direction = self::SORT_ORDER_DESC)
    {
        parent::setOrder($field, $direction);
        
        if ($field == "rule_id") {
            $this->_orders[$field] = new Zend_Db_Expr('main_table.' . $field . ' ' . $direction);
        }
    }
}
?>
