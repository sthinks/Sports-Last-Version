<?php
require __DIR__ . "/session.php";
if(!is_logged_in()) {
    header("Location: https://www.sportsinternational.com.tr/portal/");
    exit();
}
function redirect($location) {
    header("Location: $location");
    exit();
}
