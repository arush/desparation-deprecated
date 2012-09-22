<?php

require_once('core.php');

$response = array(
				"status"=>"1",
				"message"=>"everything is a-ok");

$json = json_encode($response);

echo $json;



?>