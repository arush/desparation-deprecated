<?php
class Vdh_Randomquote_Helper_Data extends Mage_Core_Helper_Abstract {

	public function getQuotes() {
		$mappings = Mage::getStoreConfig('randomquote/general/mappings');
		$mappings = unserialize($mappings);
		$return = array();
		foreach($mappings as $k => $v) {
			$return[] = $v;
		}
		return $return;

	}
}