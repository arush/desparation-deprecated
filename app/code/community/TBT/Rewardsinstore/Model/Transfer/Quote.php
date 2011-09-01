<?php

class TBT_Rewardsinstore_Model_Transfer_Quote extends TBT_Rewards_Model_Transfer {
    
    const REFERENCE_QUOTE = TBT_Rewardsinstore_Model_Transfer_Reference_Quote::REFERENCE_TYPE_ID;

    /**
     * TODO: this function should be abstracted to getAssociatedTransfers() in a parent class
     * which will use the REFERENCE_QUOTE (to be changed to REFERENCE_ID) which will be set
     * in this child class's constructor.
     * Further refactoring will involve changing setQuoteId to setReferenceId.
     *
     * This refactoring needs a ton of testing to it's to be done at an appropriate time.
     */
    public function getTransfersAssociatedWithQuote($quote_id) {
        return $this->getCollection()
                ->addFilter('reference_type', self::REFERENCE_QUOTE)
                ->addFilter('reference_id', $quote_id);
    }

    public function setQuoteId($id) {
        $this->clearReferences();
        $this->setReferenceType(self::REFERENCE_QUOTE);
        $this->setReferenceId($id);
        $this->_data['quote_id'] = $id;
        return $this;
    }

    public function create($num_points, $currency_id, $customerId, $quoteId, 
            $comment = "Points received for making an Instore purchase", 
            $reason_id = TBT_Rewards_Model_Transfer_Reason::REASON_CUSTOMER_DISTRIBUTION, // TODO: use new reason (careful, this makes transfers not show up in grid)
            $transferStatus = TBT_Rewards_Model_Transfer_Status::STATUS_APPROVED) {
                
        // ALWAYS ensure that we only give an integral amount of points
        $num_points = floor($num_points);
        if ($num_points <= 0) {
            return $this;
        }

        $this->setQuoteId($quoteId);
        $this->setReasonId($reason_id);
        if (!$this->setStatus(null, $transferStatus)) {
            return $this;
        }

        $this->setId(null)
            ->setCreationTs(now())
            ->setLastUpdateTs(now())
            ->setCurrencyId($currency_id)
            ->setQuantity($num_points)
            ->setComments($comment)
            ->setCustomerId($customerId)
            ->save();
            
        return $this;
    }

}
