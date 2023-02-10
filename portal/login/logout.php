<?php
session_start();
if ($_SESSION["portal_id"]) {
    session_destroy();
}
header("Location: https://www.sportsinternational.com.tr/portal/login/index.php");
