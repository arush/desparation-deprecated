<?php

class TBT_Rewardsinstore_Block_Manage_Earning_Cart_Edit_Form extends Mage_Adminhtml_Block_Widget_Form {
	
	public function __construct() {
		parent::__construct ();
		$this->setId ( 'manage_promo_quote_form' );
		$this->setTitle ( Mage::helper ( 'salesrule' )->__ ( 'Rule Information' ) );
	}
	
	protected function _prepareForm() {
		$form = new Varien_Data_Form ( array ('id' => 'edit_form', 'action' => $this->getData ( 'action' ), 'method' => 'post' ) );
		$form->setUseContainer ( true );
		$this->setForm ( $form );
		return parent::_prepareForm ();
	}

}
