<?php
class Gigya_Socialize_Model_System_Config_Source_Privacy {
    public function toOptionArray()
    {
        return array(
            array('value'=>'public', 'label'=>Mage::helper('socialize')->__('Public')),
            array('value'=>'friends', 'label'=>Mage::helper('socialize')->__('Friends')),
            array('value'=>'private', 'label'=>Mage::helper('socialize')->__('Private')),            
        );
    }

}
