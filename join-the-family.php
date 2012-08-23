<?php

// if (isset($_POST) && isset($_SERVER['PHP_AUTH_USER'])) {


	/* Check API key */
    // if ($apiKey == $_SERVER['PHP_AUTH_USER']) {

		$to = "jobs@getbrandid.com";
		$subject = "Test mail";
		$message = "Hello! This is a simple email message.";
		$from = "someonelse@example.com";
		$headers = "From:" . $from;
		mail($to,$subject,$message,$headers);


        $retval = array('status' => 'success', 'message' => 'M.A.L.E. here, I\'ve sent your application through to Arush, thanks for applying.');
		$json = json_encode($retval);

		echo $json;  


    // } else {
    //     Header("HTTP/1.1 403 Access denied");
    //     $data = array('error' => 'Nice try, asshole.');
    //     echo $data;
    // }

// } else {
// 	$sorry = array();
// 	$sorry['computer says'] = 'no';
// 	echo json_encode($sorry);
// }


?>