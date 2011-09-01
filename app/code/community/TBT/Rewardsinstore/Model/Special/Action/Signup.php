<?php
class TBT_Rewardsinstore_Model_Special_Action_Signup
        extends TBT_Rewards_Model_Special_Action_Abstract
{
    public function __construct()
    {
        $this->setCaption(Mage::helper('rewardsinstore')->__("Instore signup"));
        $this->setDescription(Mage::helper('rewardsinstore')->__("Customer will get points when they signup at a Storefront location."));
        $this->setCode('instore_customer_signup');
        parent::__construct();
    }

    public function givePoints(&$customer) { }

    public function revokePoints(&$customer) { }

    public function holdPoints(&$customer) { }

    public function cancelPoints(&$customer) { }

    public function approvePoints(&$customer) { }
}
