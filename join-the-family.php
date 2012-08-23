<?php

if (isset($_POST) && isset($_SERVER['PHP_AUTH_USER'])) {


		// get post parameters
		$from = $_POST['email_ad'];
		$message = $_POST['your_message'];
		$twitter = $_POST['twitter_handle'];
		$message += '\n\n' + 'Twitter: ' + $twitter;

	/* Check API key */
    // if ($apiKey == $_SERVER['PHP_AUTH_USER']) {

		$to = "founders@getbrandid.com";
		$subject = "Job Application via M.A.L.E.";
		// $from = "someonelse@example.com";
		$headers = "From:" . $from;
		
		mail($to,$subject,$message,$headers);

		$email = array();
		$email['to'] = $to;
		$email['subject'] = $subject;
		$email['message'] = $message;
		$email['from'] = $from;
		$email['headers'] = $headers;

        $retval = array('status' => 'success', 'response' => 'M.A.L.E. here, I\'ve sent your application through to Arush, thanks for applying. Remember to tweet @getbrandid to follow up.', 'payload' => $email);
		$json = json_encode($retval);

		echo $json;  


    // } else {
    //     Header("HTTP/1.1 403 Access denied");
    //     $data = array('error' => 'Nice try, asshole.');
    //     echo $data;
    // }

} else {
	$sorry = array();
	$sorry['status'] = 'sorry';
	$sorry['computer says'] = 'no';
	echo json_encode($sorry);
}


?>