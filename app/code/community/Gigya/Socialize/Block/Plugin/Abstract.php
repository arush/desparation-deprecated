<?php

/**
 * Plugin block
 *
 * @category   Mage
 * @package    Gigya_Socialize
 * @author     
 */
abstract class Gigya_Socialize_Block_Plugin_Abstract extends Gigya_Socialize_Block_Template //extends Mage_Core_Block_Template
{

	//shuld return an id string (no spaces etc.)
	abstract public function getPluginName();
	abstract public function getPluginDisplayName();
	abstract public function getConfigGroupName();

	//Override this in actual plugin
	public function getDefaultPluginParams() {
		return array();
	}
		
    public function getSetting($keyName='', $groupName=null, $storeId=null) {
    	if (null===$groupName) {
    		$groupName=$this->getConfigGroupName();
    	}
    	$value=Mage::helper('socialize')->getConfig()->getSetting($keyName,$groupName,$storeId);
    	return $value;
    }

    public function getGeneralSetting($keyName='', $storeId=null) {
    	$value=$this->getSetting($keyName,'general',$storeId);
    	return $value;
    }
	
    public function isEnabled($storeId=null) {
    	$pluginEnabled = $this->getSetting('enabled',$storeId);
    	$generalEnabled = $this->getGeneralSetting('enabled',$storeId);
    	return  ($pluginEnabled && $generalEnabled);
    }

    public function isConfigured() {
    	return true;
    }
    
    /**
     * Retrieve username for form field
     *
     * @return string
     */
    public function getCategoryId()
    {
    	return Mage::helper('socialize')->getConfig()->getCommentsProductCommentsCategoryId();
    }
    public function getAdvancedSettings()
    {
    	return $this->getSetting('advanced');
    }
    
    public function getStreamId() {
    	return $this->getProductId();
    }
       
    public function getAdvancedSettingsScript($baseSettingsVariable) {
    	$settingsObjectJson=$this->getAdvancedSettings();
    	
    	if ($settingsObjectJson==null) return '';

    	$advancedSettingsVariable=$baseSettingsVariable.'_advanced';
    	$settingsObjectJson=trim($settingsObjectJson);
    	
    	if (strlen($settingsObjectJson)>2 && $settingsObjectJson[0] == '{' && $settingsObjectJson[strlen($settingsObjectJson)-1] == '}' ) {
    		$script.=<<<EOT
    		
	var $advancedSettingsVariable=$settingsObjectJson;
	for (var attr in $advancedSettingsVariable) {
		if ($advancedSettingsVariable.hasOwnProperty(attr)) {
    		{$baseSettingsVariable}[attr]={$advancedSettingsVariable}[attr];
		}
	}
EOT;
    		
    	}
    	else {
    		$script.='/* advanced settings are not a json object */';
    	}
    	
    	return $script;
    }
    
    // this means that socialize block will not render anything regardless of their template when they are disabled.
    protected function _toHtml() {
        if (!$this->isEnabled()) return '<!-- gigya socialize ' . $this->getPluginDisplayName() . ' is disbaled -->' ;
        return parent::_toHtml();
    }
}
