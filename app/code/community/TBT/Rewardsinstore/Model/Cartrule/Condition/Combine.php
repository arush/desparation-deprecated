<?php

class TBT_Rewardsinstore_Model_Cartrule_Condition_Combine extends Mage_Rule_Model_Condition_Combine
{
    public function __construct()
    {
        parent::__construct();
        $this->setType('salesrule/rule_condition_combine');
    }

    public function getNewChildSelectOptions()
    {
        $addressCondition = Mage::getModel('rewardsinstore/cartrule_condition_address');
        $addressAttributes = $addressCondition->loadAttributeOptions()->getAttributeOption();
        $attributes = array();
        foreach ($addressAttributes as $code=>$label) {
            $attributes[] = array('value'=>'salesrule/rule_condition_address|'.$code, 'label'=>$label);
        }

        $conditions = parent::getNewChildSelectOptions();
        $conditions = array_merge_recursive($conditions, array(
            array('value'=>'salesrule/rule_condition_product_found', 'label'=>Mage::helper('salesrule')->__('Product attribute combination')),
            array('value'=>'salesrule/rule_condition_product_subselect', 'label'=>Mage::helper('salesrule')->__('Products subselection')),
            array('value'=>'salesrule/rule_condition_combine', 'label'=>Mage::helper('salesrule')->__('Conditions combination')),
            array('label'=>Mage::helper('rewardsinstore')->__('Instore Cart Attribute'), 'value'=>$attributes),
        ));

        $additional = new Varien_Object();
        Mage::dispatchEvent('salesrule_rule_condition_combine', array('additional' => $additional));
        if ($additionalConditions = $additional->getConditions()) {
            $conditions = array_merge_recursive($conditions, $additionalConditions);
        }

        return $conditions;
    }
}
