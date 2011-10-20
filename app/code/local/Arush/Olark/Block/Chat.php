<?php
/**
* Arush Olark block
*
* @codepool   Local
* @category   Arush
* @package    Arush_Olark
* @module     Olark
*/
class Arush_Olark_Block_Chat extends Mage_Core_Block_Template
{
    public function getOlarkOn()
      {
		  return (boolean)Mage::getStoreConfig('olark/chat/olark_on');
      }

    public function getOlarkCode()
      {        
          return (string)Mage::getStoreConfig('olark/chat/olark_code');
      }

    public function getOlarkName()
      {        
          return (boolean)Mage::getStoreConfig('olark/chat/olark_name');
      }

    public function getOlarkPaymentpage()
      {        
          return (boolean)Mage::getStoreConfig('olark/chat/olark_paymentpage');
      }

}
