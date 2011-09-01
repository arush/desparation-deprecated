<?php

class TBT_Rewardsinstore_Helper_Transfer extends Mage_Core_Helper_Abstract {

    public function getTransferSummary($transfer) {
        
        return array (
            'points' => $transfer->getQuantity(),
            'description' => $transfer->getComments()
        );
    }
    
    // TODO: refactor this to getAssociatedTransfers($customer, $referenceId, $reference = null)
    // Not doing this yet because referenceId is not actually used with some transfers.
    public function getInstoreSignupTransfers($customerId) {
        return Mage::getModel('rewards/transfer')->getCollection()
            ->addFilter ('customer_id', $customerId);
    }
    
}

?>
