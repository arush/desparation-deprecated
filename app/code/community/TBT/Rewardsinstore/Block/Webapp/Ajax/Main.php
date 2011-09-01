<?php
//Mage_Adminhtml_Block_Template
//Mage_Core_Block_Template
class TBT_Rewardsinstore_Block_Webapp_Ajax_Main extends Mage_Adminhtml_Block_Template
{
    protected $_storefrontId = null;
    protected $_storefronts = null;
    
    public function __construct()
    {
        parent::__construct();
        
        $this->_controller = 'webapp_ajax';
        $this->_blockGroup = 'rewardsinstore';
        $this->_headerText = Mage::helper('rewardsinstore')->__('Sweet Tooth Instore');
        $this->setTemplate("");
        $this->setUseAjax(true);
    }
    
    protected function getStorefrontCollection()
    {
        if (!$this->_storefronts) {
            $this->_storefronts = Mage::getModel('rewardsinstore/storefront')->getCollection();
        }
        
        return $this->_storefronts;
    }
    
    protected function getUserFullName()
    {
        return Mage::getSingleton('admin/session')->getUser()->getName();
    }
    
    protected function getStorefrontName()
    {
        $id = $this->getStorefrontId();
        $name = $id != 0 ? Mage::getModel('rewardsinstore/storefront')->load($id)->getName() : "";
        return $name;
    }
    
    protected function getStorefrontId()
    {
        if ($this->_storefrontId === null) {
            $session = Mage::getSingleton('admin/session');
            $this->_storefrontId = $session->hasStorefrontId() ? $session->getStorefrontId() : 0;
        }
        return $this->_storefrontId;
    }
    
    protected function getCookieLifetime()
    {
        return Mage::getSingleton('admin/session')->getCookieLifetime();
    }
}
