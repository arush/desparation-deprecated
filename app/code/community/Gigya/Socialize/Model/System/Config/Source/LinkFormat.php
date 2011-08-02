<?php
class Gigya_Socialize_Model_System_Config_Source_LinkFormat {
    public function toOptionArray()
    {
        return array(
        	array('value'=>'text', 'label'=>Mage::helper('socialize')->__('Text')),
        	array('value'=>'icon', 'label'=>Mage::helper('socialize')->__('Icon')) 
        	//,
        	//array('value'=>'both', 'label'=>Mage::helper('socialize')->__('Both'))            
        );
    }

}