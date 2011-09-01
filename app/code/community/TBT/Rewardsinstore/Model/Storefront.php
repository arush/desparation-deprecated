<?php

class TBT_Rewardsinstore_Model_Storefront extends TBT_Rewardsinstore_Model_Loyalty_Rewardsinstore 
{
    
    const URL_TYPE_STOREFRONT = 'storefront/';
    
    protected function _construct()
    {
        $this->_init('rewardsinstore/storefront');
    }   
    
    // TODO: move this to the collection (Wow, I must have written this back in the day)
    public function toOptionArray() {
        
        $storefronts = $this->getCollection();
        
        foreach ($storefronts as $storefront) {
            $id = $storefront->getId();
            $name = $storefront->getName();
            if ($id !== null) {
                $options[] = array('value' => $id, 'label' => $name);
            }
        }
        return $options;
    }
    
    /**
     * Gets the default store view of this
     * storefront's website.
     *
     * @return Mage_Core_Model_Store
     */
    public function getDefaultStore() {
        
        $website = Mage::getModel('core/website')->load($this->getWebsiteId());
        
        if (!$website->getId()) {
            return null;
        }
        
        $store = $website->getDefaultStore();

        return $store->getId() ? $store : null;        
    }
    
    // TODO: add $fields array parameter to specify which fields are inluded in the result
    public function getFormattedAddress($format = 'oneline') {
        
        $address = '';
        
        if ($format == 'oneline') {
            $fields = array(
                $this->getStreet(),
                $this->getCity(),
                $this->getRegionName(true),
                $this->getCountryName(),
                );
            
            $address = implode(', ', $fields);
        } else {
            Mage::logException(
                new Exception('Invalid format given for storefront address'));
        }
            
        return $address;
    }
    
    /**
     * Returns the Storefront Country as text
     *
     * @return string
     */
    public function getCountryName() {
        if ($countryId = $this->getCountryId()) {
            if ($country = Mage::getModel('directory/country')->loadByCode($countryId)) {
                return $country->getName();
            }
        }
        return '';
    }
    
    /**
     * Returns the Storefront Region as text
     *
     * @return string
     */
    public function getRegionName($short = false) {
        if ($regionId = $this->getRegionId()) {
            if ($region = Mage::getModel('directory/region')->load($regionId)) {
                return $short ? $region->getCode() : $region->getName();
            }
        }
        
        if ($regionText = $this->getRegion()) {
            return $regionText;
        }
        return '';
    }
    
    public function generateUrlCode()
    {
    	$storefronts = $this->getCollection()
            ->addFieldToFilter('city', $this->getCity());
        return strtolower($this->getCity()) . (count($storefronts) + 1);
    }
    
}

?>