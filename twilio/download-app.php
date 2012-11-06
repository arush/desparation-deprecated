<?php
	/* Send an SMS using Twilio. You can run this file 3 different ways:
	 *
	 * - Save it as sendnotifications.php and at the command line, run 
	 *        php sendnotifications.php
	 *
	 * - Upload it to a web host and load mywebhost.com/sendnotifications.php 
	 *   in a web browser.
	 * - Download a local server like WAMP, MAMP or XAMPP. Point the web root 
	 *   directory to the folder containing this file, and load 
	 *   localhost:8888/sendnotifications.php in a web browser.
	 */

	// Step 1: Download the Twilio-PHP library from twilio.com/docs/libraries, 
	// and move it into the folder containing this file.
	require "../lib/Twilio/Services/Twilio.php";
	require_once('magento-twilio.php');

	// Step 2: set our AccountSid and AuthToken from www.twilio.com/user/account
	$AccountSid = "ACe27c18b2600c4d14980fc5549e4c9cdb";
	$AuthToken = "b9eb1a0107f7455059ec3ad46a3cfaf7";

	// Step 3: instantiate a new Twilio Rest Client
	$client = new Services_Twilio($AccountSid, $AuthToken);

	// Step 4: make an array of people we know, to send them a message. 
	// Feel free to change/add your own phone number and name here.
	$people = array(
		$_POST["mobile"] => "User"
		// "+447917138230"
		// "+14158675310" => "Boots",
		// "+14158675311" => "Virgil",
	);

	// Step 5: Loop over all our friends. $number is a phone number above, and 
	// $name is the name next to it
	foreach ($people as $number => $name) {
		if($email = isPayingCustomer($number)) {

			$message1 = "(1/3) M.A.L.E. here. I have your number linked to: " . $email . ", and looks like you are ready to test our order-by-mobile system.";

			$sms1 = $client->account->sms_messages->create(

			// Step 6: Change the 'From' number below to be a valid Twilio number 
			// that you've purchased, or the (deprecated) Sandbox number
				"442033222520", 

				// the number we are sending to - Any phone number
				$number,

				// the sms body
				$message1
			);

			$message2 = "(2/3) but before we release the app, I'll just send txts instead of push notifications, so we can get your feedback on what to build in the app.";

			$sms2 = $client->account->sms_messages->create(

			// Step 6: Change the 'From' number below to be a valid Twilio number 
			// that you've purchased, or the (deprecated) Sandbox number
				"442033222520", 

				// the number we are sending to - Any phone number
				$number,

				// the sms body
				$message2
			);

			$message3 = "(3/3) Your first reminder will arrive by txt soon. All will be explained. As always call BRANDiD support on 0203 322 2882 with your feedback. Over & Out.";

			$sms3 = $client->account->sms_messages->create(

			// Step 6: Change the 'From' number below to be a valid Twilio number 
			// that you've purchased, or the (deprecated) Sandbox number
				"442033222520", 

				// the number we are sending to - Any phone number
				$number,

				// the sms body
				$message3
			);
			$done = array("status" => "1", "message" => "Success! Check your txt messages for further instructions.");
			echo json_encode($done);

		} else {
			$sms = $client->account->sms_messages->create(

			// Step 6: Change the 'From' number below to be a valid Twilio number 
			// that you've purchased, or the (deprecated) Sandbox number
				"442033222520", 

				// the number we are sending to - Any phone number
				$number,

				// the sms body
				"M.A.L.E. here. Looks like you don't have a plan yet. You'll need to set one up at getbrandid.com first, then try and download the app again."
			);

			// Display a confirmation message on the screen
			$done = array("status" => "2", "message" => "Looks like you haven't purchased from BRANDiD before. You'll need to do that first, then come back and get the app.");
			echo json_encode($done);
		}

		

		
	}