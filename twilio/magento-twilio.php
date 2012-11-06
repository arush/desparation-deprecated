<?php

header('Content-Type: text/plain');

ini_set('display_errors',true);
include('../app/Mage.php');
Mage::setIsDeveloperMode(true);

Mage::app(); //pass in store code if you like
date_default_timezone_set('Europe/London'); // add your locale - thanks to @benmarks from BlueAcorn for this


function isPayingCustomer($mobile) {

	$customers = Mage::getResourceModel('customer/customer_collection')
               ->addNameToSelect()
               ->addAttributeToSelect('email')

               ->joinAttribute('billing_telephone', 'customer_address/telephone', 'default_billing', null, 'left');
 
               //->joinAttribute('shipping_telephone', 'customer_address/telephone', 'default_shipping', null, 'left')
               // ->addFieldToFilter('billing_telephone', 'notnull')

    foreach($customers as $customer) {
    	
    	$customerAddressId = $customer->getDefaultBilling();
		
		if ($customerAddressId) {
			$address = Mage::getModel('customer/address')->load($customerAddressId);
			$magentoTel = $address->getTelephone();
		} else {
			$address = false;
		}


    	// $magentoTel = $customer->getAttribute('billing_telephone');
    	
    	/* strings are not comparable yet, need to standardize them.

    	$magentoTel = '07917138230';
		$mobile = '+447917138230';

    	*/

		//remove whitespace
		$magentoTel = trim($magentoTel);
		//remove first zero
		$firstChar = substr($magentoTel, 0, 1);

		if($firstChar === '0') {
			$magentoTel = substr($magentoTel, 1);
		}

		//remove country code +44 <-- assumes UK mobile
		$mobile = substr($mobile, 3);

    	if($magentoTel === $mobile) {
    		// var_dump($customer);
	    	// die;
    		return $customer->getEmail();
    	}
    }
    // var_dump($customers);
	return false;
}



?>