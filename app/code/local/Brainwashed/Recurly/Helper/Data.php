<?php 
require_once(Mage::getBaseDir('lib') . '/recurly.php');

class Brainwashed_Recurly_Helper_Data extends Mage_Core_Helper_Abstract {

	public function isEnabled() {
		return (bool)Mage::getStoreConfig('payment/recurly/active');
	}

	public function config() {
		
		if (!$this->isEnabled()) { return false; }
		Recurly_Client::$apiKey = Mage::getStoreConfig('payment/recurly/api_key');
		Recurly_js::$privateKey = Mage::getStoreConfig('payment/recurly/private_key');
		
	}
	
	public function signSubscription($sku, $account) {
		return Recurly_js::signSubscription($sku, $account);	
	}
	
	public function verifySubscription($results) {
	
		$this->config();
		$recurly_js = new Recurly_js($results);
		$recurly_js->verifySubscription();
	}
	
	public function getSubdomain() {
		return Mage::getStoreConfig('payment/recurly/subdomain');
	}
	
	public function getCountry() {
		return Mage::getStoreConfig('general/country/default');
	}
	
	public function getCurrency() {
		return Mage::app()->getStore()->getCurrentCurrencyCode();
	}
	
	public function getSku() {
		$quote =Mage::getSingleton('checkout/session')->getQuote();
		foreach($quote->getAllItems() as $item) {
			return $item->getSku();
		}
	}
	
	public function getInvoice($invoiceNumber){
		$this->config();
		
		return Recurly_Invoice::get($invoiceNumber);
	}	
	
	public function getAccount($accountCode) {
		$this->config();
		return Recurly_Account::get($accountCode);			
	}
	
	
	public function getPlan($planCode) {
		$this->config();	
		return Recurly_Plan::get($planCode);	
	}
	
	public function getAccountSubscriptions($accountCode) {
		$this->config();
		return Recurly_SubscriptionList::getForAccount($accountCode);	
	}
	
}