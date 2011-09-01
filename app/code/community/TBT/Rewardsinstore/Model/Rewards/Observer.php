<?php

class TBT_Rewardsinstore_Model_Rewards_Observer extends Varien_Object {

    /**
     * This function does one of two things depending on the type of order:
     *
     * Online order/quote:
     * - clears result for instore rules
     *
     * Instore order/quote:
     * - clears result for online rules
     * - validates instore rules agains the order/quote
     * 
     * Sweet Tooth Core handles the points transfers for now.
     *
     * @param unknown_type $o
     * @return $this
     */
    public function calculateCartPoints($o) {
        
        $event = $o->getEvent();
        
        $rule_id = $event->getRuleId();
        $order_items = $event->getOrderItems();
        $result = $event->getResult();
        
        if (!$item = $this->getValidItem($order_items)) {
            return $this;
        }
        
        if ($storefront = $this->getStorefrontIdFromItem($item)) {
            
            /**
             * We're dealing with an instore order or quote so clear
             * all online rules, and validate all instore rules.
             */
            
            if ($instore_rule = Mage::helper('rewardsinstore/rule')->isInstoreRule($rule_id)) {
                $this->validateInstoreRule($instore_rule, $storefront, $result);
            } else {
                $this->clearPointsFromResult($result);
            }
            
        } else {
            
            /**
             * We're dealing with an online order or quote so clear
             * all instore rules, and let the web rules pass through.
             */
            
            if ($instore_rule = Mage::helper('rewardsinstore/rule')->isInstoreRule($rule_id)) {
                $this->clearPointsFromResult($result);
            }
        }
        
        return $this;
    
    }
    
    /**
     * Checks whether the item is part of an instore quote or order
     */
    protected function getStorefrontIdFromItem($item) {
        
        $order = $item->getOrder();
        $quote = $item->getQuote();
        
        if ($order && $instore_order = Mage::helper('rewardsinstore/rule')->isInstoreOrder($order->getId())) {
            // TODO: find a better place to clear these points (observer?)
            Mage::helper('rewardsinstore/points')->clearEarnedPointsOnItems($order->getAllItems());
            return $instore_order->getStorefrontId();
        }
        
        if ($quote && $quote->getIsInstore()) {
            // TODO: find a better place to clear these points (observer?)
            Mage::helper('rewardsinstore/points')->clearEarnedPointsOnItems($quote->getAllItems());
            return $quote->getStorefrontId();
        }
        
        return null;
    }
    
    protected function getValidItem($order_items) {
        
        if (empty($order_items) || !is_array($order_items)) {
            return null;
        }
        return $order_items[0];
    }
    
    protected function validateInstoreRule($rule, $storefront, $result) {
        
        $rule_storefronts = $rule->getStorefrontIds();
        
        // Do not apply rule if storefronts don't match up
        if (!in_array($storefront, explode(',', $rule_storefronts))) {
            $this->log('Rule ' . $rule->getId() . ' not applied. Wrong Storefront');
            $this->clearPointsFromResult($result);
        } else {
            $this->log('Rule ' . $rule->getId() . ' applied for correct storefront');
        }
    }
    
    protected function clearPointsFromResult($result) {
        $result->setPointsToTransfer(0);
    }
    
    public function log($msg) {
        Mage::helper('rewardsinstore')->log($msg);
    }
}