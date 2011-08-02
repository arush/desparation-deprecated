<?php
/**
 * Socialize config model
 *
 * @category   
 * @package    
 * @author     
 */
class Gigya_Socialize_Model_Config
{
	
	const XML_PATH_API_KEY = 'socialize_sec/socialize_general_group/api_key';
	const XML_PATH_SECRET_KEY = 'socialize_sec/socialize_general_group/secret_key';

	//COMMENTS
//	const XML_PATH_COMMENTS_PRODUCT_COMMENTS_CATEGORYID = 'socialize_sec/socialize_comments_group/product_comments_categoryid';
//	const XML_PATH_COMMENTS_PRODUCT_COMMENTS_ADVANCED_SETTINGS = 'socialize_sec/socialize_comments_group/product_comments_advanced';
	
    public function isEnabled($storeId=null)
    {
        if(!$this->getApiKey($storeId) || !$this->getSecret($storeId)) {
        	return false;
        }
        
        return true;
    }

    public function getSetting($keyName='',$groupName='general',$storeId=null) {
    	$xmlPath='socialize_sec/socialize_' . $groupName . '_group/' . $keyName;
    	$value=trim(Mage::getStoreConfig($xmlPath, $storeId));
    	//echo "<br/>Config::getSetting for $xmlPath=" . $value;
    	return $value;
    }
    
    public function getApiKey($storeId=null)
    {
    	return $this->getSetting('api_key','general',$storeId);
    }
    public function getSecretKey($storeId=null)
    {
    	return $this->getSetting('secret_key','general',$storeId);
    }
    
    // COMMENTS
    public function getCommentsProductCommentsCategoryID($storeId=null) {
    	return trim($this->getSetting('categoryID','product_comments'));
    	//return trim(Mage::getStoreConfig(self::XML_PATH_COMMENTS_PRODUCT_COMMENTS_CATEGORYID, $storeId));
    }
    
    public function getProductCommentsAdvancedSettings($storeId=null) {
    	return trim($this->getSetting('advanced','product_comments'));
    	return trim(Mage::getStoreConfig(self::XML_PATH_COMMENTS_PRODUCT_COMMENTS_ADVANCED_SETTINGS, $storeId));
    }
    
        
}
