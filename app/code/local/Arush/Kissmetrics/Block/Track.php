<?php
/**
* Arush Kissmetrics block
*
* @codepool   Local
* @category   Arush
* @package    Arush_Kissmetrics
* @module     Kissmetrics
*/
class Arush_Kissmetrics_Block_Track extends Mage_Core_Block_Template
{
    public function getKissmetricsOn()
      {
  		  return (boolean)Mage::getStoreConfig('kissmetrics/track/kissmetrics_on');
      }

    public function getKissmetricsCode()
      {        
          return (string)Mage::getStoreConfig('kissmetrics/track/kissmetrics_code');
      }

}
