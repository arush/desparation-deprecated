<?php
class TBT_Rewardsinstore_Model_Observer_Cron extends Varien_Object
{
    public function __construct() { }
    
    public function emailCustomers($observer)
    {
        $instoreCustomers = Mage::getModel('customer/customer')->getCollection()
            ->addNameToSelect()
            ->addAttributeToSelect('is_created_instore')
            ->addAttributeToSelect('is_welcome_email_sent')
            ->addAttributeToFilter('is_created_instore', array('eq' => 1));
            // TODO: find a way to filter by is_welcome_email_sent NOT existing (EAV)
        
        // TODO: Maybe try to read/write the file once, instead of n times?
        foreach ($instoreCustomers as $customer) {
            if (!$customer->getIsWelcomeEmailSent()) {
                
                $passwd = Mage::helper('rewardsinstore')->retrieveCustomerData($customer->getId());
                $customer->setPassword($passwd);
                
                $rewardsCustomer = Mage::helper('rewardsinstore/customer')->getRewardsCustomer($customer);
                $rewardsCustomer->loadCollections();
                Mage::helper('rewardsinstore/pos')->emailCustomer($rewardsCustomer);
            }
        }
        
        return $this;
    }
}
