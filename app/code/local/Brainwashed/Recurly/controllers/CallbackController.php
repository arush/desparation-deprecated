<?php
class Brainwashed_Recurly_CallbackController extends Mage_Core_Controller_Front_Action {

	function pushAction() {
		Mage::log($this->getRequest()->getParams(), null, 'recurly.log');
	}

	function successAction() {
		$results = $this->getRequest()->getParam('recurly_result');
		
		try {
			Mage::helper('recurly')->verifySubscription($results);
			
			$quote = Mage::getModel('checkout/cart')->getQuote();
			$quoteId = $quote->getId();
			
			$quoteItems = $quote->getAllItems();
			
			$quote->collectTotals();
			$quote->reserveOrderId();
			
			$quotePayment = $quote->getPayment();			
			$quotePayment->setMethod('recurly');
			
			$convertQuote = Mage::getSingleton('sales/convert_quote');
			
			
			$orderPayment = $convertQuote->paymentToOrderPayment($quotePayment);

			$order = $convertQuote->addressToOrder($quote->getShippingAddress());
			$order->setBillingAddress($convertQuote->addressToOrderAddress($quote->getBillingAddress()));
			$order->setShippingAddress($convertQuote->addressToOrderAddress($quote->getShippingAddress()));
			$order->setPayment($convertQuote->paymentToOrderPayment($quote->getPayment()));
			
			foreach ($quoteItems as $item) {
				$orderItem = $convertQuote->itemToOrderItem($item);
				if ($item->getParentItem()) {
					$orderItem->setParentItem($order->getItemByQuoteItemId($item->getParentItem()->getId()));
				}
				$order->addItem($orderItem);
			}
			
		    $order->setCanShipPartiallyItem(false);
		    
		    $totalDue=$order->getTotalDue();
		    $order->place();
		    $order->save(); 
		    
		    if ($order->canInvoice()) {
				$invoice = Mage::getModel('sales/service_order', $order)->prepareInvoice();		    
				
				$invoice->setRequestedCaptureCase(Mage_Sales_Model_Order_Invoice::CAPTURE_ONLINE);
				$invoice->register();
				$transactionSave = Mage::getModel('core/resource_transaction')
					->addObject($invoice)
					->addObject($invoice->getOrder());
				 
				$transactionSave->save();				
		    }

            Mage::getSingleton('checkout/session')->setLastSuccessQuoteId($quoteId);
	        Mage::getSingleton('checkout/session')->setLastQuoteId($quoteId);
	        Mage::getSingleton('checkout/session')->setLastOrderId($order->getId());

            $this->_redirect('checkout/onepage/success');			
		} catch (Exception $e) {
			Mage::log($e->getMessage(), null, 'recurly.log');
		}		
	}
	
	function cancelAction() {
	
	}
}