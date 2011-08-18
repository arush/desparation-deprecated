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

		if(isset($auth_info->user->identity->preferredUsername)) //twitter
			$profile_name = $auth_info->user->identity->preferredUsername;

		else if(isset($auth_info->user->identity->emails->other))
			$profile_name = $auth_info->user->identity->emails[0]->value;
		
		else if(isset($auth_info->user->identity->displayName))
			$profile_name = $auth_info->user->identity->displayName;
		
		else if(isset($auth_info->profile->name->formatted))
			$profile_name = $auth_info->user->identity->name->formatted;
		
		else
			$profile_name = $auth_info->user->identity->provider;

		return array('provider' => $auth_info->user->identity->provider,
					'identifier' => $this->getSocialId($auth_info),
					'profile_name' => $profile_name,
					'oneall_uuid' => $auth_info->user->uuid);
	}
	
	public function getSocialId($returnObject) {
	    return $returnObject->user->identity->accounts[0]->userid;
	}


}