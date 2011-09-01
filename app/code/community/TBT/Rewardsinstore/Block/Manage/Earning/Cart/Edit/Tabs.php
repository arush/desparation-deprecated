<?php

class TBT_Rewardsinstore_Block_Manage_Earning_Cart_Edit_Tabs extends Mage_Adminhtml_Block_Widget_Tabs {
	
	public function __construct() {
		parent::__construct ();
		$this->setId('promo_catalog_edit_tabs');
        $this->setDestElementId('edit_form');
		
		if ($this->_isRedemptionType()) {
            $this->setTitle(Mage::helper('rewards')->__('Instore Cart Spending Rule'));
        } else {
            $this->setTitle(Mage::helper('rewards')->__('Instore Cart Earning Rule'));
        }
	}
	
	protected function _beforeToHtml() {
		
	    $this->addTab('main_section', array('label' => Mage::helper('salesrule')->__('Rule Information') , 'content' => $this->getLayout()->createBlock('rewardsinstore/manage_earning_cart_edit_tab_main')->toHtml() , 'active' => true));
        
	    $this->addTab('conditions_section', array('label' => Mage::helper('salesrule')->__('Conditions') , 'content' => $this->getLayout()->createBlock('rewardsinstore/manage_earning_cart_edit_tab_conditions')->toHtml()));
        
	    $this->addTab('actions_section', array('label' => Mage::helper('salesrule')->__('Actions') , 'content' => $this->getLayout()->createBlock('rewardsinstore/manage_earning_cart_edit_tab_actions')->toHtml()));
        
        if (Mage::helper('rewards')->isBaseMageVersionAtLeast('1.4') && $this->_isRedemptionType()) {
            $this->addTab('labels_section', array('label' => Mage::helper('salesrule')->__('Labels') , 'content' => $this->getLayout()->createBlock('rewards/manage_promo_quote_edit_tab_labels')->toHtml()));
        }
        
        return parent::_beforeToHtml ();
	}

    /**
     * Returns the model for this form.
     *
     * @return TBT_Rewards_Model_Salesrule_Rule
     */
    protected function _getRule () {
        $model = Mage::registry('current_promo_quote_rule');
        return $model;
    }

    /**
     * Returns true if this should display redemption
     *
     * @return boolean
     */
    protected function _isRedemptionType () {
        if ($type = $this->getRequest()->getParam('type')) {
            return $type == TBT_Rewards_Helper_Rule_Type::REDEMPTION;
        }
        if ($ruleTypeId = $this->_getRule()->getRuleTypeId()) {
            return $this->_getRule()->isRedemptionRule();
        }
        Mage::getSingleton('rewards/session')->addError("Could not determine rule type in " . "Promo/Edit/Tab/Actions so assumed redemption.");
        return true;
    }

    /**
     * Returns true if this should display distribution
     *
     * @return boolean
     */
    protected function _isDistributionType () {
        if ($type = $this->getRequest()->getParam('type')) {
            return $type == TBT_Rewards_Helper_Rule_Type::DISTRIBUTION;
        }
        if ($ruleTypeId = $this->_getRule()->getRuleTypeId()) {
            return $this->_getRule()->isDistributionRule();
        }
        Mage::getSingleton('rewards/session')->addError("Could not determine rule type in " . "Promo/Edit/Tab/Actions so assumed distribution.");
        return true;
    }
	
    // Might use this later if we decide to extend the Rewards module classes
    protected function callGrandparent($grandchild, $method) {
        call_user_func(array(get_parent_class(get_parent_class($grandchild)), $method));
    }

}
