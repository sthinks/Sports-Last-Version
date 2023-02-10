<?php
session_start();
require __DIR__ . "/session.php";
require __DIR__ . "/../inc/_db.php";
require __DIR__ . "/../inc/class.phpmailer.php";
require __DIR__ . "/../inc/class.pop3.php";
require __DIR__ . "/../inc/class.smtp.php";
require __DIR__ . "/consts.php";
global $db;
function rand_string($length) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return substr(str_shuffle($chars),0,$length);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (is_logged_in()) {
        if ($_SESSION["portal_departman_text"] == Roles::call_center) {
            echo '<script>window.location.href="https://www.sportsinternational.com.tr/portal/call-center";</script>';
        } else if ($_SESSION["portal_departman_text"] == Roles::branch) {
            echo '<script>window.location.href="https://www.sportsinternational.com.tr/portal/branch";</script>';
        } else {
            echo '<script>window.location.href="https://www.sportsinternational.com.tr/portal/report";</script>';
        }
    } else {
        $email = filter_input(INPUT_POST, "mail", FILTER_VALIDATE_EMAIL);
        $db->where("email", $email);
        if($db->getValue("uyeler", "count(*)") !== 1){
            echo '<div class="alert alert-danger">Kullanıcı bulunamadı</div>';
        } else {
            $db->where("email", $email);
            $user = $db->getOne("uyeler");
            $tam_isim = $user['tam_isim'];
            $new_password = rand_string(10);
            $hashed_password = hash("sha256", $new_password);
            $array = array("sifre" => $hashed_password);
            $db->startTransaction();
            $db->where("email", $email);
            $id = $db->update("uyeler", $array);
            $mailBaslik = "$tam_isim - Sports International Portal - Şifre Sıfırlama";

            $body = "<html>
			<head>
		  <title>Şifre Sıfırlama Talebi</title>
		  <body>\n";
            $body .= "<center><p>Sayın, <b>$tam_isim</b></p>
		<p>Şifreniz <b>$new_password</b> olarak güncellenmiştir.
		Bu şifreyi kullanarak işlemlerinizi yapabilirsiniz.</p></center>";

            $body .= "</body></head></html>";
            $mail = new PHPMailer;

            $mail->IsSMTP();
            $mail->Host = "smtp.gmail.com";

            // used only when SMTP requires authentication
            $mail->SMTPAuth = true;
            $mail->Username = 'olalik@socialthinks.com';
            $mail->Password = 'Sthinks123';
            $mail->Port = 587;

            $mail->CharSet = 'utf-8';
            try {
                $mail->setFrom('info@sportsinternational.com.tr', 'info (Sports International)');
            } catch (phpmailerException $e) {
            }
            $mail->AddAddress($email, $tam_isim);
            $mail->addReplyTo($email, $tam_isim);
            $mail->setLanguage('tr', '/language');

            // Set email format to HTML
            $mail->Subject = $mailBaslik;
            $mail->msgHTML($body);
            if (!$mail->send() || !$id) {
                $db->rollback();
                echo "<div class=\"alert alert-danger\"><strong>Başarısız! </strong> Şifre güncellenemedi.</div>" . $mail->ErrorInfo;
            } else {
                $db->commit();
                echo "<div class=\"alert alert-success\"><strong>Tebrikler! </strong> Şifre başarıyla güncellenmiştir.</div>";
                echo "<script>$('#forgotpassword').reset();</script>";
            }
        }
    }
} else {
    http_response_code(405);
}
