<?php

class TBT_Rewardsinstore_Block_Manage_Earning_Cart_Edit_Tab_Conditions extends TBT_Rewards_Block_Manage_Promo_Quote_Edit_Tab_Abstract {
	
	protected function _prepareForm() {
	    
		$model = Mage::registry('current_promo_quote_rule');
		
        $form = new Varien_Data_Form();
        $form->setHtmlIdPrefix('rule_');
        
        $renderer = Mage::getBlockSingleton('adminhtml/widget_form_renderer_fieldset')
            ->setTemplate('promo/fieldset.phtml')
            ->setNewChildUrl($this->getUrl('*/manage_earning_cart/newConditionHtml/form/rule_conditions_fieldset'));
        
        $fieldset = $form->addFieldset('conditions_fieldset', array(
            'legend'=>Mage::helper('salesrule')->__('Apply the rule only if the following conditions are met (leave blank for all products)')
        ))->setRenderer($renderer);

        $fieldset->addField('conditions', 'text', array(
            'name' => 'conditions',
            'label' => Mage::helper('salesrule')->__('Conditions'),
            'title' => Mage::helper('salesrule')->__('Conditions'),
        ))->setRule($model)->setRenderer(Mage::getBlockSingleton('rule/conditions'));
            
        if ($this->_isRedemptionType()) {
            $this->_getPointsActionFieldset($form);
        }
        
        $form->setValues($model->getData());
        $this->setForm($form);
        
        return parent::_prepareForm();
	}

}