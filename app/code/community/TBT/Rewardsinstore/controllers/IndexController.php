<?php

class TBT_Rewardsinstore_IndexController extends Mage_Core_Controller_Front_Action
{
    public function indexAction()
    {
        if (Mage::getConfig()->getModuleConfig('TBT_Rewards')->is('active', 'false')) {
            throw new Exception(Mage::helper('rewardsinstore')->__("Sweet Tooth must be installed in order to use Sweet Tooth Instore"));
        }
        
        $this->loadLayout();
        $this->renderLayout();
    }
    
    public function loginAction()
    {
        $this->loadLayout();
        $this->renderLayout(); 
    }
    
    public function debuglogAction()
    {
        $data = $this->getRequest()->has('data') ? $this->getRequest()->get('data') : "test log";
        Mage::helper('rewardsinstore')->log($data);
        return $this;
    }
}

?>