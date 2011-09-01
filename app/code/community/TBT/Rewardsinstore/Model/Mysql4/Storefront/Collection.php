<?php

class TBT_Rewardsinstore_Model_Mysql4_Storefront_Collection extends Mage_Core_Model_Mysql4_Collection_Abstract {

	protected $didSelectWebsiteName = false;
	
    protected function _construct () {
        $this->_init('rewardsinstore/storefront');
    }
    
    /**
     * Performs a join to include the website's name in the result set fields, under the provided alias
     * @param string $alias The alias/fieldname under which to place the website name
     */
    public function selectWebsiteName($alias)
    {
    	if( !$this->didSelectWebsiteName ) {
    		$table_name = Mage::getModel('core/website')->getResource()->getMainTable();
    		$this->getSelect()->joinLeft( $table_name, "{$table_name}.website_id = main_table.website_id", array( $alias => 'name' ) );
    		$this->didSelectWebsiteName = true;
    	}
    	
    	return $this;
    }
    
    /**
     * Filters the collection on a string of comma separated storefront ids.
     *
     * @param string $ids comma separated ids
     * @return $this
     */
    public function filterOnIds($ids) {
        $this->addFieldToFilter('storefront_id', array('IN' => explode(',', $ids)));
        return $this;
    }
}
?>