<?php
error_reporting(E_ALL);
require_once __DIR__ . "/MysqliDb.php";
require_once __DIR__ . "/dbObject.php";

// db instance
$db = new MysqliDb (Array (
                'host' => 'localhost',
                'username' => 'sportsin_sportsdb',
                'password' => 'M.}hX=Tb.Y&7',
                'db'=> 'sportsin_sports_portal',
                'port' => 3306,
                // 'prefix' => 'my_',
                'charset' => 'utf8'));

// enable class autoloading
dbObject::autoload("models");
if (!function_exists('convertToMysqlDate')) {
  function convertToMysqlDate($date)
    {
        if ($date == '1970-01-01' || $date == '0000-00-00' || $date == '00.00.0000' || $date == '0000-00-00 00:00:00' || empty($date)) {
            $output = null;
        } else {

            $output = date('Y-m-d', strtotime(str_replace('/', '.', $date)));
        }
        return $output;
    }
}


