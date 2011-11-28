<?php 
class Arush_Facebook_Helper_Data extends Mage_Core_Helper_Abstract{

	public function parsePageSignedRequest() {
	    if (isset($_REQUEST['signed_request'])) {
	      $encoded_sig = null;
	      $payload = null;
	      list($encoded_sig, $payload) = explode('.', $_REQUEST['signed_request'], 2);
	      $sig = base64_decode(strtr($encoded_sig, '-_', '+/'));
	      $data = json_decode(base64_decode(strtr($payload, '-_', '+/'), true));
	      return $data;
	    }
	    return false;
	  }

}  
?>