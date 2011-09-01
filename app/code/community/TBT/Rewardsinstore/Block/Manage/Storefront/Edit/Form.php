<?php

class TBT_Rewardsinstore_Block_Manage_Storefront_Edit_Form extends Mage_Adminhtml_Block_Widget_Form
{

    public function __construct()
    {
        parent::__construct();
        $this->setId('rewardsinstoreStorefrontForm');
        $this->_blockGroup = 'rewardsinstore';
    }

    protected function _prepareForm()
    {
        $storefrontModel = Mage::registry('storefront_data');

        $form = new Varien_Data_Form(array(
            'id'        => 'edit_form',
            'action'    => $this->getData('action'),
            'method'    => 'post'
        ));

        if ($postData = Mage::registry('storefront_post_data')) {
            $storefrontModel->setData($postData['storefront']);
        }
        
        $fieldset = $form->addFieldset('storefront_fieldset', array(
            'legend' => Mage::helper('rewardsinstore')->__('Storefront Information')
        ));

        $websites = Mage::getModel('core/website')->getCollection()->toOptionArray();
        $fieldset->addField('storefront_website_id', 'select', array(
            'name'      => 'storefront[website_id]',
            'label'     => Mage::helper('core')->__('Website'),
            'value'     => $storefrontModel->getWebsiteId(),
            'values'    => $websites,
            'required'  => true,
        ));
            
        $fieldset->addField('storefront_name', 'text', array(
            'name'      => 'storefront[name]',
            'label'     => Mage::helper('core')->__('Display Name'),
            'value'     => $storefrontModel->getName(),
            'required'  => true,
        ));
        
        // TODO: This field is now hidden, do we really need it? Too much overhead for craeting storefronts.
        $fieldset->addField('storefront_description', 'hidden', array(
            'name'      => 'storefront[description]',
            'label'     => Mage::helper('rewardsinstore')->__('Description'),
            'value'     => $storefrontModel->getDescription(),
            'required'  => false,
        ));
        
        $fieldset->addField('storefront_code', 'hidden', array(
                'name'      => 'storefront[code]',
                'label'     => Mage::helper('core')->__('URL Code'),
                'value'     => $storefrontModel->getCode(),
                'required'  => false,
        ));
        
        //$fieldset->addType('storefront_url', 'TBT_Rewardsinstore_Block_Form_Element_StorefrontUrl');
        
        $fieldset->addField('storefront_url', 'hidden', array(
                'name'      => 'storefront[code]',
                'label'     => Mage::helper('core')->__('Storefront URL'),
                'value'     => $this->getUrlCode($storefrontModel->getId()),
                'required'  => false,
        ));

        $fieldset->addField('storefront_is_active', 'select', array(
            'name'      => 'storefront[is_active]',
            'label'     => Mage::helper('core')->__('Status'),
            'value'     => 1,
            'options'   => array(
                0 => Mage::helper('adminhtml')->__('Disabled'),
                1 => Mage::helper('adminhtml')->__('Enabled')),
            'required'  => true,
        ));
        
        // Hidden Fields Start Here
        
        $fieldset->addField('storefront_storefront_id', 'hidden', array(
            'name'      => 'storefront[storefront_id]',
            'no_span'   => true,
            'value'     => $storefrontModel->getId()
        ));

        $form->addField('storefront_action', 'hidden', array(
            'name'      => 'storefront_action',
            'no_span'   => true,
            'value'     => Mage::registry('storefront_action')
        ));
        
        // Adding storefront address section
        
        $address_fieldset = $form->addFieldset('storefront_address_fieldset', array(
            'legend' => Mage::helper('rewardsinstore')->__('Storefront Address')
        ));
        
        $address_fieldset->addField('storefront_address_street', 'text', array(
            'name'      => 'storefront[street]',
            'label'     => Mage::helper('core')->__('Street Address'),
            'value'     => $storefrontModel->getStreet(),
            'required'  => true,
        ));
        
        $address_fieldset->addField('storefront_address_city', 'text', array(
            'name'      => 'storefront[city]',
            'label'     => Mage::helper('core')->__('City'),
            'value'     => $storefrontModel->getCity(),
            'required'  => true,
        ));

        $address_fieldset->addType('storefront_address_country', 'TBT_Rewardsinstore_Block_Form_Element_StorefrontCountry');
        
        $countryId = $storefrontModel->getCountryId();
        
        $address_fieldset->addField('country_id', 'storefront_address_country', array(
                'name'      => 'storefront[country_id]',
                'label'     => Mage::helper('core')->__('Country'),
                // TODO: if countryId does not exists, set default as the country of last created storefront (do this in renderer instead?)
                'value'     => $countryId ? $countryId : ' ',
                'required'  => true,
        ));
        
        $address_fieldset->addField('region', 'text', array(
                'name'      => 'storefront[region]',
                'label'     => Mage::helper('core')->__('State/Province'),
                'value'     => $storefrontModel->getRegion(),
                'required'  => true,
        ));
        
        $address_fieldset->addType('storefront_address_region', 'TBT_Rewardsinstore_Block_Form_Element_StorefrontRegion');
        
        $address_fieldset->addField('region_id', 'storefront_address_region', array(
                'name'      => 'storefront[region_id]',
                'label'     => Mage::helper('core')->__('State/Province'),
                'value'     => $storefrontModel->getRegionId(),
                'required'  => true,
        ));
        
        $regionElement = $form->getElement('region');
        if ($regionElement) {
            $regionElement->setRenderer(Mage::getModel('adminhtml/customer_renderer_region'));
        }
        
        $regionElement = $form->getElement('region_id');
        if ($regionElement) {
            $regionElement->setNoDisplay(true);
        }
        
        $address_fieldset->addField('storefront_address_postcode', 'text', array(
            'name'      => 'storefront[postcode]',
            'label'     => Mage::helper('core')->__('Zip/Postal Code'),
            'value'     => $storefrontModel->getPostcode(),
            'required'  => true,
        ));
        
        $address_fieldset->addField('storefront_address_telephone', 'text', array(
            'name'      => 'storefront[telephone]',
            'label'     => Mage::helper('core')->__('Telephone'),
            'value'     => $storefrontModel->getTelephone(),
            'required'  => false,
        ));

        $form->setAction($this->getUrl('*/*/save'));
        $form->setUseContainer(true);
        $this->setForm($form);

        return parent::_prepareForm();
    }
    
    /**
     * This function will grab the url code from
     * the storefront model if it exists, otherwise
     * return an empty string.
     * 
     * We do this so if there is an error while saving,
     * the url will reflect the real url for the storefront
     * or the default url if it's a new storefront being 
     * created.
     *
     * @param string $id
     */
    protected function getUrlCode($id) {
        
        if ($id) {
            return Mage::getModel('rewardsinstore/storefront')->load($id)->getCode();
        }
        
        return '';
    }
}
