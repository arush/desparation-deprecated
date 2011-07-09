<?php

class TBT_RewardsReferral_Block_Customer_Referral extends Mage_Core_Block_Template
{
    public function _prepareLayout()
    {
        parent::_prepareLayout();
        $referred = Mage::getResourceModel('rewardsref/referral_collection')
            ->addClientFilter(Mage::getSingleton('rewards/session')->getCustomerId());
        $this->setReferred($referred);
        $pager = $this->getLayout()->createBlock('page/html_pager', 'rewardsref.referral')
            ->setCollection($this->getReferred());
        $this->setChild('pager', $pager);
        $this->getReferred()->load();

        return $this;
        //return parent::_prepareLayout();
    }
    
    public function hasPredictedSignupPoints(){
        return !$this->getPredictedSignupPoints()->isEmpty();
    }
    public function getPredictedSignupPoints(){
        return Mage::getModel('rewardsref/referral_signup')->getTotalReferralPoints();
    }
    
    public function hasPredictedFirstOrderPoints(){
        return !$this->getPredictedFirstOrderPoints()->isEmpty();
    }
    public function getPredictedFirstOrderPoints(){
        return Mage::getModel('rewardsref/referral_firstorder')->getTotalReferralPoints();
    }

    public function getAccumulatedReferralPoints($referralobj){
        $p = Mage::getModel('rewardsref/referral_signup')->getAccumulatedPoints($referralobj);
        return $p;
    }

    public function getPagerHtml()
    {
        return $this->getChildHtml('pager');
    }
}