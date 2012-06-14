<?php

class Arush_Get_PartyController extends Mage_Core_Controller_Front_Action
{
    public function startedAction(){
    $this->loadLayout();
    $this->renderLayout();
    }
}