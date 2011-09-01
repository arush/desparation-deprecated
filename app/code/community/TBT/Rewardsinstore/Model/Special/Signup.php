<?php
class TBT_Rewardsinstore_Model_Special_Signup extends TBT_Rewards_Model_Special_Configabstract
{
    const ACTION_CODE = 'instore_customer_signup';
    
    public function _construct()
    {
        parent::_construct();
        $this->setCaption(Mage::helper('rewardsinstore')->__("Instore signup"));
        $this->setDescription(Mage::helper('rewardsinstore')->__("Customer will get points when they signup at a Storefront location."));
        $this->setCode(self::ACTION_CODE);
    }
    
    public function visitAdminActions(&$fieldset)
    {
        return $this;
    }
    
    public function visitAdminConditions(&$fieldset)
    {
        return $this;
    }
    
    public function getNewCustomerConditions()
    {
        return array(
            self::ACTION_CODE => Mage::helper('rewardsinstore')->__("Signs up through Sweet Tooth Instore")
        );
    }
    
    public function getNewActions()
    {
        return array ();
    }
    
    public function getAdminFormScripts()
    {
        return array ();
    }
    
    public function getAdminFormInitScripts()
    {
        return array ();
    }
}
