<?php

header('Content-Type: text/plain');

ini_set('display_errors',true);
include('../app/Mage.php');
Mage::setIsDeveloperMode(true);

Mage::app(); //pass in store code if you like
date_default_timezone_set('Europe/London'); // add your locale - thanks to @benmarks from BlueAcorn for this


function getSoldCount($orders) {

	$count = 0;
	$number = count($orders);
	return $number;
}

function getOrders($from,$to) {
	$orders = Mage::getSingleton('sales/order')->getCollection()
		->addAttributeToSelect('*')
		->addFieldToFilter('created_at', array('from'=>$from, 'to'=>$to))
		// ->addFieldToFilter('status', 'complete')
	 	->addFieldToFilter('status', array('in' => array('complete','processing')));
	return $orders;
}

function countAtProcessing($from,$to) {

	$orders = Mage::getSingleton('sales/order')->getCollection()
		->addAttributeToSelect('*')
		->addFieldToFilter('created_at', array('from'=>$from, 'to'=>$to))
		->addFieldToFilter('status', 'processing');
	 	// ->addFieldToFilter('status', array('in' => array('complete','processing')));

	$num = count($orders);
	return $num;
}

function countAtComplete($from,$to) {

	$orders = Mage::getSingleton('sales/order')->getCollection()
		->addAttributeToSelect('*')
		->addFieldToFilter('created_at', array('from'=>$from, 'to'=>$to))
		->addFieldToFilter('status', 'complete');
	 	// ->addFieldToFilter('status', array('in' => array('complete','processing')));

	$num = count($orders);
	return $num;
}

function countAtClosed($from,$to) {

	$orders = Mage::getSingleton('sales/order')->getCollection()
		->addAttributeToSelect('*')
		->addFieldToFilter('created_at', array('from'=>$from, 'to'=>$to))
		->addFieldToFilter('status', 'closed');
	 	// ->addFieldToFilter('status', array('in' => array('complete','processing')));

	$num = count($orders);
	return $num;
}



//excludes shipping amount
function getSoldValue($orders) {
	$totalSales = 0;
	foreach($orders as $order) {
		$totalSales = $totalSales + $order->getGrandTotal() - $order->getShippingAmount();
	}
	return $totalSales;
}

function getAllMembers() {
	$storeId = Mage::app()->getStore()->getId();			
	$listId = Mage::helper('monkey')->getDefaultList($storeId);


	// call ebizmarts api

		$api = Mage::getSingleton('monkey/api');
		$retval = $api->listMembers($listId, 'subscribed', null, 0, 5000 );


		if ($api->errorCode){
			$segment["status"] = 0;
			$segment["errorCode"] = "\n\tCode=".$api->errorCode;
			$segment["errorMessage"] = "\n\tMsg=".$api->errorMessage."\n";

		} else {
			$segment["status"] = 1;
			$segment["number"] = $retval['total'];
			$segment["numberReturned"] = sizeof($retval['data']);
			$segment["data"] = $retval['data'];
		}

	return $segment;
}

function getMaleSegments($emailArray) {
	$storeId = Mage::app()->getStore()->getId();			
	$listId = Mage::helper('monkey')->getDefaultList($storeId);

	// call ebizmarts api
		$api = Mage::getSingleton('monkey/api');
		$retval = $api->listMemberInfo($listId, $emailArray);

		if ($api->errorCode){

			print_r(json_encode(
				array(
					'status' => $api->errorCode,
					'state' => "failed",
					'message' => $api->errorMessage
					)
			));
			return false;

		} else {
			return $retval;
// 			
		}
}


?>