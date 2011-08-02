<?php
class Gigya_Socialize_Block_Page_Template_Links extends Mage_Core_Block_Abstract {

	public function addLink($label, $url='', $title='', $prepare=false, $urlParams=array(),
        $position=null, $liParams=null, $aParams=null, $beforeText='', $afterText='')
    {
    	
    	$value=Mage::helper('socialize')->isEnabledAndConfigured();
    	
        if (($parentBlock = $this->getParentBlock()) && ($value)) {
        $parentBlock->addLink($label,$url,$title,$prepare,$urlParams,
    	    $position,$liParams,$aParams,$beforeText,$afterText);
        // see Mage_Page_Block_Template_Links::addLink()
        }
        	
        return $this;
    }
       
}


