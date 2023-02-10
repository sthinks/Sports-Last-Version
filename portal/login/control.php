<?php
// **PREVENTING SESSION HIJACKING**
// Prevents javascript XSS attacks aimed to steal the session ID
ini_set('session.cookie_httponly', 1);

// **PREVENTING SESSION FIXATION**
// Session ID cannot be passed through URLs
ini_set('session.use_only_cookies', 1);

// Uses a secure connection (HTTPS) if possible
ini_set('session.cookie_secure', 1);
session_start();
require __DIR__ . "/session.php";
require __DIR__ . "/../inc/_db.php";
require __DIR__ . "/consts.php";
if($_SERVER["REQUEST_METHOD"] == "POST"){
    if(is_logged_in()) {
        if($_SESSION["portal_departman_text"] == Roles::call_center) {
            echo '<script>window.location.href="https://www.sportsinternational.com.tr/portal/call-center";</script>';
        } else if($_SESSION["portal_departman_text"] == Roles::branch) {
            echo '<script>window.location.href="https://www.sportsinternational.com.tr/portal/branch";</script>';
        } else {
            echo '<script>window.location.href="https://www.sportsinternational.com.tr/portal/report";</script>';
        }
    } else {
        $mail = filter_input(INPUT_POST, "mail", FILTER_VALIDATE_EMAIL);
        $password = filter_input(INPUT_POST, "password");
        $hashed_password = hash("sha256", $password);
        $db->where("email", $mail);
        $user = $db->getOne("users");
        if($db->count !== 1) {
            echo "<div class='alert alert-danger'>Kullanıcı bulunamadı.</div>";
        } else if($hashed_password !== $user["sifre"]){
            echo "<div class='alert alert-danger'>Hatalı mail ya da şifre.</div>";
        } else {
            $_SESSION["portal_tam_isim"] = $user["tam_isim"];
            $_SESSION["portal_email"] = $user["email"];
            $_SESSION["portal_departman"] = $user["departman"];
            $_SESSION["portal_id"] = $user["id"];
            $_SESSION["portal_departman_text"] = trim($user["departman_text"]);
            $_SESSION["portal_tesis"] = (int) $user["tesis"];
            $db->where("id", $user["tesis"]);
            $fetch = $db->getOne("tesisler");
            $_SESSION["portal_tesis_name"] = $fetch["tesis"];
            echo "<div class='alert alert-success'>Başarı ile giriş yaptınız, yönlendiriliyorsunuz...</div>";
            if($user["departman_text"] == Roles::call_center) {
                echo '<script>window.location.href="https://www.sportsinternational.com.tr/portal/call-center";</script>';
            } else if($user["departman_text"] == Roles::branch) {
                echo '<script>window.location.href="https://www.sportsinternational.com.tr/portal/branch";</script>';
            } else if($user["departman_text"] == Roles::report) {
                echo '<script>window.location.href="https://www.sportsinternational.com.tr/portal/report";</script>';
            } else {
                session_destroy();
                exit(print("<div class='alert alert-danger'>Bilinmeyen kullanıcı rolü!</div>"));
            }
        }
    }
} else {
    http_response_code(405);
}
