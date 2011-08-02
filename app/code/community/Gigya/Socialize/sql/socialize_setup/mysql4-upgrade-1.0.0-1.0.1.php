<?php

$installer = $this;
/* @var $installer Mage_Customer_Model_Entity_Setup */

$installer->startSetup();

/*
if (!$this->getAttribute('customer', 'gigya_uid', 'attribute_id')) {
	$installer->addAttribute('customer', 'gigya_uid', array(
	        'type'	 => 'varchar',
	        'label'		=> 'GIGYA UID',
	        'visible'   => false,
			'required'	=> false
	));
}
*/
$installer->endSetup();
