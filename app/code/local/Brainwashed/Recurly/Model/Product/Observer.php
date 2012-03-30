<?php

class Brainwashed_Recurly_Model_Product_Observer {
	
	private function _clearCart($sku) {
		$quote = Mage::getSingleton('checkout/session')->getQuote();
        foreach ($quote->getAllItems() as $item) {
        	if ($item->getSku() == $sku) { continue; }
            Mage::getSingleton('checkout/cart')->removeItem($item->getId());
        }
        Mage::getSingleton('checkout/cart')->save();
	}

	public function redirectToCheckout($observer) {

		$product = $observer->getEvent()->getProduct();

    	$planCodes = array();
    	$plans = Mage::helper('recurly')->getPlans();
    	foreach($plans as $plan){
    		$planCodes[] = $plan->plan_code;
    	}
		if (!in_array($product->getSku(), $planCodes)) { return; } // We only empty cart for a Recurly Subscription

		$this->_clearCart($product->getSku());

	    $response = $observer->getResponse();
	    $request = $observer->getRequest();
	    $response->setRedirect(Mage::helper('checkout/url')->getCheckoutUrl());
	    Mage::getSingleton('checkout/session')->setNoCartRedirect(true);

	}
}
