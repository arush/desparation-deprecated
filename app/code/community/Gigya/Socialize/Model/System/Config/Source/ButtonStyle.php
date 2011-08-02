<?php
class Gigya_Socialize_Model_System_Config_Source_ButtonStyle {
    public function toOptionArray()
    {
        return array(
            array('value'=>'', 'label'=>Mage::helper('socialize')->__('Icons')),            
            array('value'=>'fullLogo', 'label'=>Mage::helper('socialize')->__('Full Logos')),
        );
    }

}