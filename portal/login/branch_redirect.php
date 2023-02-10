<?php
require __DIR__ . "/consts.php";
session_start();
function is_logged_in(){
    if(isset($_SESSION["portal_tam_isim"]) && strlen($_SESSION["portal_tam_isim"]) > 1){
        return true;
    } else {
        return false;
    }
}
if(!is_logged_in()) {
    header("Location: https://www.sportsinternational.com.tr/portal/login/");
    exit();
}
if($_SESSION["portal_departman_text"] == Roles::call_center){
    exit(header("Location: https://www.sportsinternational.com.tr/portal/call-center"));
}
elseif($_SESSION["portal_departman_text"] == Roles::report){
    exit(header("Location: https://www.sportsinternational.com.tr/portal/report"));
}
