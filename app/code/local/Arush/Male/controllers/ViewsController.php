<?php

class Arush_Male_ViewsController extends Mage_Core_Controller_Front_Action
{
    /**
     * This routes all the views
     */
    public function menuAction()
    {
        $this->getResponse()->setBody('<nav><section>  <div id="categoryItems" class="navItem">    <header>      <a id="menuItemOpener">        <span>Configure pants</span>      </a>    </header>    <div class="menuItem boxers">      <a id="navButtonBoxers" class="menuItemOverlay">      </a>    </div>  </div></section></nav>');
    }

}
