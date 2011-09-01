<?php

class TBT_Rewardsinstore_Helper_Directory extends Mage_Core_Helper_Abstract {

    /**
     * This function identifies a region model in Magento
     * by matching it on either id, code, or name.
     * 
     * An region model with a null id is returned if no region is found.
     *
     * @param unknown_type $region_identifier ID, Code, or Name of region
     * @param unknown_type $country_id
     * @return Mage_Directory_Model_Region
     */
    public function getRegionInCountry($region_identifier, $country_id) {
        
        // Check for region id
        if (is_numeric($region_identifier)) {
            $new_region = Mage::getModel('directory/region')->load($region_identifier);
        } else {
            // Check for region code
            $new_region = Mage::getModel('directory/region')->loadByCode($region_identifier);
            
            // Finally, try to match on region name
            if (!$new_region->getId()) {
                $new_region = Mage::getModel('directory/region')->loadByName($region_identifier, $country_id);
            }
        }
        return $new_region;
    }
    
}

?>
