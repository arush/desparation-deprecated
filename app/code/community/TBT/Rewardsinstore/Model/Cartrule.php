<?php
class TBT_Rewardsinstore_Model_Cartrule extends TBT_Rewards_Model_Salesrule_Rule
{ 

    protected function _construct()
    {
        $this->_init('rewardsinstore/cartrule');
    }

    /**
     * Save object data.
     * Specifically, only save the Instore-specific data and salesrule reference.
     *
     * @return Mage_Core_Model_Abstract
     */
    public function save()
    {
        $this->_prepareStorefrontIds();
        
        $this->_setWebsiteIdsBasedOnStorefrontIds();
        
        // save the base rule model first
        $base_rule = Mage::getModel('rewards/salesrule_rule')
            ->setData($this->getData())
            ->setConditions($this->getConditions())
            ->setId($this->getId())
            ->save();
        
        // then save the Instore-specific data
        // TODO: not sure if 1.4.1.0 is the minimum for this
        if (is_null($this->getId()) && Mage::helper('rewards/version')->isBaseMageVersionAtLeast('1.4.1.0')) {
            $this->isObjectNew(true);
        }
        $this->setId($base_rule->getId());
        parent::save();
    }
    
    /**
     * Delete cartrule and associated salesrule from database
     *
     * @return Mage_Core_Model_Abstract
     */
    public function delete()
    {
        $rule_id = $this->getRuleId();
        
        parent::delete();
        
        // Delete salesrule right after our instore cartrule is deleted
        Mage::getModel('rewards/salesrule_rule')
            ->load($rule_id)
            ->delete();
        
        return $this;
    }

    /**
     * Implodes storefront ids
     *
     * @return TBT_Rewardsinstore_Model_Cartrule
     */
    protected function _prepareStorefrontIds()
    {
        if (is_array($this->getStorefrontIds())) {
            $this->setStorefrontIds(implode(",", $this->getStorefrontIds()));
        }
        return $this;
    }
    
    
    /**
     * This function sets the rule website_ids based on the
     * selected storefronts in the form. Each storefront is
     * associated with only one website so the user shouldn't
     * have to worry about setting the website when creating
     * instore rules.
     */
    protected function _setWebsiteIdsBasedOnStorefrontIds() {
        
        $storefrontIds = explode(',', $this->getStorefrontIds());
        
        // Get all websites from selected storefronts
        $ruleWebsiteIds = Mage::getModel('rewardsinstore/storefront')
                ->getCollection()
                ->addFieldToFilter('storefront_id', array('IN' => $storefrontIds))
                ->getColumnValues('website_id');
        
        $ruleWebsiteIds = array_unique($ruleWebsiteIds);
        
        $this->setWebsiteIds(implode(',', $ruleWebsiteIds));
    }

    /**
     * Get collection instance
     * (rewardsinstore: we are duplicating the Mage_Core_Model_Abstract method here since for some reason
     * the grandpa class Mage_SalesRule_Model_Rule overrides it with a hardcoded resource collection name)
     *
     * @return object
     */
    public function getResourceCollection()
    {
        if (empty($this->_resourceCollectionName)) {
            Mage::throwException(Mage::helper('core')->__('Model collection resource name is not defined.'));
        }
        return Mage::getResourceModel($this->_resourceCollectionName, $this->_getResource());
    }
    
    /**
     * Uses our rule conditions model to display only instore compatible  conditions
     * 
     * @override Mage_SalesRule_Model_Rule
     * @return unknown
     */
    public function getConditionsInstance()
    {
        return Mage::getModel('rewardsinstore/cartrule_condition_combine');
    }
    
    public function process(Mage_Sales_Model_Quote_Item_Abstract $item) {
        Mage::log('I am a cartrule and got processed ' . $this->getId());
    }
    
}
?>
