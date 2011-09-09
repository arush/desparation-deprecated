<?php

class Arush_Oneall_Helper_Data extends Mage_Core_Helper_Abstract {

	private $providers = array(
		'facebook'		=> 'facebook',
		'google'		=> 'google',
		'LinkedIn'		=> 'linkedin',
		'MySpace'		=> 'myspace',
		'twitter'		=> 'twitter',
		'Windows Live'	=> 'live_id',
		'Yahoo!'		=> 'yahoo',
		'AOL'			=> 'aol',
		'Blogger'		=> 'blogger',
		'Flickr'		=> 'flickr',
		'Hyves'			=> 'hyves',
		'Livejournal'	=> 'livejournal',
		'MyOpenID'		=> 'myopenid',
		'Netlog'		=> 'netlog',
		'OpenID'		=> 'openid',
		'Verisign'		=> 'verisign',
		'Wordpress'		=> 'wordpress',
		'PayPal'		=> 'paypal'
	);

	/**
	 * Returns whether the Enabled config variable is set to true
	 *
	 * @return bool
	 */
	public function isOneallEnabled() {
		if(Mage::getStoreConfig('oneall/options/enable')=='1' && strlen(Mage::getStoreConfig('oneall/options/apikey')) > 1)
			return true;

		return false;
	}

	/**
	 * Returns random alphanumber string
	 *
	 * @param int $length
	 * @param string $chars
	 * @return string
	 */
	public function rand_str($length = 32, $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890') {
		$chars_length = (strlen($chars) - 1);

		$string = $chars{rand(0, $chars_length)};

		for ($i = 1; $i < $length; $i = strlen($string)) {
			$r = $chars{rand(0, $chars_length)};

			if ($r != $string{$i - 1})
				$string .= $r;
		}

		return $string;
	}

	/**
	 * Returns the url of skin directory containing scripts and styles
	 *
	 * @return string
	 */
	public function _baseSkin() {
		return Mage::getBaseUrl('skin') . "frontend/arush";
	}

	/**
	 * Returns the full Auth URL for the Oneall Sign In Widget
	 *
	 * @return string
	 */
	public function getRpxAuthUrl($add=false) {
		$action = $add ? 'oneall/rpx/token_url_add' : 'oneall/rpx/token_url';
		$rpx_callback = urlencode(Mage::getUrl($action));
		$link = (Mage::getStoreConfig('oneall/vars/realmscheme') == 'https') ? 'https' : 'http';
		$link.= '://' . Mage::getStoreConfig('oneall/vars/realm');
		$link.= '/openid/v2/signin?token_url=' . $rpx_callback;

		return $link;
	}

	/** - not sure what this is needed for
	 * Returns an unserialized array of available providers
	 * or Null if empty (Invalid or missing API Key)
	 *
	 * @return string
	 */
	public function getRpxProviders() {
		$providers = Mage::getStoreConfig('oneall/vars/enabled_providers');
		if($providers)
			return explode(",", $providers);
		else
			return false;
	}

	public function buildProfile($auth_info) {
		$profile_name = false;

		/*
if(isset($auth_info->user->identity->preferredUsername)) //twitter
			$profile_name = $auth_info->user->identity->preferredUsername;

		else if(isset($auth_info->user->identity->emails->other))
			$profile_name = $auth_info->user->identity->emails[0]->value;
		
		else if(isset($auth_info->user->identity->displayName))
			$profile_name = $auth_info->user->identity->displayName;
		
		else if(isset($auth_info->profile->name->formatted))
			$profile_name = $auth_info->user->identity->name->formatted;
		
		else
*/
			$profile_name = $auth_info->user->identity->provider;

		return array('provider' => $auth_info->user->identity->provider,
					'identifier' => $this->getSocialId($auth_info),
					'profile_name' => $profile_name,
					'oneall_uuid' => $auth_info->user->uuid);
	}
	
	public function getSocialId($returnObject) {
	    return $returnObject->user->identity->accounts[0]->userid;
	}
	
	public function getUuid() {

		$key = $this->getRequest()->getParam('ses');
		$token = Mage::getSingleton('oneall/session')->getData($key);
		$auth_info = Mage::helper('oneall/rpxcall')->rpxAuthInfo($token);
	
		if($auth_info) {
			return $auth_info->user->uuid;
			}
		else {
			return 'rubbish';
			}
	}

	public function getThumbnail($connectionToken) {
		$result = "rpxCallUrl: no result yet";

        try {
			
			
			$OAdomain = $this->getOneallApiDomain();
			$OAusername = $this->getOneallPublicKey();
			$OApassword = $this->getOneallPrivateKey();
			
			$curl = curl_init();
		        
		    curl_setopt($curl, CURLOPT_URL, $OAdomain.'connections/'.$connectionToken.'.json');
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
	            try {
	               // $result = json_decode($body);
	               $result = json_decode($json);  //moved here from above
	            }
	            catch (Exception $e) {
	                throw Mage::exception('Mage_Core', $e);
	            }
	
	            if ($result) {
	            	//magic happens here
	                return $result->response->result->data->user->identity->thumbnailUrl;
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

}