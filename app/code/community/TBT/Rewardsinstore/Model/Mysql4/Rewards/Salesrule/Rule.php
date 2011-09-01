<?php
class TBT_Rewardsinstore_Model_Mysql4_Rewards_Salesrule_Rule extends Mage_SalesRule_Model_Mysql4_Rule
{

    protected function _construct()
    {
        $this->_init('salesrule/rule', 'rule_id');
    }
}

?>
