<?php
class TBT_Rewardsinstore_Model_Order extends TBT_Rewards_Model_Sales_Order
{
    protected $_eventPrefix = 'rewardsinstore_order';
    protected $_doSaveBaseOrder = true;
    protected $_areOrdersPolluted = false;

    protected function _construct()
    {
        $this->_init('rewardsinstore/order');
    }
    
    /**
     * Sets whether or not to save the base sales/order model when saving this model
     *
     * @param bool $flag
     * @return TBT_Rewardsinstore_Model_Order
     */
    public function setDoSaveBaseOrder($flag = true)
    {
        $this->_doSaveBaseOrder = $flag;
        return $this;
    }
    
    /**
     * Allows non-Instore orders to be loaded into this model
     *
     * @param bool $flag
     * @return TBT_Rewardsinstore_Model_Order
     */
    public function polluteOrders($flag = true)
    {
        $this->_areOrdersPolluted = $flag;
        return $this;
    }
    
    /**
     * @return bool
     */
    public function getOrderPollution()
    {
        return $this->_areOrdersPolluted;
    }

    /**
     * Save object data.
     * Specifically, only save the Instore-specific data and salesorder reference.
     *
     * @return TBT_Rewardsinstore_Model_Order
     */
    public function save()
    {
        if ($this->_doSaveBaseOrder) {
            $base_order = Mage::getModel('sales/order')
                ->setData($this->getData())
                ->setId($this->getId())
                ->save();
        
            if (is_null($this->getId())) {
                $this->isObjectNew(true);
            }
            $this->setId($base_order->getId());
        }
        
        $this->setForceUpdateGridRecords(true);
        parent::save();
        
        return $this;
    }
    
    /**
     * Loads order data (Instore order combined with base order)
     *
     * @return TBT_Rewardsinstore_Model_Order
     */
    public function load($id, $field = null)
    {
        parent::load($id, $field);
        
        $this->setIsInstore(true);
        if(!$this->getId()) {
            $this->setId($this->getEntityId())
                ->setIsInstore(false);
        }
        
        return $this;
    }
    
    /**
     * Delete Instore order and associated salesorder from database
     *
     * @return TBT_Rewardsinstore_Model_Order
     */
    public function delete()
    {
        $order_id = $this->getId();
        
        parent::delete();
        
        // Delete base order right after our Instore order is deleted
        Mage::getModel('sales/order')
            ->load($order_id)
            ->delete();
        
        return $this;
    }
}
?>
