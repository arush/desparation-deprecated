<?php

class Arush_Facebook_ChannelController extends Mage_Core_Controller_Front_Action
{
    /**
     * Create the channel.html content for the Facebook JavaScript SDK
     */
    public function indexAction()
    {
        $cache_expire = 60*60*24*365; //1 year
		$this->getResponse()
				->setHeader('Pragma', 'public', true)
				->setHeader('Cache-Control', 'max-age='.$cache_expire, true)
				->setHeader('Expires', gmdate('D, d M Y H:i:s', time()+$cache_expire), true)
				;
        $this->getResponse()->setBody('<script src="//connect.facebook.net/en_US/all.js"></script>');
    }

}