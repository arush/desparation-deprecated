<?php

class TBT_Rewardsinstore_Model_Observer_Rewards_Customer extends Varien_Object {
	
    public function rewardsCustomerSignup($o) {
        
        $event = $o->getEvent();
        $customer = $event->getCustomer();
        $result = $event->getResult();
        
        // return if not an instore customer
        if (!$customer->getIsCreatedInstore()) {
            return $this;
        }

        // Cancel the Rewards module from rewarding on signup
        $result->setIsValid(false);
        
        $this->rewardInstoreCustomerSignup($customer);
        
        return $this;
    }
    
    public function log($msg) {
        Mage::helper('rewardsinstore')->log($msg);
    }

    /**
     * Loops through each Special rule. If the rule applies, create a new transfer.
     */
    public function rewardInstoreCustomerSignup($customer) {
        
        $ruleCollection = $this->getApplicableRules($customer);
        
        foreach ($ruleCollection as $rule) {
            if (!$rule->getId()) {
                continue;
            }
            try {
                $transfer = Mage::getModel('rewardsinstore/transfer_signup');
                $is_transfer_successful = $transfer->create($customer, $rule);
                
                if ($is_transfer_successful) {
                    $points_for_signup = Mage::getModel('rewards/points')->set($rule);
                }
            } catch (Exception $ex) {
                Mage::logException($ex);
                /* TODO: find a way to return this error to the webapp (simply re-throwing the exception
                 * would make it look like the customer failed to be created, which is false */
            }
        }
    }
    
    protected function getApplicableRules($customer) {
        
        /*
         * TODO: Refactor this for other behaviour rules
         * 
         * The TBT_Rewards_Model_Special_Validator checks that
         * the current website matches that in the rule conditions.
         * However when we create customers from the webapp,
         * the website is the admin store, so no rules pass.
         * As a temporary solution we set the current store as that
         * of where the customer was created, then set it back to the
         * original after we get the valid rules.
         */
        $orig_store = Mage::app()->getStore()->getCode();
        Mage::app()->setCurrentStore($customer->getStore()->getCode());
        
        $rules = Mage::getModel('rewards/special_validator')
            ->getApplicableRules(TBT_Rewardsinstore_Model_Special_Signup::ACTION_CODE);
        
        // Restore original store
        Mage::app()->setCurrentStore($orig_store);

        return $rules;
    }
    
}
