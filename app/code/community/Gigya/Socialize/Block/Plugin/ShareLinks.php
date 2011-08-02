<?php

/**
 * product comments block
 *
 * @category   Mage
 * @package    Gigya_Socialize
 * @author     
 */
class Gigya_Socialize_Block_Plugin_ShareLinks extends Gigya_Socialize_Block_Plugin_Abstract //Mage_Core_Block_Template
{

    
	public function _prepareLayout(){
		
	}
    public function getPluginName() {
    	return 'share';
    }
    
    public function getPluginDisplayName() {
    	return $this->__('Share');
    }
    public function getConfigGroupName() {
    	return 'product_share';
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
    

    public function getShareLinkHTML($format=null) {
    	if ($format==null) $format=$this->getSetting('share_link_format');
    	$html='';
    	switch ($format) {
    		case 'both':
    			$html=$this->getShareLinkHTML('icon') . '&nbsp;' . $this->getShareLinkHTML('text'); 
    		break;
    		case 'text':
    			$html=$this->__('Share');
    		break;
    		case 'icon':
    			$url=$this->getSetting('share_link_icon_url');
    			if ($url!=null && strlen($url)>5) {
    				$html='<img title="'. $this->getShareLinkHTML('text') .'" border="0" src="' . $url . '"/>';
    			}
    	    	else {
    				$html=$this->getShareLinkHTML('text');
    			}
    		break;
    	};
    	
    	return $html; 
    }

    
    public function getEmailLinkHTML($format=null) {
    	if ($format==null) $format=$this->getSetting('email_link_format');
    	$html='';
    	switch ($format) {
    		case 'both':
    			$html=$this->getEmailLinkHTML('icon') . '&nbsp;' . $this->getEmailLinkHTML('text'); 
    		break;
    		case 'text':
    			$html=$this->__('Email to Friend');
    		break;
    		case 'icon':
    			$url=$this->getSetting('email_link_icon_url');
    			if ($url!=null && strlen($url)>5) {
    				$html='<img border="0" src="' . $url . '"/>';
    			}
    			else {
    				$html=$this->getEmailLinkHTML('text');
    			}
    			
    		break;
    	};
    	
    	return $html; 
    }
        
    /**
     * Retrieve username for form field
     *
     * @return string
     */
    public function getAdvancedSettings()
    {
    	return $this->getSetting('advanced');//Mage::helper('socialize')->getConfig()->getProductReactionsBarAdvancedSettings();
    }

    public function getItemId() {
    	
    	$product = Mage::registry('product');
/*    	echo('/*');
    	foreach ($product->getData() as $key=>$value) {
    		echo "$key => $value\n\r\n";
    	}
    	echo('* /');
*/
    	//print_r($product);
    	//echo '-----';
    	//print_r($product->debug());
    	//return $product->getId();
    	return $product->getId();
    	//$this->getLayout()->getBlock('head')->getTitle(); 
    	//return $this->getLayout()->getBlock('product')->getProductId();
    }
}
