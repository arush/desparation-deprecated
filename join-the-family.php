<?php

if (isset($_POST)) {
	echo 'we\'re taking a break from hiring at the minute, come back later';
	$ip = $_SERVER['REMOTE_ADDR'];

		// get post parameters
		$from = $_POST['email_ad'];
		$twitter = $_POST['twitter_handle'];
		$github = $_POST['github_username'];
		$message = 'My IP is: ' . $ip . 'Github: ' . $github . ' Twitter: ' . $twitter;

	/* Check API key */
    // if ($apiKey == $_SERVER['PHP_AUTH_USER']) {

		$to = "founders@getbrandid.com";
		$subject = "Job Application via M.A.L.E.";
		// $from = "someonelse@example.com";
		$headers = "From:" . $from . "\r\n" .
					"Cc:" . $from;
		
		mail($to,$subject,$message,$headers);

		$email = array();
		$email['to'] = $to;
		$email['subject'] = $subject;
		$email['message'] = $message;
		$email['from'] = $from;

        $retval = array('status' => 'success', 'response' => 'M.A.L.E. here, I\'ve sent your application through, thanks. Remember to tweet @getbrandid to follow up.', 'payload' => $email);
		$json = json_encode($retval);

		// echo $json;  


 //    // } else {
 //    //     Header("HTTP/1.1 403 Access denied");
 //    //     $data = array('error' => 'Nice try, asshole.');
 //    //     echo $data;
 //    // }

} else {
	$sorry = array();
	$sorry['status'] = 'sorry';
	$sorry['computer says'] = 'no';
	echo json_encode($sorry);
}


?>