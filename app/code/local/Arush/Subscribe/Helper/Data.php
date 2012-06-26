<?php

class Arush_Subscribe_Helper_Data extends Mage_Core_Helper_Abstract {

	/* returns $api object */
	public function doSubscribe($male, $fname, $email, $gender, $source) {

		// get standard values for mailchimp api call
		$storeId = Mage::app()->getStore()->getId();			
		$listId = Mage::helper('monkey')->getDefaultList($storeId);
		$time = strtotime("now");
		$ip = $_SERVER['REMOTE_ADDR'];

		// if this has come from a form
		if($male == false) {
			
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
							'MALE' => 'in progress',
							'FNAME' => $fname,
							'GENDER' => $gender,
							'SOURCE' => $source,
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