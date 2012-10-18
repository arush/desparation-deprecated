<?php 
class Arush_Get_Helper_Data extends Mage_Core_Helper_Abstract{
	

	public function retrievePunterFromEmail($email) {

		// get standard values for mailchimp api call
		$storeId = Mage::app()->getStore()->getId();			
		$listId = Mage::helper('monkey')->getDefaultList($storeId);

		$emailarray = array($email);


		// call ebizmarts api
		$api = Mage::getSingleton('monkey/api');
		$retval = $api->listMemberInfo($listId, $emailarray);

		if ($api->errorCode){
			// if person is not on the list... this should never happen, just a fallback.
// Mage::log('Tried to list member info and got this error: ', null, 'male.log');
Mage::log($api,null, 'male.log');

			$returnThis = json_encode(
				array(
					'status' => $api->errorCode,
					'state' => "failed",
					'message' => "Sorry, something went wrong... I've logged this and am working on a solution. "
					)
			);
			
			return $returnThis;

		} else {
			// person is on the list, check their MALE cookie
// Mage::log('person is on the list, check their status and update accordingly: ', null, 'male.log');
// Mage::log($retval,null, 'male.log');
			$maleAnswers = $retval['data'][0]['merges']['MALE'];
			$firstname = $retval['data'][0]['merges']['FNAME'];
			
			if($maleAnswers !== "" && $maleAnswers !== "\"started\"") {
				$returnThis['maleAnswers'] = json_decode($maleAnswers);
			} else {
				$returnThis['maleAnswers'] = "";
			}
			$returnThis['fname'] = $firstname;

			return $returnThis;
		}


	}


} 


 
?>