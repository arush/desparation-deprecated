<?php

/**
 * product comments block
 *
 * @category   Mage
 * @package    Gigya_Socialize
 * @author     
 */
class Gigya_Socialize_Block_Plugin_ReactionsBar extends Gigya_Socialize_Block_Plugin_Abstract //Mage_Core_Block_Template
{

	public function _prepareLayout(){
		
	}

	public function getPluginName() {
    	return 'reactions';
    }
    
    public function getPluginDisplayName() {
    	return $this->__('Reactions Bar');
    }

    public function getConfigGroupName() {
    	return 'product_reactionsbar';
    }
    
	//TODO:make this a real configuration option.
    public function isEnabled($storeId=null) {
    	$originalReturnValue=parent::isEnabled($storeId);
    	return $originalReturnValue;
    }

    //TODO:make this a real configuration option.
    public function isConfigured($storeId=null) {
    	$originalReturnValue=parent::isConfigured($storeId);
    	return $originalReturnValue;
    }

    public function getAdvancedSettings()
    {
    	return $this->getSetting('advanced');//Mage::helper('socialize')->getConfig()->getProductReactionsBarAdvancedSettings();
    }

    public function getReactionIdList() {
    	return  strtolower(str_replace(' ', '',($this->getSetting('reactions'))));
    }

    public function getJSONMapForUsedDefaultReactions() {
    	$reactionsHelper=Mage::helper('socialize/reaction');
    	$reactionIdList=$this->getReactionIdList();
	   	$map='{';

    	$reactionsIds=explode(',',$reactionIdList);
    	foreach ($reactionsIds as $reactionId) {
    		if (isset($reactionsHelper->JSONForDefaultReactions,$reactionId)) {
	    		$json=$reactionsHelper->JSONForDefaultReactions[$reactionId];
	    		if ($json!=null) {
	    			if ($map != '{') {$map .= ',';} 
	    			$map .= $reactionId . ':' . $json;
	    		} else {
	    			//echo ('/* No Default reaction for ' . $reactionId . '*/');	
	    		}
    		}
    	}
    	$map.='}';
    	return $map;
    }

    public function getJSONArrayofSelfDefinedReactions() {

    	$selfDefinedReactionsArray=trim($this->getSetting('self_defiend_reactions'));
    	if (($selfDefinedReactionsArray!==null) && ($selfDefinedReactionsArray!='')) {
    		return $selfDefinedReactionsArray;
    	}

    	return '/* '. $selfDefinedReactionsArray . '*/[]';
    }
    
    public function getItemId() {
    	$product = Mage::registry('product');
    	return $product->getId();
    }
}
