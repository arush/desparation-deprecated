<?php

class TBT_Rewardsinstore_Helper_Data extends Mage_Core_Helper_Abstract {

    public function isEnabled() {
        return true;
    }
    
    public function callGrandparent($grandchild, $method) {
        call_user_func(array(get_parent_class(get_parent_class($grandchild)), $method));
    }
    
    /**
     * This function formats a list of strings for displaying in a grid.
     * You can also limit the nubmer of elements that are printed, which
     * will add 'and x more' to the end of the text.
     *
     * @param array $array
     * @param string $delimeter
     * @param int $maxElementsShown number of elements to print in full. 0 for all.
     * @return string Text to be shown
     */
    public function arrayToString($array, $delimeter, $maxElementsShown = 0) {
        
        if ($maxElementsShown == 0) {
            return implode($delimeter, $array);
        }
        
        $text = implode($delimeter, array_slice($array, 0, $maxElementsShown)); 
        
        // Append 'and x more' if applicable
        $andNumOthers = count($array) - $maxElementsShown;
        if ($andNumOthers > 0) {
            // TODO: add the option to hover over 'and x more' to see a tooltip with full list
            $text .= $delimeter . sprintf(Mage::helper('rewardsinstore')->__('and %s more.'), $andNumOthers); 
        }
        
        return $text;
    }
    
    /**
     * Stash customer data to file for emailing later
     * TODO: refactor this process
     * 
     * @param Mage_Customer_Model_Customer $customer
     */
    public function stashCustomerData($customer)
    {
        $file = Mage::getBaseDir('var') . DIRECTORY_SEPARATOR . 'rewardsinstore';
        if (!is_dir($file)) {
            mkdir($file, 0777);
        }
        $file .= DIRECTORY_SEPARATOR . 'customers.json';
        
        $data = file_exists($file) ? Zend_Json::decode(base64_decode(file_get_contents($file))) : array();
        $data[$customer->getId()] = $customer->getPassword();
        
        file_put_contents($file, base64_encode(Zend_Json::encode($data)));
    }
    
    /**
     * Retrieve customer data then delete that particular customer from the file
     * TODO: refactor this process
     * 
     * @param int $customerId
     */
    public function retrieveCustomerData($customerId)
    {
        $file = Mage::getBaseDir('var') . DIRECTORY_SEPARATOR . 'rewardsinstore';
        if (!is_dir($file)) {
            mkdir($file, 0777);
        }
        $file .= DIRECTORY_SEPARATOR . 'customers.json';
        
        $data = file_exists($file) ? Zend_Json::decode(base64_decode(file_get_contents($file))) : array();
        $text = isset($data[$customerId]) ? $data[$customerId] : "******";
        unset($data[$customerId]);
        
        file_put_contents($file, base64_encode(Zend_Json::encode($data)));
        
        return $text;
    }
    
    /**
     * Returns an array of ids in the collection.
     * Usually we can use $collection->getIds() but this can
     * be used for the collections that extend Varien_Data_Collection_Db
     * which doesn't support this funtion. 
     * Eg. Mage_Directory_Model_Mysql4_Region_Collection does this.
     *
     * @param unknown_type $collection
     * @return unknown
     */
    public function getCollectionIds($collection) {
        
        $ids = array();
        foreach ($collection as $item) {
            array_push($ids, $item->getId());
        }
        return $ids;
    }

    /**
     * Log to rewardsinstore file
     */
    public function log($msg) {
        Mage::log($msg, null, "rewardsinstore.log");
    }
    
    /**
     * Log to rewardsinstore.error file
     */
    public function logException($ex) {
        Mage::log("\n" . $ex->__toString(), Zend_Log::ERR, "rewardsinstore.error.log");
    }
    
}

?>
