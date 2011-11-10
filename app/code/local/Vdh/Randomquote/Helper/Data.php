<?php
class Vdh_Randomquote_Helper_Data extends Mage_Core_Helper_Abstract {

	public function getQuotes() {
		$mappings = Mage::getStoreConfig('randomquote/general/quotes');

		$mappings = unserialize($mappings);
		$return = array();
		foreach($mappings as $k => $v) {
			$return[] = $v;
		}
		$value = array();		
		foreach ($return as $key => $row) {
		    $value[$key]  = $row['order'];
		}            	
		return $return;

	}
	
	public function getStyles() {
		$mappings = Mage::getStoreConfig('randomquote/general/styles');
		$mappings = unserialize($mappings);
		$return = array();
		foreach($mappings as $k => $v) {
			$return[] = $v;
		}
		$value = array();
		foreach ($return as $key => $row) {
		    $value[$key]  = $row['order'];
		}            	
		array_multisort($value, SORT_ASC, $return);
		return $return;

	}	
}