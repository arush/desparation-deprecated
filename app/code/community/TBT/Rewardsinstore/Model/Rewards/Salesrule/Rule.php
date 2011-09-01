<?php
class TBT_Rewardsinstore_Model_Rewards_Salesrule_Rule extends TBT_Rewards_Model_Salesrule_Rule
{

    protected function _construct()
    {
        $this->_init('rewardsinstore/rewards_salesrule_rule');
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
}
?>
