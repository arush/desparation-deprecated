<?php

class Arush_Keep_CalmController extends Mage_Core_Controller_Front_Action
{
    public function signmeupAction(){
    $this->loadLayout();
    $this->renderLayout();
    }
    
    public function magemonkeyAction(){
    	Mage::getModel('monkey/cron')->processExportJobs()
    
    }
}