<?php
/**
 * WDCA - Sweet Tooth Instore
 * 
 * NOTICE OF LICENSE
 * 
 * This source file is subject to the SWEET TOOTH (TM) INSTORE
 * License, which extends the Open Software License (OSL 3.0).
 * The Sweet Tooth Instore License is available at this URL: 
 * http://www.sweettoothrewards.com/instore/sweet_tooth_instore_license.txt
 * The Open Software License is available at this URL: 
 * http://opensource.org/licenses/osl-3.0.php
 * 
 * DISCLAIMER
 * 
 * By adding to, editing, or in any way modifying this code, WDCA is 
 * not held liable for any inconsistencies or abnormalities in the 
 * behaviour of this code. 
 * By adding to, editing, or in any way modifying this code, the Licensee
 * terminates any agreement of support offered by WDCA, outlined in the 
 * provided Sweet Tooth Instore License. 
 * Upon discovery of modified code in the process of support, the Licensee 
 * is still held accountable for any and all billable time WDCA spent 
 * during the support process.
 * WDCA does not guarantee compatibility with any other framework extension. 
 * WDCA is not responsbile for any inconsistencies or abnormalities in the
 * behaviour of this code if caused by other framework extension.
 * If you did not receive a copy of the license, please send an email to 
 * support@wdca.ca or call 1-888-699-WDCA(9322), so we can send you a copy 
 * immediately.
 * 
 * @category   [TBT]
 * @package    [TBT_Rewardsinstore]
 * @copyright  Copyright (c) 2011 Sweet Tooth (http://www.sweettoothrewards.com)
 * @license    http://www.sweettoothrewards.com/instore/sweet_tooth_instore_license.txt
 */

/**
 * @category   TBT
 * @package    TBT_Rewardsinstore
 * @author     Sweet Tooth Instore Team <support@wdca.ca>
 */
class TBT_Rewardsinstore_Block_Manage_Earning_Cart_Edit_Form extends Mage_Adminhtml_Block_Widget_Form
{
    public function __construct()
    {
        parent::__construct ();
        $this->setId ( 'manage_promo_quote_form' );
        $this->setTitle ( Mage::helper ( 'salesrule' )->__ ( 'Rule Information' ) );
    }
    
    protected function _prepareForm()
    {
        $form = new Varien_Data_Form ( array ('id' => 'edit_form', 'action' => $this->getData ( 'action' ), 'method' => 'post' ) );
        $form->setUseContainer ( true );
        $this->setForm ( $form );
        return parent::_prepareForm ();
    }
}
