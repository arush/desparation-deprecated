<?php
/**
 * MageWorx
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the MageWorx EULA that is bundled with
 * this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.mageworx.com/LICENSE-1.0.html
 *
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@mageworx.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade the extension
 * to newer versions in the future. If you wish to customize the extension
 * for your needs please refer to http://www.mageworx.com/ for more information
 * or send an email to sales@mageworx.com
 *
 * @category   MageWorx
 * @package    MageWorx_InstantCart
 * @copyright  Copyright (c) 2010 MageWorx (http://www.mageworx.com/)
 * @license    http://www.mageworx.com/LICENSE-1.0.html
 */

/**
 * Instant Cart extension
 *
 * @category   MageWorx
 * @package    MageWorx_InstantCart
 * @author     MageWorx Dev Team <dev@mageworx.com>
 */

class MageWorx_InstantCart_Block_Wrapper extends Mage_Core_Block_Template
{
    public function getProduct()
    {
        return Mage::registry('product');
    }

    public function getTopLinkCart(){
        $count = Mage::helper('checkout/cart')->getSummaryCount();
        if( $count == 1 ) {
            $text = Mage::helper('checkout')->__('My Cart (%s item)', $count);
        } elseif( $count > 0 ) {
            $text = Mage::helper('checkout')->__('My Cart (%s items)', $count);
        } else {
            $text = Mage::helper('checkout')->__('My Cart');
        }
        return $text;
    }
    
    public function getTopLinkWishlist(){
        //Mage::helper('wishlist')->calculate();                        
        $count = Mage::helper('wishlist')->getItemCount();
        
        if( $count == 1 ) {
            $text = Mage::helper('wishlist')->__('My Wishlist (%d item)', $count);
        } elseif( $count > 0 ) {
            $text = Mage::helper('wishlist')->__('My Wishlist (%d items)', $count);
        } else {
            $text = Mage::helper('wishlist')->__('My Wishlist');
        }
        return $text;
    }
    
    public function getUrl($route='', $params=array())
    {
        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on') $params['_secure'] = true;
        return $this->_getUrlModel()->getUrl($route, $params);
    }
    
    
    
}