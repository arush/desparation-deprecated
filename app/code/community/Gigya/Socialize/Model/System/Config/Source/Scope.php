<?php
class Gigya_Socialize_Model_System_Config_Source_Scope {
    public function toOptionArray()
    {
        return array(
            array('value'=>'both', 'label'=>Mage::helper('socialize')->__('Both')),            
        //            array('value'=>'internal', 'label'=>Mage::helper('socialize')->__('Internal')),
            array('value'=>'external', 'label'=>Mage::helper('socialize')->__('External')),
        );
    }

}