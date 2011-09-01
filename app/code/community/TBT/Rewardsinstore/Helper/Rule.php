<?php

class TBT_Rewardsinstore_Helper_Rule extends Mage_Core_Helper_Abstract {

    public function isInstoreRule($rule_id) {
        
        // TODO: create a more generic way of checking for instore rules
        $rule = Mage::getModel('rewardsinstore/cartrule')->load($rule_id);
        
        return $rule->getId() ? $rule : null;
    }
    
    // TODO: move this to own helper or change the name of this one
    public function isInstoreOrder($order_id) {
        
        $order = Mage::getModel('rewardsinstore/order')->load($order_id);
        
        return $order->getId() ? $order : null;
    }
    
}

?>
