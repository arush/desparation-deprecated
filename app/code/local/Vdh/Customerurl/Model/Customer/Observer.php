<?php
class Vdh_Customerurl_Model_Customer_Observer {

	public function addRewritesFromEvent($observer) {
		$customer = $observer->getEvent()->getCustomer();	
		$this->addRewrites($customer);
	}
	
	public function addRewritesFromId($customerId) {
		$customer = Mage::getModel('customer/customer')->load($customerId);
		$this->addRewrites($customer);
	}	

	public function addRewrites($customer) {

		$helper = Mage::helper('customerurl');
		
		$templates = $helper->getMappings();
		foreach ($templates as $template) {
			$url = str_replace(
				array('{customer_id}', '{customer_url}'), 
				array($customer->getId(), $customer->getCustomerurl()), 
				$template['url']
			);
			$redirect = str_replace(
				array('{customer_id}', '{customer_url}'), 
				array($customer->getId(), $customer->getCustomerurl()), 
				$template['redirect']
			);
			$currentUrl = Mage::getModel('core/url_rewrite')->getCollection()
			->addFilter('target_path', $redirect)
			->addFilter('id_path', $redirect . '_' . $customer->getId())
			->getFirstItem();
			
			$currentUrl->setStoreId(Mage_Core_Model_App::ADMIN_STORE_ID);
			$currentUrl->setIdPath($redirect . '_' . $customer->getId());
			$currentUrl->setRequestPath($url);						
			$currentUrl->setTargetPath($redirect);			
			$currentUrl->setIsSystem(false);						
			$currentUrl->save();
			
		}
	}
	
	public function createUniqueFromEvent($observer) {
		$customer = $observer->getEvent()->getCustomer();
		$this->createUnique($customer);
	}
	public function createUniqueFromId($customerId) {
		$customer = Mage::getModel('customer/customer')->load($customerId);
		$this->createUnique($customer);		
	}
	
	public function createUnique($customer, $default = 'username') {
	
		if (!$customer->getCustomerurl()) {
			$customer->setCustomerurl($customer->getFirstname());
		}
		if (!$customer->getCustomerurl()) {
			$customer->setCustomerurl($default);
		}
		$otherCustomers = Mage::getModel('customer/customer')
			->getCollection()
			->addAttributeToFilter('customerurl', $customer->getCustomerurl());
			
		$updatedUrl = $customer->getCustomerurl();
		foreach($otherCustomers as $other) {
			if ($other->getId() == $customer->getId() && $otherCustomers->count() == 1) {
				break;
			} elseif ($other->getId() == $customer->getId()) {
				continue;
			}
			
			$originalUrl	= $updatedUrl;
			$pattern		=	"/(.*)([0-9]+)$/";

			$updatedUrl		=	preg_replace_callback(
									$pattern,
									create_function(
						            	'$matches',
			        			    	'return ($matches[1] . (((int)$matches[2])+1));'
							        ),
						    	    $originalUrl
								);
			if ($updatedUrl == $originalUrl) { $updatedUrl .= '1'; }
			
			$otherCustomers = Mage::getModel('customer/customer')
				->getCollection()
				->addAttributeToFilter('customerurl', $updatedUrl);						
		}
		$customer->setCustomerurl($updatedUrl);			
	}
	
}