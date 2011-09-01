<?php

class TBT_Rewardsinstore_Block_Manage_Storefront_Edit extends Mage_Adminhtml_Block_Widget_Form_Container
{
    
    public function __construct()
    {
        $this->_objectId = 'id';
        $this->_blockGroup = 'rewardsinstore';
        $saveLabel   = Mage::helper('rewardsinstore')->__('Save Storefront');
        $deleteLabel = Mage::helper('rewardsinstore')->__('Delete Storefront');
        $deleteUrl   = $this->getUrl('*/*/delete', array('id' => Mage::registry('storefront_data')->getId()));
        
        $this->_controller = 'manage_storefront';

        parent::__construct();

        $this->_updateButton('save', 'label', $saveLabel);
        $this->_updateButton('delete', 'label', $deleteLabel);
        $this->_updateButton('delete', 'onclick', 'setLocation(\''.$deleteUrl.'\');');
    }

    public function getHeaderText()
    {
        $editLabel = Mage::helper('rewardsinstore')->__('Edit Storefront');
        $addLabel  = Mage::helper('rewardsinstore')->__('New Storefront');

        return Mage::registry('storefront_action') == 'add' ? $addLabel : $editLabel;
    }
}
