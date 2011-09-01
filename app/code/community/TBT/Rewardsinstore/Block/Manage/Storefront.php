<?php

class TBT_Rewardsinstore_Block_Manage_Storefront extends TBT_Rewards_Block_Manage_Widget_Grid_Container
{
    public function __construct()
    {
        $this->_controller = 'manage_storefront';
        $this->_blockGroup = 'rewardsinstore';
        $this->_headerText = Mage::helper('rewardsinstore')->__('Manage Storefront Locations');
        parent::__construct();
    }
    
    protected function _prepareLayout()
    {
        /* Update default add button to add website button */
        $this->_updateButton('add', 'label', Mage::helper('rewardsinstore')->__('Add New Storefront Location'));
        $this->_updateButton('add', 'onclick', "setLocation('".$this->getUrl('*/*/new')."')");
        
        return parent::_prepareLayout();
    }
}

?>