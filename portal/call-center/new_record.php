<?php
// Database yüklemesi
require __DIR__ . "/../inc/_db.php";
// Sms fonksiyonları
require __DIR__ . "/../sms/inc.php";
// Yetki kontrolü
include __DIR__ . "/../login/ac_redirect.php";
// Mail kütüphaneleri
require __DIR__ . "/../inc/class.phpmailer.php";
require __DIR__ . "/../inc/class.pop3.php";
require __DIR__ . "/../inc/class.smtp.php";

if($_SERVER["REQUEST_METHOD"] == "POST") {
    // Tesis adı
    // Foreign key olduğu için ID almamız lazım.
    $tesis_adi = filter_input(INPUT_POST, "tesis_adi");
    $db->where("tesis", trim($tesis_adi));
    $tesis_adi_fetch = $db->getOne("tesisler");
    if($db->count !== 1) {
        exit(print('<div class="alert alert-danger">Tesis adı bulunamadı.</div>'));
    }
    $tesis_adi_id = $tesis_adi_fetch["id"];
    // Müşteri bilgileri
    $musteri = filter_input(INPUT_POST, "musteri");
    $musteri_telefon = filter_input(INPUT_POST, "musteri_telefon");
    $musteri_alternatif_telefon = filter_input(INPUT_POST, "musteri_alternatif_telefon");
    if(isset($_POST["musteri_email"]) && strlen($_POST["musteri_email"]) > 1){
        $musteri_email = filter_input(INPUT_POST, "musteri_email", FILTER_VALIDATE_EMAIL);
    } else {
        $musteri_email = "";
    }
    // Üyelik tipi
    // Foreign key olduğu için ID bulmamız lazım.
    $yeni_yenileme = filter_input(INPUT_POST, "yeni_yenileme");
    $db->where("tip", trim($yeni_yenileme));
    $yeni_yenileme_fetch = $db->getOne("uyelik_tipi");
    if($db->count !== 1) {
        exit(print('<div class="alert alert-danger">Üyelik tipi bulunamadı.</div>'));
    }
    $yeni_yenileme_id = $yeni_yenileme_fetch["id"];
    // Talep açıklaması
    $talep_aciklamasi = filter_input(INPUT_POST, "talep_aciklamasi");
    // Eğer kayıttan sonra sms yollanması istendiyse öyle yapalım.
    $sms_yolla = filter_input(INPUT_POST, "sms_yolla");
    $sms_yolla = ($sms_yolla == "on") ? 1 : 0;
    // Daha önce bu müşteri için kayıt alınmış mı onu kontrol edelim.
    $db->where("musteri_telefon", $musteri_telefon);
    $ac_count = $db->getValue ("ac", "count(*)");
    $db->where("musteri_telefon", $musteri_telefon);
    $wi_count = $db->getValue ("wi", "count(*)");
    if($ac_count > 0) {
        $db->where("musteri_telefon", $musteri_telefon);
        $exists_ac_record = $db->getOne("ac");
        $exists_ac_record_status_id = $exists_ac_record["status_id"];
        $db->where("id", $exists_ac_record_status_id);
        $exists_ac_record_status_code = $db->getOne("durumkodu");
        $exists_ac_record_status_text = $exists_ac_record_status_code["durum"];
        echo '<div class="alert alert-danger">Daha önce bu müşteri AC kaydı alınmıştır. Mevcut durumu: <b>' . $exists_ac_record_status_text . '</b></div>';
    } else if($wi_count > 0){
        $db->where("musteri_telefon", $musteri_telefon);
        $exists_wi_record = $db->getOne("wi");
        $exists_wi_record_status_id = $exists_wi_record["status_id"];
        $db->where("id", $exists_wi_record_status_id);
        $exists_wi_record_status_code = $db->getOne("durumkodu");
        $exists_wi_record_status_text = $exists_wi_record_status_code["durum"];
        echo '<div class="alert alert-danger">Daha önce bu müşteri WI kaydı alınmıştır. Mevcut durumu: <b>' . $exists_wi_record_status_text . '</b></div>';
    } else {
        // ilk önce şubedeki sorumluların mail adreslerini alalım
        $db->where("tesis", $tesis_adi_id);
        $db->where("mail_notification", 1);
        $allusers = $db->get("users_mail_notification");
        // Mail yollama işlevleri
        $mailBaslik = "Sports International Portal - Yeni AC Kaydı - $musteri";

        $body = "<html>
			<head>
		  <title>Yeni AC Kaydı alınmıştır.</title>
		  <body>\n";
        $body .= "<center><p>Sayın, yetkili</p>
		    <p>Şubeniz adına yeni bir AC kaydı oluşturulmuştur, portal üzerinden bu kaydı inceleyebilirsiniz.</p></center>";
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
        foreach($allusers as $oneuser){
            $mail->AddAddress($oneuser["email"], $oneuser["tam_isim"]);
        }
        // call centerdaki çalışanlar
        $mail->AddAddress("bugse.bilikibrahimov@si.com.tr", "BUĞSE BİLİK İBRAHİMOV");
        $mail->AddAddress("dilara.atasoy@si.com.tr", "DİLARA ATASOY");
        $mail->AddAddress("elif.ates@si.com.tr", "Elif Ateş");
        $mail->AddAddress("hakan.ozturk@si.com.tr", "Hakan Öztürk");
        $mail->AddAddress('anil.erzurum@si.com.tr', 'ANIL ERZURUM');
        $mail->setLanguage('tr', '/language');
        // Set email format to HTML
        $mail->Subject = $mailBaslik;
        $mail->msgHTML($body);
        // Eğer alınmamışsa kayda başlayalım
        $db->startTransaction();
        $db_now = $db->now();
        $ac_array = array(
            "tesis_adi" => $tesis_adi_id,
            "musteri" => $musteri,
            "musteri_email" => $musteri_email,
            "musteri_telefon" => $musteri_telefon,
            "musteri_alternatif_telefon" => $musteri_alternatif_telefon,
            "yeni_yenileme" => $yeni_yenileme_id,
            "talep_aciklamasi" => $talep_aciklamasi,
            "created_at" => $db_now,
            "updated_at" => $db_now,
            "status_id" => 8,
        );
        $ac_id = $db->insert("ac", $ac_array);
        $ac_status_array = array(
            "ac_id" => $ac_id,
            "user_id" => $_SESSION["portal_id"],
            "status_id" => 8,
            "done_at" => $db_now
        );
        $ac_status_id = $db->insert("ac_status", $ac_status_array);
        if($ac_id && $ac_status_id && $mail->send()) {
            $db->commit();
            echo '<div class="alert alert-success">Kayıt başarıyla oluşturuldu.</div>';
            if($sms_yolla) {
                $bearer_token = getBearerToken();
                if(checkIfGetPermissionBefore($bearer_token, $musteri_telefon)){
                    echo '<div class="alert alert-danger">Daha önce bu telefon numarasından izin alındığı için onay yollanmadı.</div>';
                } else {
                    $splitted_full_name = splitFullName($musteri);
                    $musteri_ad = $splitted_full_name[0];
                    $musteri_soyad = $splitted_full_name[1];
                    if(sendSms($bearer_token, $musteri_ad, $musteri_soyad, $musteri_telefon, $musteri_email, 1)){
                        echo '<div class="alert alert-success">Kullanıcı telefon numarasına izin için sms gönderildi.</div>';
                    } else {
                        echo '<div class="alert alert-danger">Kullanıcıya sms yollanamadı.</div>';
                    }
                }
            }
            echo "<script>$('#gonderilenform').trigger('reset');</script>";
        } else {
            echo '<div class="alert alert-danger">Teknik bir sorun oluştu.</div>';
            error_log($db->getLastError() . $ac_id . "\n", 3, __DIR__ . "/records.log");
            $db->rollback();
        }
    }
} else {
    http_response_code(405);
}