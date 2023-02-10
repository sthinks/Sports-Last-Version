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
require __DIR__ . "/login/session.php";
require __DIR__ . "/inc/_db.php";
require __DIR__ . "/login/consts.php";
if(is_logged_in()) {
    if($_SESSION["portal_departman_text"] == Roles::call_center) {
        echo '<script>window.location.href="https://www.sportsinternational.com.tr/portal/call-center";</script>';
    } else if($_SESSION["portal_departman_text"] == Roles::branch) {
        echo '<script>window.location.href="https://www.sportsinternational.com.tr/portal/branch";</script>';
    } else {
        echo '<script>window.location.href="https://www.sportsinternational.com.tr/portal/report";</script>';
    }
} else {
    echo '<script>window.location.href="https://www.sportsinternational.com.tr/portal/login";</script>';
}
