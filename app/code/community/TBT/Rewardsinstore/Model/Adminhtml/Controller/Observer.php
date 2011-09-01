<?php
class TBT_Rewardsinstore_Model_Adminhtml_Controller_Observer
{
    public function __construct() { }
    
    public function actionPredispatch($observer)
    {
        if (!Mage::getSingleton('admin/session')->isLoggedIn()) {
            Mage::getSingleton('admin/session')->getCookie()->delete('rewardsinstore-key');
        }
        
        return $this;
    }
}
