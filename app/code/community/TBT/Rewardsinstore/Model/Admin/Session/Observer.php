<?php
class TBT_Rewardsinstore_Model_Admin_Session_Observer
{
    public function __construct() { }
    
    public function userLogin($observer)
    {
        Mage::getSingleton('admin/session')->getCookie()->set(
        	'rewardsinstore-key',
            Mage::getModel('adminhtml/url')->getSecretKey("webapp_ajax", "main")
            //,set period here so it automatically dies
        );
        
        return $this;
    }
}
