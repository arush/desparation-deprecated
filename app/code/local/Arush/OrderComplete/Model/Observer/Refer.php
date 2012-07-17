<?php

class Arush_OrderComplete_Model_Observer_Refer extends Varien_Object {

    public function distributeRewards($observer) {
        $orderId = Mage::getSingleton('checkout/type_onepage')->getCheckout()->getLastOrderId();
        $order = Mage::getModel('rewards/sales_order')->load($orderId);

        $customerId = $order->getCustomerId();
        if (!$customerId) {
            return false;
        }

        Mage::log('order observer triggered', null, 'arush.log');

        // $this->recordPointsUponFirstOrder($order);
        // $this->recordPointsOrder($order);
        
        return $this;
    }
    
    public function createCoupon() {
        // check if unused coupon exists
        // create coupon on the fly
        // output coupon code to javascript 
    }
    
    public function brandReferrer() {
        // get parent referrer name
        // display name and discount amount in header 
        // set coupon applicable to true (not cookie based)
    }

}
