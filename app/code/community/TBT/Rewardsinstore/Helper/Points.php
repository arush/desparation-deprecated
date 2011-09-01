<?php

class TBT_Rewardsinstore_Helper_Points extends Mage_Core_Helper_Abstract {

    /**
     * Clears all points earned on the items.
     *
     * @param unknown_type $items
     */
    public function clearEarnedPointsOnItems($items) {
        
        if (!$items) {
            return;
        }
        // Clear all item points earned on catalog rules
        foreach ($items as $item) {
            $item->setEarnedPointsHash(Mage::helper('rewards')->hashIt(0));
        }
    }
    
}

?>
