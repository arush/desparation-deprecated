<?php

class TBT_Rewardsinstore_Model_Transfer_Reference_Quote extends TBT_Rewards_Model_Transfer_Reference_Abstract {

    const REFERENCE_TYPE_ID = 50; // TODO: does this conflict with anything?

    // TODO: create this renderer
    protected $_transferCellRenderer = 'rewardsref/customer_transfers_referral_cell';
    
    public function getTRefCellRenderers () {
        return array(self::REFERENCE_TYPE_ID => $this->_transferCellRenderer);
    }

    public function loadReferenceInformation (&$transfer) {
        /*
        $this->_data['friend_id'] = $transfer->getReferenceId();
         */
        return $this;
    }

    public function clearReferences (&$transfer) {
        /*
            if ($transfer->hasData ( 'friend_id' )) {
                $transfer->unsetData ( 'friend_id' );
            }
        */
        return $this;
    }

    public function getReferenceOptions () {
        $reference_options = array(self::REFERENCE_TYPE_ID => Mage::helper('rewardsinstore')->__('Instore Quote'));
        return $reference_options;
    }

}