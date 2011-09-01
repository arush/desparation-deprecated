<?php

class TBT_Rewardsinstore_Helper_Version extends Mage_Core_Helper_Abstract
{
    public function getRewardsVersion()
    {
        return Mage::getConfig()->getNode('modules/TBT_Rewards/version');
    }
}
