<?php
/**
 * Data helper
 *
 * @category   
 * @package    
 * @author     
 * @copyright  
 * @license    
 */


class Gigya_Socialize_Helper_Data extends Mage_Core_Helper_Abstract
{
    /**
     * Query param name for last url visited
     */	
	const REFERER_QUERY_PARAM_NAME = 'referer';
	
	public function getLoginUrl() {
		return $this->_getUrl('customer/account/login');
	}
	
	public function getLogoutUrl() {
		return $this->_getUrl('customer/account/logout');
	}
	
	public function getRegisterUrl() {
		return Mage::helper('customer')->getRegisterUrl();
	} 

    public function getLoginPostUrl()
    {
        $params = array();
        if ($this->_getRequest()->getParam(self::REFERER_QUERY_PARAM_NAME)) {
            $params = array(self::REFERER_QUERY_PARAM_NAME => $this->_getRequest()->getParam(self::REFERER_QUERY_PARAM_NAME));
        }
        return $this->_getUrl('customer/account/loginPost', $params);
    }
	
    public function getWikiPageUrl() {
    	return 'http://wiki.gigya.com/050_CMS_Modules/050_Magento';
    }
    
    /**
     * Retrieve customer login POST URL
     *
     * @return string
     */
    public function getLinkingPostUrl()
    {
        $params = array();
        if ($this->_getRequest()->getParam(self::REFERER_QUERY_PARAM_NAME)) {
            $params = array(self::REFERER_QUERY_PARAM_NAME => $this->_getRequest()->getParam(self::REFERER_QUERY_PARAM_NAME));
        }
        return $this->_getUrl('customer/account/linkingPost', $params);
    }
    
	public function isSocializeCustomer($customer)
	{
		if($customer->getGigyaUID()) {
			return true;
		}
		return false;
	}
	
	public function getConfig(){
		return Mage::getSingleton('socialize/config');
	}
	
	public function encodeURIComponent($str) {
	    $revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')');
	    return strtr(rawurlencode($str), $revert);
	}
	
	public function getCurrentUrl() // replaces the one from core/url because of some bugs it has.
    {
        $request = Mage::app()->getRequest();
        
        $uri=$request->getServer('REQUEST_URI');

        // make sure that if a // exists in the URL it is only after a / (which makes it part of the data of the uri and not a prefix for the host
        // as the case would be if this is a request targeted to a proxy where REQUST_URI would be an absolue URI

        $doubleSlashPos=strpos($uri,'//');
        if (($doubleSlashPos !== false) && ($doubleSlashPos<=strpos($uri,'/'))) {
        	$url=$uri; 
        }
        else {
	        $url = $request->getScheme() . ':';
	        if ($request->getServer('SERVER_PORT') != '80') { // this is also not taken into account in core/url see my bug report here: http://www.magentocommerce.com/bug-tracking/issue?issue=10762
	        	$url .= $request->getServer('SERVER_PORT'); 
	        }
	        $url .= '//' . $request->getHttpHost();
        	$url .= $uri;
        }
        
        return $url;
//        return $this->_getUrl('*/*/*', array('_current' => true, '_use_rewrite' => true));
    }

	public function toJSStringLiteral($str){
		return str_replace('\\/', '/', json_encode($str));
	}
	
	public function isEnabledAndConfigured() {
		$config=Mage::helper('socialize')->getConfig();
		$enabled=$config->getSetting('enabled','general');
		if (!$enabled) return false;
		if (is_null($apiKey=$config->getApiKey())) return false;
		if (is_null($secretKey=$config->getSecretKey())) return false;
		if (strlen(trim($apiKey)) < 1) return false;
		if (strlen(trim($secretKey)) < 1) return false;
		return true;
	}
	
	/*
	  	list($microseconds2,$seconds2) = explode(' ',microtime());
        $id2 = $seconds2.' '.$microseconds2.' '.getmypid();
        echo 'BOOM getFormData' . ' ' . $id2;

	*/
	 
}