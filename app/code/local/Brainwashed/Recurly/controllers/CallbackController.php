<?php
class Brainwashed_Recurly_CallbackController extends Mage_Core_Controller_Front_Action {

	function pushAction() {
	

		$xml = file_get_contents('php://input');
		$xml = simplexml_load_string($xml);	
		if (!$xml->account || !$xml->transaction) { return; }		
		
		
		$invoiceNumber = (String)$xml->transaction->invoice_number;
		$accountCode = (String)$xml->account->account_code;
		
		
		try {

			$invoice = Mage::helper('recurly')->getInvoice($invoiceNumber);
			$account = Mage::helper('recurly')->getAccount($accountCode);	
			$uuid = $invoice->uuid;
			$accountSubscriptions = Mage::helper('recurly')->getAccountSubscriptions($accountCode);		

			$sku = false;

			foreach($accountSubscriptions as $accountSubscription) {
				if ($accountSubscription->state == 'active') {
					$sku = $accountSubscription->plan->plan_code;
					break;
				}
			}
			
			if (!$sku) { return; }

			$lastOrder = Mage::getModel('sales/order');
			
			$orders = Mage::getModel('sales/order')->getCollection()->addAttributeToFilter('customer_email', $account->email)->addAttributeToSort('created_at', 'desc');
			foreach($orders as $order) {
				$sku = 'recurly';
				$lineItems = $order->getAllItems();
				foreach($lineItems as $lineItem) {
					if ($lineItem->getSku() == $sku) {
						$lastOrder = $order;
						break 2;
					}

				}
			}	

			$quoteId = $lastOrder->getQuoteId();
			$order = $this->_invoiceOrder($quoteId);			
					
		} catch (Exception $e) {
			Mage::log($e->getMessage(), null, 'recurly.log');
		}
		
	}

	function successAction() {
		$results = $this->getRequest()->getParam('recurly_result');
		
		try {
			Mage::helper('recurly')->verifySubscription($results);
			
			$quote = Mage::getModel('checkout/cart')->getQuote();
			$quoteId = $quote->getId();
			
			$order  = $this->_invoiceOrder($quoteId);
            Mage::getSingleton('checkout/session')->setLastSuccessQuoteId($quoteId);
	        Mage::getSingleton('checkout/session')->setLastQuoteId($quoteId);
	        Mage::getSingleton('checkout/session')->setLastOrderId($order->getId());

            $this->_redirect('checkout/onepage/success');			
		} catch (Exception $e) {
			print_r($e->getMessage());
		}		
	}
	
	function cancelAction() {
	
	}
	
	protected function _invoiceOrder($quoteId) {
	
	
		$quote = Mage::getModel('sales/quote')->load($quoteId);
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
			if ($invoice->canCapture()) {
				$invoice->capture();			
			}

			$transactionSave = Mage::getModel('core/resource_transaction')
				->addObject($invoice)
				->addObject($invoice->getOrder());
			 
			$transactionSave->save();				
	    }
	    
	    return $order;
	
	
	}
}