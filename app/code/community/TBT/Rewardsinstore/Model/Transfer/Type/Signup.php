<?php

class TBT_Rewardsinstore_Model_Transfer_Type_Signup extends TBT_Rewards_Model_Transfer_Type_Abstract {

    public function transferBeforeSave (&$transfer) {
        return $this;
    }

    public function transferAfterSave (&$transfer) {
        return $this;
    }

    public function loadReferenceInformation (&$transfer) {
        return $this;
    }

    public function clearReferences (&$transfer) {
        return $this;
    }

    public function getOtherReasons () {
        return array();
    }

    public function getAvailReasons ($current_reason, &$availR) {
        return $availR;
    }

    public function getManualReasons () {
        return array();
    }

    public function getReferenceOptions () {
        return array();
    }

    public function getDistributionReasons () {
        return array();
    }

    public function getRedemptionReasons () {
        return array();
    }

    public function getCustomerTransferRowRenderers () {
        return array();
    }

}