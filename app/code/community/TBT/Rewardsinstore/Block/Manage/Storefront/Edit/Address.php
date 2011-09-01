<?php

class TBT_Rewardsinstore_Block_Manage_Storefront_Edit_Address extends Mage_Adminhtml_Block_Widget_Form
{

    public function __construct()
    {
        parent::__construct();
        $this->setId('rewardsinstoreStorefrontFormAddress');
        $this->_blockGroup = 'rewardsinstore';
        $this->setTemplate('rewardsinstore/storefront/address.phtml');
    }
    
    public function getRegionsUrl()
    {
        return $this->getUrl('adminhtml/json/countryRegion');
    }   
    
}
