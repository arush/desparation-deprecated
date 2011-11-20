<?php
class Vdh_Randomquote_Model_Customer_Observer {

	public function customerSave($observer) {
		$customer = $observer->getEvent()->getCustomer();	
		return Mage::getModel('randomquote/customer')->setGroupId($customer);
	}
	
	public function orderSave($observer) {
		$order = $observer->getEvent()->getOrder();
		$customer = Mage::getModel('customer/customer')->load($order->getCustomerId());
		return Mage::getModel('randomquote/customer')->setGroupId($customer);
	}	

	public function profileSave($observer) {
		$profile = $observer->getEvent()->getRecurringProfile();
		$customer = Mage::getModel('customer/customer')->load($profile->getCustomerId());
		return Mage::getModel('randomquote/customer')->setGroupId($customer);
	}	
	
}