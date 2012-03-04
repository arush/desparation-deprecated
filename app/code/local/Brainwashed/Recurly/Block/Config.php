<?php
class Brainwashed_Recurly_Block_Config extends Mage_Core_Block_Template {

    protected function _construct() {
        parent::_construct();
		$this->setTemplate('brainwashed/recurly/config.phtml');
    }
}