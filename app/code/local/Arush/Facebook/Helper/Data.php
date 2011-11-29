<?php 
class Arush_Facebook_Helper_Data extends Mage_Core_Helper_Abstract{

	public function getFbPageId() {
		$id = Mage::getStoreConfig('facebook/options/fbpageid');
		
		return $id;
	}
	
	
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

	public function fbApiIsFan($auth_token, $user_id) {
		$apiUrl = 'https://graph.facebook.com/' . $user_id . '/likes?access_token=' . $auth_token;
		
		$result = "rpxCallUrl: no result yet";

        try {
			
			
			/*
$OAdomain = $this->getOneallApiDomain();
			$OAusername = $this->getOneallPublicKey();
			$OApassword = $this->getOneallPrivateKey();
			
*/
			$curl = curl_init();
		        
		    curl_setopt($curl, CURLOPT_URL, $apiUrl);
		    curl_setopt($curl, CURLOPT_HEADER, 0);
/*  			curl_setopt($curl, CURLOPT_USERPWD, $OAusername . ":" . $OApassword); */
		    curl_setopt($curl, CURLOPT_TIMEOUT, 5);
		    curl_setopt($curl, CURLOPT_VERBOSE, 0);
		    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
		    curl_setopt($curl, CURLOPT_FAILONERROR, 0);
		 
		 	$json = curl_exec($curl);
		 	$info = curl_getinfo($curl);  
  
			$infoverbose = 'Took ' . $info['total_time'] . ' seconds for url ' . $info['url'] . ' with code ' . $info['http_code'];
		    
		    //Error
		    if ($json === false)
		    {
		        echo 'Curl error: ' . curl_error($curl);
		    }
		    //Success
		    else
		    {
		        //Close connection
		        curl_close($curl);		
	
	            try {
	               // if you're debugging, this is where you can see the json string
	               // print_r($json);
	               $result = json_decode($json);  
	            }
	            catch (Exception $e) {
	                throw Mage::exception('Mage_Core', $e);
	            }
	
	            if ($result) {
	                return $result;
	            }
	            else {
	                throw Mage::exception('Mage_Core', $infoverbose);
	            }
            
            }

        }
        catch (Exception $e) {
            throw Mage::exception('Mage_Core', $e);
        }

	
	}

	public function isFan() {
		$isFan = false;
		if($signed_request = $this->parsePageSignedRequest()) {
		    $auth_token = $signed_request->oauth_token;
		    $user_id = $signed_request->user_id;
		    
		    if($auth_token) {
			
			
				$userLikes = $this->fbApiIsFan($auth_token, $user_id);
				$numLikes = count($userLikes->data);
				// echo $numLikes;				
				$i = 0;
				$fbPageId = $this->getFbPageId();
				
				
				while($isFan == false && $i < $numLikes) {
					if($userLikes->data[$i]->id == $fbPageId) {
						$isFan = true;
						return $isFan;
					}
					$i++;
				}
				
				
			} else {
						echo "Please click on the Like button to view this tab!";
					}
				}
				
			else {print_r($signed_request);}
	}

} 


 
?>