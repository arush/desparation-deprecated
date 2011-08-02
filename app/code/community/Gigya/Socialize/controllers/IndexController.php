<?php
/**
 * Help page controller
 *
 * @category   Social Optimization
 * @package    Gigya_Socialize
 * @author     Eyal Peleg <epeleg@gmail.com>
 * @copyright  Copyright (c) 2010 Gigya (http://Gigya.com)
 * @license    http://opensource.org/licenses/gpl-license.php  GNU General Public License (GPL)
 */
class Gigya_Socialize_IndexController extends Mage_Core_Controller_Front_Action
{
	public function indexAction()
	{
		$this->getResponse()->setRedirect(Mage::helper('socialize')->getWikiPageUrl());
		//$this->loadLayout()->renderLayout();
		//$this->getResponse()
	}
	
}