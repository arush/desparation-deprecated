<?php

class Brainwashed_Recurly_Model_Product_Observer {
	
	public function recurlyRedirectToCheckout($observer) {
		
		$product = $observer->getEvent()->getProduct();
		
		$planCodes = array();
    	$plans = Mage::helper('recurly')->getPlans();
    	foreach($plans as $plan){
    		$planCodes[] = $plan->plan_code;
    	}
		if (!in_array($product->getSku(), $planCodes)) { return; } // We only redirect cart for a Recurly Subscription

		$response = $observer->getResponse();
	    $request = $observer->getRequest();
	    $response->setRedirect(Mage::helper('checkout/url')->getCheckoutUrl());
	    Mage::getSingleton('checkout/session')->setNoCartRedirect(true);

	}

	public function emptyCart($observer) {
		
		$quote = Mage::getSingleton('checkout/session')->getQuote();

        foreach ($quote->getAllItems() as $item) {
            Mage::getSingleton('checkout/cart')->removeItem($item->getId());
        }
        Mage::getSingleton('checkout/cart')->save();

	}
}
