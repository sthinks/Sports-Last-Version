<?php
session_start();
function is_logged_in(){
    if(isset($_SESSION["portal_tam_isim"]) && strlen($_SESSION["portal_tam_isim"]) > 1){
        return true;
    } else {
        return false;
    }
}