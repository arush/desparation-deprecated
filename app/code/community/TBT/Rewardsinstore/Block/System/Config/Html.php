<?php

class TBT_Rewardsinstore_Block_System_Config_Html extends Mage_Adminhtml_Block_System_Config_Form_Fieldset {

    protected $_dummyElement;
    protected $_fieldRenderer;
    protected $_values;

    public function render(Varien_Data_Form_Element_Abstract $element) {

        $html = "";
        $html .= "
        	<div style=\" margin-bottom: 12px; width: 430px;\">
            Sweet Tooth Instore v" . Mage::getConfig()->getNode('modules/TBT_Rewardsinstore/version') . 
            ". <a href='http://www.sweettoothrewards.com/news' target='_blank'>Click here for updates.</a><BR /> 
		";

        $html .= Mage::getBlockSingleton('rewards/manage_widget_loyalty')->toHtml();

        $html .= "  </div> ";
        $html .= ""; //$this->_getFooterHtml($element);


        return $html;
    }

    protected function _getDummyElement() {
        if (empty($this->_dummyElement)) {
            $this->_dummyElement = new Varien_Object(array('show_in_default' => 1, 'show_in_website' => 1));
        }
        return $this->_dummyElement;
    }

    protected function _getFieldRenderer() {
        if (empty($this->_fieldRenderer)) {
            $this->_fieldRenderer = Mage::getBlockSingleton('adminhtml/system_config_form_field');
        }
        return $this->_fieldRenderer;
    }

    protected function _getFieldHtml($fieldset, $moduleName) {
        $configData = $this->getConfigData();
        $path = 'advanced/modules_disable_output/' . $moduleName; //TODO: move as property of form
        $data = isset($configData [$path]) ? $configData [$path] : array();

        $e = $this->_getDummyElement();

        $moduleKey = substr($moduleName, strpos($moduleName, '_') + 1);
        $ver = (Mage::getConfig()->getModuleConfig($moduleName)->version);

        if ($ver) {
            $field = $fieldset->addField($moduleName, 'label', array('name' => 'ssssss', 'label' => $moduleName, 'value' => $ver))->setRenderer($this->_getFieldRenderer());
            return $field->toHtml();
        }
        return '';
    }

}
