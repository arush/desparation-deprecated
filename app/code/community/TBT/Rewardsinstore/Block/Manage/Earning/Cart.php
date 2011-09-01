<?php

class TBT_Rewardsinstore_Block_Manage_Earning_Cart extends TBT_Rewards_Block_Manage_Widget_Grid_Container
{
    public function __construct()
    {
        $this->_controller = 'manage_earning_cart';
        $this->_blockGroup = 'rewardsinstore';
        $this->_headerText = Mage::helper('rewardsinstore')->__('Create Instore Cart Rule');
        parent::__construct();
    }
    
    protected function _prepareLayout()
    {
        /* Update default add button to add website button */
        $this->_updateButton('add', 'label', Mage::helper('rewardsinstore')->__('Add New Instore Cart Rule'));
        $this->_updateButton('add', 'onclick', "setLocation('".$this->getUrl('*/*/new')."')");
        
        return parent::_prepareLayout();
    }
}

?>