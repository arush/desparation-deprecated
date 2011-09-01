<?php
//Mage_Adminhtml_Block_Template
//Mage_Core_Block_Template
class TBT_Rewardsinstore_Block_Webapp extends Mage_Core_Block_Template
{
    protected $_storefronts = null;
    
    public function __construct()
    {
        parent::__construct();
        
        $this->_controller = 'webapp';
        $this->_blockGroup = 'rewardsinstore';
        $this->_headerText = $this->__('Sweet Tooth Instore');
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
    
    protected function getLaunchUri()
    {
        $key = Mage::getSingleton('core/session')->getCookie()->get('rewardsinstore-key');
        if ($key) {
            return Mage::getModel('adminhtml/url')->getUrl('rewardsinstoreadmin/webapp_ajax/main', array('key' => $key));
        }
        
        // Get all param keys, the first of which will be our storefront code
        $params = array_keys($this->getRequest()->getParams());
        
        // If there's a parameter, use its key as our storefront code.
        return Mage::getModel('adminhtml/url')->getUrl('rewardsinstore/webapp/login', count($params) ? array('code' => $params[0]) : array());
    }
    
    protected function isLoggedIn()
    {
        return Mage::getSingleton('core/session')->getCookie()->get('rewardsinstore-key');
    }
    
    protected function getStorefronts()
    {
        $storefronts = $this->getStorefrontCollection();
        
        $simplifiedStorefronts = array();
        foreach ($storefronts as $storefront) {
            $simplifiedStorefronts[] = (object) array(
                'id'      => $storefront->getId(),
                'code'    => $storefront->getCode(),
                'name'    => $storefront->getName(),
                'address' => $storefront->getFormattedAddress());
        }
        
        return Zend_Json::encode($simplifiedStorefronts);
    }
}
