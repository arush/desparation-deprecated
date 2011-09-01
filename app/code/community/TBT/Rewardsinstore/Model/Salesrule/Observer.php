<?php

class TBT_Rewardsinstore_Model_Salesrule_Observer extends Varien_Object {
	
	/**
	 * This method runs for every valid rule for the quote.
     * If the order is an instore order, we clear any discounts 
     * so they are not applied.
     * 
	 * @param Varien_Object $o
	 */
	public function salesruleValidatorProcess($o) {
        
		$event = $o->getEvent ();
        
		$rule = $event->getRule ();
		$item = $event->getItem ();
		$address = $event->getAddress ();
		$quote = $event->getQuote ();
        $qty = $event->getQty();
        $result = $event->getResult();
		
        $rule_id = $rule->getId ();
		
		try {
            
            $this->log('Processing Rule ' . $rule_id . ' with discountAmount: ' .
                $result->getDiscountAmount());
                
		    if ($quote->getIsInstore()) {
		        
                $this->log('instore quote.');
                $this->log('Before reset: ' . $this->resultToString($result));
                
                $this->resetResult($result);
                
                $this->log('After reset: ' . $this->resultToString($result));
                
            } else {
                $this->log('web quote.');
                $this->log('Result: ' . $this->resultToString($result));
            }
		
		} catch (Exception $e) {
			Mage::log("Exception in Insore observer: " . $e->getMessage());
			Mage::logException($e);
		}
		
		return $this;
	}
	
	protected function resetResult($result) {
	    $result->setBaseDiscountAmount(0);
        $result->setDiscountAmount(0);
	}
	
	public function resultToString($result) {
	    return 'Base: ' . $result->getBaseDiscountAmount() .
	       ' Actual: ' . $result->getDiscountAmount();
	}
	
    public function log($msg) {
        Mage::helper('rewardsinstore')->log($msg);
    }
}