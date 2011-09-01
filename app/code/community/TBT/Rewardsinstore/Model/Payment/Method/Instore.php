<?php

/**
 * This payment method is used for all quotes/orders made through the
 * Sweet Tooth Instore POS web application.
 * 
 * This payment method should not ever be used through the front or back
 * end -- only programatically.
 */
class TBT_Rewardsinstore_Model_Payment_Method_Instore extends Mage_Payment_Model_Method_Abstract
{

    protected $_code    = 'rewardsinstore';
    protected $_canUseCheckout  = false;    // disable in frontend
    protected $_canUseInternal  = false;    // disable in backend

}
