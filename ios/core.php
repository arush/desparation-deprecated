<?php

require_once('core.php');

header('Content-Type: text/plain');

ini_set('display_errors',true);
include('../app/Mage.php');
Mage::setIsDeveloperMode(true);

Mage::app(); //pass in store code if you like
date_default_timezone_set('Europe/London'); // add your locale - thanks to @benmarks from BlueAcorn for this


function chargeCustomer($accountCode) {

	$charge = new Recurly_Adjustment();
	$charge->account_code = $accountCode;
	$charge->description = 'Test charge';
	$charge->unit_amount_in_cents = 5000; // £50.00
	$charge->currency = 'GBP';
	$charge->quantity = 1;
	$charge->accounting_code = 'test';
	$charge->create();
}


?>