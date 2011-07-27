<?php
class Vdh_Popup_IndexController extends Mage_Core_Controller_Front_Action {

	public function indexAction() {
        $this->loadLayout();		
    	$this->renderLayout();	
//		print_r('h123211');

		
	}
	
	public function firstAction() {
		print_r('1');
	}
	
	public function secondAction() {
		print_r('2');
	}
	public function thirdAction() {
		print_r('3');
	}
}
