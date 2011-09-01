<?php
class TBT_Rewardsinstore_Model_Mysql4_Rewards_Salesrule_Rule_Collection extends Mage_SalesRule_Model_Mysql4_Rule_Collection
{

    protected function _construct()
    {
        $this->_init('rewards/salesrule_rule');
    }

    public function _initSelect()
    {
        parent::_initSelect();
        
        $table_name = Mage::getModel('rewardsinstore/cartrule')->getResource()->getMainTable();
        $this->getSelect()->where("main_table.rule_id NOT IN (SELECT rule_id FROM {$table_name})");
        
        return $this;
    }
}
?>
