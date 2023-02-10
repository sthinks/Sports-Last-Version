<?php
require __DIR__ . "/../inc/_db.php";
include __DIR__ . "/../login/branch_redirect.php";
// Mail kütüphaneleri
require __DIR__ . "/../inc/class.phpmailer.php";
require __DIR__ . "/../inc/class.pop3.php";
require __DIR__ . "/../inc/class.smtp.php";
if($_SERVER["REQUEST_METHOD"] !== "POST") {
    die(sprintf("%s Method not allowed", $_SERVER["REQUEST_METHOD"]));
} else {
    $id = (int) $_POST["id"];
    // Birim açıklaması
    $birim_aciklamasi = filter_input(INPUT_POST, "birim_aciklamasi");
    $db->where('user', $birim_aciklamasi);
    $get_unit = $db->getOne('birimler');
    // Eski birim açıklaması
    $db->where('id', $id);
    $old_unit = $db->getOne('ac');
    $old_unit = $old_unit['birim_aciklamasi'];
    
    // Mail yollama işlevleri
    $mailBaslik = "Sports International Portal - AC Kaydı Birim Alarmı - $birim_aciklamasi";

    $body = "<html>
		<head>
	  <title>Yeni AC Kaydı alınmıştır.</title>
	  <body>\n";
    $body .= "<center><p>Sayın, $birim_aciklamasi</p>
	    <p>Şubeniz adına birim açıklaması olarak size atanan yeni bir AC kaydı oluşturulmuştur.</p></center>";
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
    $mail->AddAddress($get_unit["email"], $get_unit["user"]);
    $mail->setLanguage('tr', '/language');
    // Set email format to HTML
    $mail->Subject = $mailBaslik;
    $mail->msgHTML($body);
    // Randevu alındı mı alınmadı mı? Sadece Evet ya da Hayır olabilir.
    $randevu_alindi_mi = filter_input(INPUT_POST, "randevu_alindi_mi");
    if(!in_array($randevu_alindi_mi, array("Evet", "Hayır"))){
        exit(print('<div class="alert alert-danger">Geçersiz randevu alındı mı değeri!</div>'));
    }
    // Show durumu. Sadece Show Oldu ya da Show Olmadı değerlerini alabilir.
    $show_durumu = filter_input(INPUT_POST, "show_durumu");
    if(!in_array($show_durumu, array("Show Oldu", "Show Olmadı"))){
        exit(print('<div class="alert alert-danger">Geçersiz show durumu değeri!</div>'));
    }
    // Nereden duydunuz
    // Foreign key olacağı için ID lazım.
    $nereden_duydunuz = filter_input(INPUT_POST, "nereden_duydunuz");
    $db->where("nerden", trim($nereden_duydunuz));
    $nereden_duydunuz_fetch = $db->getOne("nerden_duydunuz");
    if($db->count < 1){
        exit(print('<div class="alert alert-danger">Geçersiz "nereden duydunuz" değeri!</div>'));
    }
    $nereden_duydunuz_id = $nereden_duydunuz_fetch["id"];
    // Durum kodu
    $status_code = filter_input(INPUT_POST, "status_code");
    $db->where("durum", $status_code);
    $status_code_fetch = $db->getOne("durumkodu");
    if($db->count < 1){
        exit(print('<div class="alert alert-danger">Geçersiz durum kodu</div>'));
    }
    $status_id = $status_code_fetch["id"];
    // Last status id
    $db->where("id", $id);
    $lastStatus = $db->getOne("ac");
    $lastStatusId = $lastStatus["status_id"];
    // Start transaction
    $db->startTransaction();
    $db_now = $db->now();
    // Updating AC
    $ac_update_array = array(
        "birim_aciklamasi" => $birim_aciklamasi,
        "randevu_alindi_mi" => $randevu_alindi_mi,
        "show_durumu" => $show_durumu,
        "nereden_duydunuz" => $nereden_duydunuz_id,
        "status_id" => $status_id,
        "updated_at" => $db_now
    );
    // Eğer durum kodu değişmemişse
    if($lastStatusId == $status_id) {
        $ac_update_array = array(
        "birim_aciklamasi" => $birim_aciklamasi,
        "randevu_alindi_mi" => $randevu_alindi_mi,
        "show_durumu" => $show_durumu,
        "nereden_duydunuz" => $nereden_duydunuz_id,
        "status_id" => $status_id,
        );
    }
    $db->where("id", $id);
    $updated_ac = $db->update("ac", $ac_update_array);
    // Inserting AC Status
    $ac_status_insert_array = array(
        "ac_id" => $id,
        "user_id" => $_SESSION["portal_id"],
        "status_id" => $status_id,
        "done_at" => $db_now
    );
    if($lastStatusId != $status_id) {
        $inserted_ac_status = $db->insert("ac_status", $ac_status_insert_array);
    } else {
        $inserted_ac_status = true;
    }
    if($inserted_ac_status && $updated_ac){
        if($old_unit != $birim_aciklamasi){
            $mail->send();
        }
        $db->commit();
        echo '<div class="alert alert-success">AC kaydı başarıyla güncellenmiştir.</div>';
        echo "<script>var timer = setTimeout(function() {
            window.location='./ac.php?status={$status_id}'
        }, 1500)";
    } else {
        $db->rollback();
        echo '<div class="alert alert-danger">Teknik bir sorun oluştu.</div>';
        error_log($db->getLastError() . "\n", 3, __DIR__ . "/edit_ac.log");
    }
}