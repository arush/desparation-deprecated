<?php

class TBT_Rewardsinstore_Block_Manage_Earning_Cart_Edit_Tab_Actions extends TBT_Rewards_Block_Manage_Promo_Quote_Edit_Tab_Abstract {
	
    protected $_currencyList;
	protected $_currencyModel;
	
	protected function _prepareForm () {
	    
        $model = Mage::registry('current_promo_quote_rule');
        $form = new Varien_Data_Form();
        $form->setHtmlIdPrefix('rule_');
        
        // If earning rule
        if (!$this->_isRedemptionType()) {
            $this->_getPointsActionFieldset($form);
        }
        
        // Don't apply any discounts to shipping until we assure this feature.
        // TODO allow shipping discounts
        $model->setApplyToShipping(false);
        $model->setSimpleFreeShipping(false);
        $this->_getPriceActionFieldset($form, $model);
        
        // This isn't nesessary for Instore.. yet
        // $this->_getApplyToActionFieldset($form, $model);
        
        $form->setValues($model->getData());
        $this->setForm($form);
        
        return parent::_prepareForm();
    }

}
