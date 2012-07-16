<?php

class Arush_OrderComplete_Helper_Data extends Mage_Core_Helper_Abstract {

	/**
     * 
     * 
     * @param 
     * @return array ($picUrl, $fullname)
     */


	public function getReferrerDetails() {

	}

	/**
     * 
     * 
     * @param -
     * @return boolean
     */


	public function isCouponAvailable() {
		// check if a recurly coupon is available to use
	}


	/**
     * 
     * 
     * @param coupon name
     * @param discount (The dollar or percentage amount that will be subtracted from the cost of a subscription.)
     * @param lifespan (Single Use / Forever / Limited Time)
     * @param constraints (Limit to Plans / Max Redemptions / Redeem-by Date)
     * @param Hosted Payments Page Description
     * @param Invoice Description
     * @return string recurly coupon code
     */

	public function createRecurlyReferralCoupon() {
		// create a coupon and return it's code
	}


	/**
     * 
     * 
     * @param referrer (magento customer object)
     * @return boolean
     */

	public function isEligibleForDiscount() {
		// check if referrer is eligible for referral discount this month

		// get number of invitations available for each 30 days
		// $invites = ;

		// check if referrer has used more than [invitations available] since his last payment
	}

	public function applyReferrerDiscount() {
		// get discount amount
		// create credit in referrer's recurly account

		// record successful referral in kissmetrics

	}
}
?>