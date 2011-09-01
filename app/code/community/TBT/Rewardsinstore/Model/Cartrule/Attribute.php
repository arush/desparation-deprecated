<?php

class TBT_Rewardsinstore_Model_Cartrule_Attribute extends Mage_Core_Model_Abstract 
{
    
    protected function _construct()
    {
        $this->_init('rewardsinstore/cartrule_attribute');
    }   
    
    /**
     * Returns if this attribute should be shown in Cartrule conditions
     *
     * @return boolean
     */
    public function isActive() {
        return $this->getIsActive();
    }
    
    /**
     * Options getter
     *
     * @return array
     */
    public function toOptionArray()
    {
        $cartruleAttributeCollection = $this->getCollection();
        
        $attributes = array();
        foreach ($cartruleAttributeCollection as $ca) {
            array_push($attributes, array(
                    'value' => $ca->getCartruleAttributeId(), 
                    'label'=>Mage::helper('rewardsinstore')->__($ca->getFrontendLabel())));
        }
        
        return $attributes;
    }
    
}

?>