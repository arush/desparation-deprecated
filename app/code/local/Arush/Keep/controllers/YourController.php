<?php

class Arush_Keep_YourController extends Mage_Core_Controller_Front_Action
{
    public function pantsonAction(){
        if (isset($_POST)) {

            // $ip = $_SERVER['REMOTE_ADDR'];
            
                // get post parameters
                if (isset($_POST['email_ad'])) {
                    $from = $_POST['email_ad'];
                }
                else {
                    print_r(json_encode(
                        array(
                            'status' => 0,
                            'state' => "failed",
                            'message' => "Sorry dude, you need to provide an email_ad parameter."
                            )
                    ));
                    die;
                }
            /* Check API key */
            // if ($apiKey == $_SERVER['PHP_AUTH_USER']) {


                //subscribe setting MALE to false, because this is not coming from MALE
                $api = Mage::helper('subscribe')->applyJob($from);

                if ($api->errorCode){
                    
                    print_r(json_encode(
                        array(
                            'status' => $api->errorCode,
                            'state' => "failed",
                            'message' => $api->errorMessage
                            )
                    ));

                } else {
                    
                    print_r(json_encode(
                        array(
                            'status' => 1,
                            'state' => "success",
                            'message' => "M.A.L.E. here, check your email for the next step."
                            )
                    ));
            
                }


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


    }
}