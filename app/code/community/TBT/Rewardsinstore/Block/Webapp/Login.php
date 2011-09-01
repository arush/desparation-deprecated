<?php
//Mage_Adminhtml_Block_Template
//Mage_Core_Block_Template
class TBT_Rewardsinstore_Block_Webapp_Login extends Mage_Core_Block_Template
{
    protected $_storefronts = null;
    
    public function __construct()
    {
        parent::__construct();
        
        $this->_controller = 'webapp';
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
    
    protected function getSelectedStorefront()
    {
        return $this->getRequest()->has('code') ?
            "'{$this->getRequest()->get('code')}'" :
            "null";
    }
    
    protected function getLogoSrc()
    {
        return $this->getSkinUrl(Mage::getStoreConfig('design/header/logo_src'));
    }
}
