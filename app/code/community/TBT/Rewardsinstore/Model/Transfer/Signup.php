<?php

class TBT_Rewardsinstore_Model_Transfer_Signup extends TBT_Rewards_Model_Transfer {
    
    const REFERENCE_TYPE = TBT_Rewardsinstore_Model_Transfer_Reference_Signup::REFERENCE_TYPE_ID;

    public function getTransfersAssociatedWithSignup($customer_id) {
        return $this->getCollection()
                ->addFilter('reference_type', self::REFERENCE_TYPE)
                ->addFilter('reference_id', $customer_id);
    }

    public function setCustomerId($id) {
        parent::setCustomerId($id);
        $this->clearReferences();
        $this->setReferenceType(self::REFERENCE_TYPE);
        $this->setReferenceId($id);
        $this->_data['customer_id'] = $id;
        return $this;
    }

    public function create($customer, $rule) {
        
        $num_points = $rule->getPointsAmount();
        $currency_id = $rule->getPointsCurrencyId();
        $rule_id = $rule->getId();
        $transfer = $this->initTransfer($num_points, $currency_id, $rule_id);
        $store = $customer->getStore();
        
        if (!$transfer) {
            return false;
        }
        
        //get the default starting status
        $initial_status = Mage::getStoreConfig('rewards/InitialTransferStatus/AfterInstoreSignup', $store);
        if (!$transfer->setStatus(null, $initial_status)) {
            return false;
        }
        
        // Translate the message through the core translation engine (nto the store view system) in case people want to use that instead
        // This is not normal, but we found that a lot of people preferred to use the standard translation system insteaed of the 
        // store view system so this lets them use both.
        $initial_transfer_msg = Mage::getStoreConfig('rewards/transferComments/instoreSignup', $store);
        $comments = Mage::helper('rewards')->__($initial_transfer_msg);
        
        $this->setComments($comments)->setCustomerId($customer->getId())->save();
        
        return true;
    }

}
