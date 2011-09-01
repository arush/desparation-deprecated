<?php

class TBT_Rewardsinstore_Block_Manage_Earning_Cart_Distributions extends TBT_Rewards_Block_Manage_Widget_Grid_Container {
	
	protected $_blockGroup = 'rewardsinstore';
	const RULE_TYPE = TBT_Rewards_Helper_Rule_Type::DISTRIBUTION;
	
	public function __construct() {
		$this->_controller = 'manage_earning_cart_distributions';
		$this->_blockGroup = "rewardsinstore";
		$this->_headerText = Mage::helper ( 'rewardsinstore' )->__ ( 'Instore Cart Earning Rules' );
		$this->_addButtonLabel = Mage::helper ( 'rewardsinstore' )->__ ( 'Add New Instore Cart Earning Rule' );
		parent::__construct ();
	}
	
	public function getCreateUrl() {
		return $this->getUrl ( '*/*/new', array ('type' => self::RULE_TYPE ) );
	}

}