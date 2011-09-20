<?php
class Vdh_Customerurl_UniqueController extends Mage_Core_Controller_Front_Action {

	public function verifyAction() {
		$customer = Mage::getModel('customer/customer')->load(1);
		$customer->setCustomerurl('psychocrackpot');
		$customer->setEmail('steve@vdh.za.net');		
		$customer->save();
		
		$customer = Mage::getModel('customer/customer')->load(1);
				
	}
	
	
	
	public function createAction() {

		$helper = Mage::helper('customerurl');
	
		$customer = Mage::getModel('customer/customer')->load(1);
		
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
	
	public function apiAction() {

		$client = new SoapClient('http://evogue.macpot.pro/index.php/api/soap/?wsdl');		
		$sessionId = $client->login('customerurl', 'cust0m3r');

		$customerId = 80; //Dummy Customer id
		$defaultUsername = 'user'; // Used when firstname isn't available
		$test = $client->call($sessionId, 'customerurl.addRewrites', $customerId);
		$test = $client->call($sessionId, 'customerurl.createUnique', array($customerId, $defaultUsername));		
		print_r($test);
		
				
	}
}