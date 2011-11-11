<?php
class Vdh_Randomquote_Model_Email_Template extends Mage_Core_Model_Email_Template {

    public function sendTransactional($templateId, $sender, $email, $name, $vars=array(), $storeId=null) {
    
		$params = Mage::app()->getFrontController()->getRequest()->getParams();

		if (!array_key_exists($params['invite_style']) || array_key_exists($params['invite_quote'])) {
	    	parent::sendTransactional($templateId, $sender, $email, $name, $vars, $storeId);
		}
				
		$inviteStyle = Mage::getModel('randomquote/style')->load($params['invite_style']);
		$randomQuote = Mage::getModel('randomquote/quote')->load($params['invite_quote']);	
		$newVars = $vars;
		$newVars['referral']->setData(
			array_merge(
				$newVars['referral']->getData(),
				array("text"=>$inviteStyle->getData('text')),
				$randomQuote->getData()
			)
		);
    	parent::sendTransactional($templateId, $sender, $email, $name, $newVars, $storeId);
    }
    	
	
}