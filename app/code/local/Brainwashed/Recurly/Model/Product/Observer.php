<?php

class Brainwashed_Recurly_Model_Product_Observer {
	
	public function clearCart($observer) {
		
		$quote = Mage::getSingleton('checkout/session')->getQuote();
        foreach ($quote->getAllItems() as $item) {
            Mage::getSingleton('checkout/cart')->removeItem($item->getId());
        }		

	}

	public function redirectToCheckout($observer) {
	    $response = $observer->getResponse();
	    $request = $observer->getRequest();
	    $response->setRedirect(Mage::helper('checkout/url')->getCheckoutUrl());
	    Mage::getSingleton('checkout/session')->setNoCartRedirect(true);

	}
}
