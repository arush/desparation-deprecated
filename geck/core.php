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


/*
*
* Only use this if you have ebizmarts MageMonkey installed
*
**/
function getTotalSignups() {
	$storeId = Mage::app()->getStore()->getId();			
	$listId = Mage::helper('monkey')->getDefaultList($storeId);

	// call ebizmarts api
		$api = Mage::getSingleton('monkey/api');
		
		$conditions = array();
		$conditions[] = array('field'=>'status', 'op'=>'ne', 'value'=>'invited'); // take out old evogue contacts
		$opts = array('match'=>'all', 'conditions'=>$conditions);
		 
		$retval = $api->campaignSegmentTest($listId, $opts);


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

/*
*
* Only use this if you have ebizmarts MageMonkey installed
*
**/
function getMaleSegments($maleNeedle) {
	$storeId = Mage::app()->getStore()->getId();			
	$listId = Mage::helper('monkey')->getDefaultList($storeId);

	// call ebizmarts api
		$api = Mage::getSingleton('monkey/api');
		
		$conditions = array();
		$conditions[] = array('field'=>'male', 'op'=>'like', 'value'=>$maleNeedle);
		$conditions[] = array('field'=>'status', 'op'=>'ne', 'value'=>'invited'); // take out old evogue contacts
		$opts = array('match'=>'all', 'conditions'=>$conditions);
		 
		$retval = $api->campaignSegmentTest($listId, $opts);


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