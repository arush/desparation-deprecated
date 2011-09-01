<?php

class TBT_Rewardsinstore_Block_Manage_Earning_Cart_Grid extends Mage_Adminhtml_Block_Widget_Grid {
	
    public function __construct ($ruleTypeId) {
        parent::__construct();
        $this->setId('instore_cart_grid');
        $this->_blockGroup = 'rewardsinstore';
        $this->setDefaultSort('sort_order');
        $this->setDefaultDir('ASC');
        $this->setRuleTypeId ( $ruleTypeId );
        $this->setSaveParametersInSession(true);
    }

    /**
     * Fetches the rule type helper;
     * @return TBT_Rewards_Helper_Rule_Type
     */
    public function _getTypeHelper () {
        return Mage::helper('rewards/rule_type');
    }
    
    protected function _prepareCollection() {
        $catalogruleActionsSingleton = Mage::getSingleton ( 'rewards/salesrule_actions' );
        $allowedActions = array ();
        
        if ($this->_getTypeHelper()->isDistribution($this->getRuleTypeId())) { // is a distribution
            $allowedActions = $catalogruleActionsSingleton->getDistributionActions();
        } else {
            $allowedActions = $catalogruleActionsSingleton->getRedemptionActions();
        }
        
        $collection = Mage::getModel('rewardsinstore/cartrule')->getResourceCollection();
//            ->addFieldToFilter("points_action", array ('IN' => $allowedActions));
        $this->setCollection($collection);
        return parent::_prepareCollection();
    }
    
    protected function _prepareColumns() {
        if ($this->columnsAreSet) {
            return parent::_prepareColumns ();
        } else {
            $this->columnsAreSet = true;
        }

        $this->addColumn('rule_id', array(
            'header'    => Mage::helper('salesrule')->__('ID'),
            'align'     =>'right',
            'width'     => '50px',
            'index'     => 'rule_id',
        ));

        $this->addColumn('name', array(
            'header'    => Mage::helper('salesrule')->__('Rule Name'),
            'align'     =>'left',
            'index'     => 'name',
        ));
        
        $this->addColumn('storefront_names', array(
            'header'    => Mage::helper('rewardsinstore')->__('Storefronts'),
            'align'     =>'left',
            'index'     => 'main_table.storefront_ids',
            'renderer'  => 'rewardsinstore/manage_grid_renderer_cartrule'
        ));

        $this->addColumn('from_date', array(
            'header'    => Mage::helper('salesrule')->__('Date Start'),
            'align'     => 'left',
            'width'     => '120px',
            'type'      => 'date',
            'index'     => 'from_date',
        ));

        $this->addColumn('to_date', array(
            'header'    => Mage::helper('salesrule')->__('Date Expire'),
            'align'     => 'left',
            'width'     => '120px',
            'type'      => 'date',
            'default'   => '--',
            'index'     => 'to_date',
        ));

        $this->addColumn('is_active', array(
            'header'    => Mage::helper('salesrule')->__('Status'),
            'align'     => 'left',
            'width'     => '50px',
            'index'     => 'is_active',
            'type'      => 'options',
            'options'   => array(
                1 => 'Active',
                0 => 'Inactive',
            ),
        ));

        return parent::_prepareColumns();
    }
    
    public function getRowUrl($row) {
        return $this->getUrl('*/*/edit', array('id' => $row->getRuleId() , 'type' => $this->getRuleTypeId()));
    }

}