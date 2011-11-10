<?php class Vdh_Randomquote_Quotecontroller extends Mage_Core_Controller_Front_Action {

	public function quoteAction() {
		$position = $this->getRequest()->getParam('position');		
		$layout = ($this->getRequest()->getParam('layout')) ? $this->getRequest()->getParam('layout') : 'inline';
		
		$quote = Mage::getModel('randomquote/randomquote')->load($position ? $position : false);
		
        $this->loadLayout();
        $this->getLayout()->getBlock('root')->setTemplate('vdh/randomquote/'.$layout.'.phtml');
		$this->getLayout()->getBlock('root')->setQuote($quote);
    	$this->renderLayout();	

		
	}

}