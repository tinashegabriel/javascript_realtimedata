<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://154.119.80.10:3010/_QUERIES/console/log',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));

$data = curl_exec($curl);

curl_close($curl);

$error_data = array(
  "message"=>"Failed to connect to the external server"
);

if ($data ==TRUE){
  $response=array(
    'status' => 1, 
    'arrayLogs'=>$data
 );
echo json_encode($response,true);
}else if($data ==FALSE) {
  $response=array(
    'status' => 503
 );
echo json_encode($data,true);
}



