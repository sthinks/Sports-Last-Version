<?php
/**
 * Define values
 */
define('collector_id', '1ge0myy4');
define('api_key', base64_encode("7977673525:40eg24u59gubp34iwrz1hcifse8unn"));
define('if_etk_is_not_checked', -1);
define('dev_mode', false);
/**
 * Get the bearer token
 * @return string
 */
function getBearerToken(){
    $curl = curl_init();
    $options = array(
        CURLOPT_URL => 'https://ivtapi.mobildev.in/auth',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 5,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_HTTPHEADER => array(
            sprintf("Authorization: Basic %s", api_key)
        ),
    );
    curl_setopt_array($curl, $options);
    $response = json_decode(curl_exec($curl), true);
    if(curl_error($curl) !== ""){
        header("Location: http://www.sportsinternational.com.tr");
    }
    curl_close($curl);
    return $response["access_token"];
}

/**
 * Check if we already have permissions for this user
 * @param $bearer: the bearer token
 * @param $phone int: telephone number
 * @return boolean
 */
function checkIfGetPermissionBefore($bearer, $phone){
    $ch = curl_init();
    $options = array(
        CURLOPT_URL => sprintf("https://ivtapi.mobildev.in/check?key=%d", $phone),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_HTTPHEADER => array(
            sprintf("Authorization: Bearer %s", $bearer)
        )
    );
    curl_setopt_array($ch, $options);
    $response = json_decode(curl_exec($ch), true);
    if(curl_error($ch) !== ""){
        header("Location: http://www.sportsinternational.com.tr");
    }
    curl_close($ch);
    if(isset($response["Success"]) || $response["msisdn"]["call"]["text"] == "İzinsiz"){
        return false;
    }
    return true;
}

/**
 * @param $bearer: Bearer token
 * @param $firstname: First name
 * @param $lastname: Last name
 * @param $number int: 11 length
 * @param $email: mail
 * @param $etk boolean: true or false?
 * @return bool|string
 */
function sendSms($bearer, $firstname, $lastname, $number, $email, $etk){
    $etk = ($etk) ? 1 : if_etk_is_not_checked;
    $body = array(
        "firstName" => $firstname,
        "lastName" => $lastname,
        "msisdn" => (string) $number,
        "email" => $email,
        "accountType" => 0,
        "language" => "tr",
        "etk" => array(
            "msisdn" => $etk,
            "email" => $etk,
            "share" => $etk,
            "call" => $etk
        ),
        "kvkk" => array(
            "process" => 1,
            "share" => 1,
            "international" => 1
        ),
    );
    $ch = curl_init();
    $options = array(
        CURLOPT_URL => sprintf("https://ivtapi.mobildev.in/data/%s", collector_id),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_ENCODING => '',
        CURLOPT_POSTFIELDS => json_encode($body),
        CURLOPT_HTTPHEADER => array(sprintf("Authorization: Bearer %s", $bearer), 'Content-Type: application/json')
    );
    curl_setopt_array($ch, $options);
    $response = json_decode(curl_exec($ch), true);
    if(curl_error($ch) !== ""){
        header("Location: http://www.sportsinternational.com.tr");
    }
    curl_close($ch);
    return isset($response["dataId"]) ? $response["dataId"] : false;
}

/**
 * Split name and surname
 * @param $fullname string: Fullname
 * @return array
 */
function splitFullName($fullname){
    $fullname = explode(' ', $fullname);
    $surname = (count($fullname) > 1) ? end($fullname) : "";
    if(count($fullname) > 1) array_pop($fullname);
    $fullname = join(" ", $fullname);
    return array($fullname, $surname);
}

function verifySms($dataId, $bearer_token, $phone, $verify_code){
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://ivtapi.mobildev.in/data/verify/$dataId",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS =>"{\n\"item\" : \"$phone\",\n\"code\" : \"$verify_code\"\n}",
        CURLOPT_HTTPHEADER => array(
            "Authorization: Bearer $bearer_token",
            "Content-Type: text/plain",
        ),
    ));
    $response = json_decode(curl_exec($curl), true);
    curl_close($curl);
    return !isset($response["Success"]);
}

/**
 * Check if number is valid
 * @param $phone
 * @return bool
 */
function checkIfNumberIsValid($phone){
    $head = substr($phone, 0, 2);
    if(strlen($phone) !== 11 || $head !== "05"){
        return false;
    }
    return true;
}

