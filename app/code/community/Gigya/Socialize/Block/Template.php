<?php
class Gigya_Socialize_Block_Template extends Mage_Core_Block_Template
{
	
	public function isSecure()
	{
		return Mage::app()->getStore()->isCurrentlySecure();
	}
	
	public function getApiKey()
	{
		return Mage::getSingleton('socialize/config')->getApiKey();
	}
	
    public function getSecretKey($storeId=null)
    {
    	return Mage::getSingleton('socialize/config')->getSecretKey();
    }
    	
	public function getConnectUrl()
	{
		return $this->getUrl('socialize/customer_account/connect');
	}
	
	public function getRequiredPermissions()
	{
		return json_encode('email');
	}

    protected function _toHtml()
    {
        $value=Mage::helper('socialize')->isEnabledAndConfigured();
        if (!$value) return '';
        return parent::_toHtml();
    }
}