<?php class Vdh_Randomquote_CustomerController extends Mage_Core_Controller_Front_Action {

	public function setgroupAction() {

		$customerId = Mage::getSingleton('customer/session')->getId();		
		$customer = Mage::getModel('customer/customer')->load($customerId);
		
		$orders = Mage::getModel('sales/order')
			->getCollection()
			->addAttributeToFilter('customer_id', $customer->getId());

		foreach($orders as $order) {
			$items = $order->getAllItems();
			foreach($items as $item) {
				$product = Mage::getModel('catalog/product')->load($items->getId());
				print_r($product->getSku());
			
			}
		}

		$customerGroupId = 0;
		
		if ($customerGroupId != $customer->getCustomerGroupId()) {
			$customer->setCustomerGroupId($customerGroupId);
			$customer->save();	
		}
	}

}