<?php
class Vdh_Randomquote_Helper_Data extends Mage_Core_Helper_Abstract {

	public function getQuotes() {
		$mappings = Mage::getStoreConfig('randomquote/general/quotes');

		$mappings = unserialize($mappings);
		$return = array();
		foreach($mappings as $k => $v) {
			$return[] = $v;
		}
		$value = array();		
		foreach ($return as $key => $row) {
		    $value[$key]  = $row['order'];
		}            	
		return $return;

	}
	
	public function getStyles() {
		$mappings = Mage::getStoreConfig('randomquote/general/styles');
		$mappings = unserialize($mappings);
		$return = array();
		foreach($mappings as $k => $v) {
			$return[] = $v;
		}
		$value = array();
		foreach ($return as $key => $row) {
		    $value[$key]  = $row['order'];
		}            	
		array_multisort($value, SORT_ASC, $return);
		return $return;

	}
	
	public function getProfileDate() {
		$cutoff = Mage::getStoreConfig('randomquote/general/cutoff');
		$deliveryDate = Mage::getStoreConfig('randomquote/general/delivery_date');
		$billingDate = Mage::getStoreConfig('randomquote/general/billing_date');
		$today = mktime(0,0,0, date('m'),date('d')+$cutoff, date('Y'));
		$nextDelivery = mktime(0,0,0,date('m')+1, $deliveryDate, date('Y'));
		
		$return = array(
			"billing_date" => date('d/m/Y 00:00', mktime(0,0,0,date('m')+1, $billingDate, date('Y'))),
			"delivery_date" => date('d/m/Y', mktime(0,0,0,date('m')+1, $deliveryDate, date('Y')))			
		);
		if ($today > $nextDelivery) {
			$return = array(
				"billing_date" => date('d/m/Y 00:00', mktime(0,0,0,date('m')+2, $billingDate, date('Y'))),
				"delivery_date" => date('d/m/Y', mktime(0,0,0,date('m')+2, $deliveryDate, date('Y')))			
			);

		}
		return $return;
	}
	
	public function getInvitesRemaining() {
	
		$invites = Mage::getModel('rewardsref/referral')->getCollection()->addFieldToFilter('referral_parent_id', Mage::getSingleton('customer/session')->getId());
		
		$invitesRemaining = 50 -($invites->count() % 50);
		return $invitesRemaining;
	
	}
}