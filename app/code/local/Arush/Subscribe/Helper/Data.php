<?php

class Arush_Subscribe_Helper_Data extends Mage_Core_Helper_Abstract {

	/* returns $api object */
	
	public function applyJob($email) {
		// get standard values for mailchimp api call
		$storeId = Mage::app()->getStore()->getId();			
		$listId = Mage::helper('monkey')->getDefaultList($storeId);
		

		$time = strtotime("now");

		if (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] !== '127.0.0.1') {
			$ip = $_SERVER['REMOTE_ADDR'];
		}
		else if(isset($_SERVER['VIA']) && $_SERVER['VIA'] !== '127.0.0.1') {
			$ip = $_SERVER['VIA'];
		}
		else if(isset($_SERVER['X-FORWARDED-FOR']) && $_SERVER['X-FORWARDED-FOR'] !== '127.0.0.1') {
			$ip = $_SERVER['X-FORWARDED-FOR'];
		}
		else {
			$ip = $_SERVER['REMOTE_ADDR'];
		}


		// put variables in an array
		$mergeVars = array(
						'OPTIN_IP' => $ip,
						'OPTIN_TIME' => $time
						);

		// call ebizmarts api
		$api = Mage::getSingleton('monkey/api');
		$retval = $api->listSubscribe(
							$listId,
							$email,
							$mergeVars,
							'html' /* email type */,
							true /* double opt-in */,
							false /* update existing */,
							true /* replace interests */ ,
							true /* send welcome */);
		return $api;

	}

	public function doSubscribe($isMale, $fname, $email, $gender, $source, $male) {

		// get standard values for mailchimp api call
		$storeId = Mage::app()->getStore()->getId();			
		$listId = Mage::helper('monkey')->getDefaultList($storeId);
		$time = strtotime("now");
		$ip = $_SERVER['REMOTE_ADDR'];

		// if this has come from a form
		if($isMale === false) {
			
			// put variables in an array
			$mergeVars = array(
							'STATUS' => 'interested',
							'FNAME' => $fname,
							'GENDER' => $gender,
							'SOURCE' => $source,
							'OPTIN_IP' => $ip,
							'OPTIN_TIME' => $time
							);

		}
		else {
			// this has come from male

			// put variables in an array
			$mergeVars = array(
							'STATUS' => 'interested',
							'FNAME' => $fname,
							'GENDER' => $gender,
							'SOURCE' => $source,
							'MALE' => $male,
							'OPTIN_IP' => $ip,
							'OPTIN_TIME' => $time
							);
		}

		// call ebizmarts api
		$api = Mage::getSingleton('monkey/api');
		$retval = $api->listSubscribe(
							$listId,
							$email,
							$mergeVars,
							'html' /* email type */,
							true /* double opt-in */,
							false /* update existing */,
							true /* replace interests */ ,
							true /* send welcome */);
		return $api;

	}

}
?>