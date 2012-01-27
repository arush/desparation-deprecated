<?php

class Arush_Test_ControllerController extends Mage_Core_Controller_Front_Action
{
    public function magemonkeyAction(){
    	Mage::getModel('monkey/cron')->processExportJobs();
    	echo 'done';
    }
}