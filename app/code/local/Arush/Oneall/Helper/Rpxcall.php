<?php

class Arush_Oneall_Helper_Rpxcall extends Mage_Core_Helper_Abstract {

	public function getOneallApiKey() {
		return Mage::getStoreConfig('oneall/options/apikey');
	}
	
	public function getOneallApiDomain() {
		$prefix = 'https://';
		$domain = Mage::getStoreConfig('oneall/options/apidomain');
		$suffix = '.api.oneall.com/';
		
		$apidomain = $prefix.$domain.$suffix;
		
		return $apidomain;
	}
	
	public function getOneallPrivateKey() {
		return Mage::getStoreConfig('oneall/options/privatekey');
	}
	
	public function getOneallPublicKey() {
		return Mage::getStoreConfig('oneall/options/publickey');
	}
	

	public function rpxLookupSave() {
		/*
try {
			$lookup_rp = $this->rpxLookupRpCall();

			Mage::getModel('core/config')
				->saveConfig('oneall/vars/realm', $lookup_rp->realm)
				->saveConfig('oneall/vars/realmscheme', $lookup_rp->realmScheme)
				->saveConfig('oneall/vars/appid', $lookup_rp->appId)
				->saveConfig('oneall/vars/adminurl', $lookup_rp->adminUrl)
				->saveConfig('oneall/vars/socialpub', $lookup_rp->socialPub)
				->saveConfig('oneall/vars/enabled_providers', $lookup_rp->signinProviders)
				->saveConfig('oneall/vars/apikey', Mage::getStoreConfig('oneall/options/apikey'));
			Mage::getConfig()->reinit();

			return true;

		} catch (Exception $e) {
			Mage::getSingleton('adminhtml/session')->addWarning('Could not retrieve account info. Please try again');
		}
		
*/
		return false;
	}

	/* replace this with Oneall api custom built call */
   /*
 public function rpxLookupRpCall() {
        $version = Mage::getConfig()->getModuleConfig("Arush_Oneall")->version;

        $postParams = array();
        $postParams["apiKey"] = $this->getOneallApiDomain();
        $postParams["pluginName"] = "magento";
        $postParams["pluginVersion"] = $version;

        $result = "rpxLookupRpCall: no result";
        try {
            $result = $this->rpxPost("lookup_rp", $postParams);
        }
        catch (Exception $e) {
            throw Mage::exception('Mage_Core', $e);
        }

        return $result;

    }
*/
    public function rpxAuthInfoCall($token) {

        $postParams = array();

        $postParams["oa_social_login_token"] = $token;
        // $postParams["apiKey"] = $this->getOneallApiKey();
		$postParams["apidomain"] = $this->getOneallApiDomain();
		$postParams["username"] = $this->getOneallPrivateKey();
		$postParams["password"] = $this->getOneallPublicKey();

        $result = "rpxAuthInfoCall: no result";
        try {
            $result = $this->rpxPost("auth_info", $postParams);
        }
        catch (Exception $e) {
            throw Mage::exception('Mage_Core', $e);
        }

        return $result;

    }



    public function rpxActivityCall($identifier, $activity_message, $url) {

        $postParams = array();
		$activity = new stdClass();

		$activity->action = $activity_message;
		$activity->url = $url;

		$activity_json = json_encode($activity);

        $postParams["activity"] = $activity_json;
        $postParams["identifier"] = $identifier;
        $postParams["apiKey"] = $this->getOneallApiKey();

        $result = "rpxActivityCall: no result";
        try {
            $result = $this->rpxPost("activity", $postParams);
        }
        catch (Exception $e) {
            throw Mage::exception('Mage_Core', $e);
        }

        return $result;

    }


    private function rpxPost($method, $postParams) {

        /* only use this if Oneall support account activity and lookups in addition to auth 
        
        $rpxbase = "https://rpxnow.com";

        if ($method == "auth_info") {
            $method_fragment = "api/v2/auth_info";
        }
        elseif ($method == "activity") {
            $method_fragment = "api/v2/activity";
        }
        elseif ($method == "lookup_rp") {
            $method_fragment = "plugin/lookup_rp";
        }
        else {
            throw Mage::exception('Mage_Core', "method [$method] not understood");
        }
		
		$url = "$rpxbase/$method_fragment";
		*/
		$url = $postParams["apidomain"];
		$method = 'POST';
        $postParams["format"] = 'json';

        return $this->rpxCall($url, $method, $postParams);
		
    }

    private function rpxCall($url, $method='GET', $postParams=null) {

        $result = "rpxCallUrl: no result yet";

        try {
			
			
            /* VARIEN METHOD
            
            $http = new Varien_Http_Client($url);
            $http->setHeaders( array( "Accept-encoding" => "identity"  ) );
            
            // $http->setAuth($OAusername, $OApassword, 'basic');
            
			if($method=='POST')
				$http->setParameterPost($postParams);
            $response = $http->request($method);
			*/
			
			$OAdomain = $this->getOneallApiDomain();
			$OAusername = $this->getOneallPublicKey();
			$OApassword = $this->getOneallPrivateKey();
			
			$curl = curl_init();
		        
		    curl_setopt($curl, CURLOPT_URL, $OAdomain.'user/social_login/lookup.json?token='.$postParams["oa_social_login_token"]);
		    curl_setopt($curl, CURLOPT_HEADER, 0);
 			curl_setopt($curl, CURLOPT_USERPWD, $OAusername . ":" . $OApassword);
		    curl_setopt($curl, CURLOPT_TIMEOUT, 5);
		    curl_setopt($curl, CURLOPT_VERBOSE, 0);
		    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 1);
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
				
				// continue varien flow
	            // $body = $response->getBody();
	
	            try {
	               // $result = json_decode($body);
	               $result = json_decode($json);  //moved here from above
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
	            // end varien flow
            
            }

        }
        catch (Exception $e) {
            throw Mage::exception('Mage_Core', $e);
        }

    }

	public function rpxLinkCall($connectionToken) {
	
		$oa_subdomain = Mage::getStoreConfig('oneall/options/apidomain');
		$oa_application_public_key = $this->getOneallPublicKey();
		$oa_application_private_key = $this->getOneallPrivateKey();
		
		$oa_application_domain = $oa_subdomain.'.api.oneall.com';	
	
		$token = $connectionToken;
		$url = 'https://'.$oa_application_domain.'/connection/'.$token .'.json';
	
	
	
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, 'https://'.$oa_application_domain.'/connection/'.$token .'.json');
	
		curl_setopt($curl, CURLOPT_HEADER, 0);
		curl_setopt($curl, CURLOPT_USERPWD, $oa_application_public_key . ":" . $oa_application_private_key);
		curl_setopt($curl, CURLOPT_TIMEOUT, 5);
		curl_setopt($curl, CURLOPT_VERBOSE, 0);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 1);
		curl_setopt($curl, CURLOPT_FAILONERROR, 0);
	
		//Error
		if ( ($json = curl_exec($curl)) === false)
		{
			echo 'Curl error: ' . curl_error($curl);
		}
		//Success
		else
		{
			//Close connection
			curl_close($curl);
			print_r(json_decode($json));
		}
		
	}




	public function getFirstName($auth_info) {
		if (isset($auth_info->user->identity->name->givenName))
			return $auth_info->user->identity->name->givenName;
        
        if (!isset($auth_info->user->identity->name->formatted))
            return '';

		$name = str_replace(",", "", $auth_info->user->identity->name->formatted);

        if (!$name)
            return '';
        
        $split = explode(" ", $name);

		$fName = isset($split[0]) ? $split[0] : '';
		return $fName;
	}

	public function getLastName($auth_info) {
		if (isset($auth_info->user->identity->name->familyName))
			return $auth_info->user->identity->name->familyName;
        
        if (!isset($auth_info->user->identity->name->formatted))
            return '';

		$name = str_replace(",", "", $auth_info->user->identity->name->formatted);
        
        if (!$name)
            return '';
        
		$split = explode(" ", $name);
		$key = sizeof($split) - 1;

		$lName = isset($split[$key]) ? $split[$key] : '';
		return $lName;
	}

}
?>