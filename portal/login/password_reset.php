<?php
session_start();
require __DIR__ . "/../inc/_db.php";
function is_logged_in(){
    if(isset($_SESSION["portal_tam_isim"]) && strlen($_SESSION["portal_tam_isim"]) > 1){
        return true;
    } else {
        return false;
    }
}
if(!is_logged_in()){
    exit(http_response_code(401));
}
if($_SERVER["REQUEST_METHOD"] !== "POST"){
    exit(http_response_code(403));
}
$user_id = $_SESSION["portal_id"];
$old_password = filter_input(INPUT_POST, "old_password");
$old_password_hashed = hash("sha256", $old_password);
$db->where("id", $user_id);
$db->where("sifre", $old_password_hashed);
if($db->getValue("uyeler", "count(*)") !== 1){
     exit(print("<div class='alert alert-danger'>Eski şifreyi hatalı girdiniz.</div>"));
}
$new_password = filter_input(INPUT_POST, "new_password");
$new_password_repeat = filter_input(INPUT_POST, "new_password_repeat");
if($new_password !== $new_password_repeat){
    exit(print("<div class='alert alert-danger'>Girdiğiniz şifreler uyuşmuyor.</div>"));
}
$new_password_hashed = hash("sha256", $new_password);
$array = array("sifre" => $new_password_hashed);
$db->where("id", $user_id);
if(!$db->update("uyeler", $array)){
    exit(print("<div class='alert alert-danger'>Teknik bir sorun oluştu.</div>"));
} else {
    exit(print("<div class='alert alert-success'>Şifre başarıyla güncellenmiştir.</div>"));
}