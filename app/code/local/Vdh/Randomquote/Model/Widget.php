<?php
class Vdh_Randomquote_Model_Randomquote extends Varien_Object {

	public function load($position = false) {
	
		$helper = Mage::helper('randomquote');
	
		$quotes = unserialize($helper->getQuotes());
	
		if ($position === false || $position >= sizeof($quotes)) {
			$random = rand(0, sizeof($quotes)-1);
			$quote = $quotes[$random];			
		} else {
			$quote = $quotes[$position];
		}
		return $this;
	}

}