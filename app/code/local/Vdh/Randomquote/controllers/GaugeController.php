<?php
class Vdh_Randomquote_GaugeController extends Mage_Core_Controller_Front_Action {

	public function pointsAction() {
		$invitesRemaining = Mage::helper('randomquote')->getInvitesRemaining();
		$return = array(
			"links"		=> 1,
			"people"	=> 50-$invitesRemaining,
			"read"		=> 1,
			"toppages"	=> array(),
			"direct"	=> 50-$invitesRemaining,
			"visits"	=> 50-$invitesRemaining,
			"subscr"	=> 1,
			"pages"		=> 1,
			"search"	=> 3,
			"crowd"		=> 0,
			"domload"	=> 1000.0,
			"visit"		=> 20.0,
			"write"		=> 0,
			"idle"		=> 2,
			"internal"	=> 0,
			"social"	=> 0,
			"new"		=> 50-$invitesRemaining
		);
		
		echo json_encode($return);

//		echo '{"links": 10, "people": 41, "read": 4, "toppages": [{"path": "\/a_vc\/2011\/11\/mobile-gatekeepers.html", "visitors": 8}, {"pecho ath": "\/", "visitors": 5}, {"path": "\/a_vc\/2011\/07\/explicit-groups-vs-implicit-groups.html", "visitors": 3}, {"path": "\/a_vc\/2011\/11\/kindle-fire.html", "visitors": 2}, {"path": "\/a_vc\/2011\/11\/continuous-feedback.html", "visitors": 2}], "direct": 14, "visits": 41, "subscr": 1, "pages": 23, "search": 3, "crowd": 0, "domload": 6000.0, "visit": 60.0, "write": 0, "idle": 37, "internal": 6, "social": 7, "new": 10}';
	
	}
}


