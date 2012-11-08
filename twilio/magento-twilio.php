<?php

header('Content-Type: text/plain');

ini_set('display_errors',true);
include('../app/Mage.php');
Mage::setIsDeveloperMode(true);

Mage::app(); //pass in store code if you like
date_default_timezone_set('Europe/London'); // add your locale - thanks to @benmarks from BlueAcorn for this

function getOrders() {
	$orders = Mage::getSingleton('sales/order')->getCollection()
		->addAttributeToSelect('*');
		// ->addFieldToFilter('created_at', array('from'=>$from, 'to'=>$to))
		// ->addFieldToFilter('status', 'complete')
	 	// ->addFieldToFilter('status', array('in' => array('pending','complete','processing')));
	return $orders;
}


function getOrderBillingInfo($order)
{
    $billingAddress = !$order->getIsVirtual() ? $order->getBillingAddress() : null;
    $address_line1 = "";
    $district = "";
    
    // if(strpos($billingAddress->getData("street"), "\n")){
    //     $tmp = explode("\n", $billingAddress->getData("street"));
    //     $district = $tmp[1];
    //     $address_line1 = $tmp[0];
    // }
    // if($address_line1 == ""){
    //     $address_line1 = $billingAddress->getData("street");
    // }
    return array(
         // "billing_name" =>       $billingAddress ? $billingAddress->getName() : '',
         // "billing_company" =>    $billingAddress ? $billingAddress->getData("company") : '',
         // // "billing_street" =>     $billingAddress ? $address_line1 : '',
         // "billing_district" =>   $billingAddress ? $district : '',
         // "billing_zip" =>        $billingAddress ? $billingAddress->getData("postcode") : '',
         // "billing_city" =>       $billingAddress ? $billingAddress->getData("city") : '',
         // "billing_state" =>  $billingAddress ? $billingAddress->getRegionCode() : '',
         // "billing_country" =>    $billingAddress ? $billingAddress->getCountry() : '',
        "billing_telephone" =>   $billingAddress ? $billingAddress->getData("telephone") : ''
    );
}

function getOrderTelephone($orderBillingInfo) {
	return $orderBillingInfo["billing_telephone"];
}

function isPayingCustomer($mobile) {

	$orders = getOrders();
	
	foreach($orders as $order) {

		$orderBillingInfo = getOrderBillingInfo($order);

		if ($orderBillingInfo) {

			$magentoTel = getOrderTelephone($orderBillingInfo);

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
	    		return $orderCustomerEmail = $order->getCustomerEmail();
	    	}
	    	
		} else {
			$address = false;

		}


    	// $magentoTel = $customer->getAttribute('billing_telephone');
    	
    	/* strings are not comparable yet, need to standardize them.

    	$magentoTel = '07917138230';
		$mobile = '+447917138230';

    	*/

		
    }
    // var_dump($customers);
	return false;
}



?>