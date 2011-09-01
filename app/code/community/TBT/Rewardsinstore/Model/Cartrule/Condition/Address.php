<?php

class TBT_Rewardsinstore_Model_Cartrule_Condition_Address extends Mage_SalesRule_Model_Rule_Condition_Address
{
    
    /**
     * Checks which Cartrule attributes are enabled in the config and only
     * shows those attributes when creating conditions for the rule.
     */
    public function loadAttributeOptions()
    {
        $enabledAttributes = explode(',', Mage::getStoreConfig('rewardsinstore/custom_attributes/cartrule_attributes'));
        
        $cartruleAttributeCollection = Mage::getModel('rewardsinstore/cartrule_attribute')
                ->getCollection()
                ->addFieldToFilter('cartrule_attribute_id', array('IN' => $enabledAttributes));
        
        $attributes = array();
        foreach ($cartruleAttributeCollection as $ca) {
                $attributes[$ca->getCode()] = $ca->getFrontendLabel();
        }

        $this->setAttributeOption($attributes);

        return $this;
    }

}
