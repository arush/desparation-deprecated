<?php

class TBT_Rewardsinstore_Helper_Customer extends Mage_Core_Helper_Abstract
{
    public function getRewardsCustomer($customer)
    {
        if (Mage::helper('rewardsinstore/version')->getRewardsVersion() < '1.6.0.0') {
            $rewardsCustomer = Mage::getModel('rewards/customer_customer_wrapper')->wrap($customer);
        } else {
            $rewardsCustomer = Mage::getModel('rewards/customer')->getRewardsCustomer($customer);
        }
        
        return $rewardsCustomer;
    }
    
    public function getCustomerName($customer)
    {
        if ($customer instanceof TBT_Rewards_Model_Customer_Customer_Wrapper) {
            return $customer->getCustomer()->getName();
        } else {
            return $customer->getName();
        }
    }
    
    public function getMagentoCustomer($customer)
    {
        if ($customer instanceof TBT_Rewards_Model_Customer_Customer_Wrapper) {
            return $customer->getCustomer();
        } else {
            return $customer;
        }
    }
}
