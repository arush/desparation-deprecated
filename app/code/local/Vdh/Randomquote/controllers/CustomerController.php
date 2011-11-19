<?php class Vdh_Randomquote_CustomerController extends Mage_Core_Controller_Front_Action {

	public function setgroupAction() {

		$customerId = Mage::getSingleton('customer/session')->getId();		
		$customer = Mage::getModel('customer/customer')->load($customerId);
		
		$orders = Mage::getModel('sales/order')
			->getCollection()
			->addAttributeToFilter('customer_id', $customer->getId());
			
		print_r('hello');
	}

}