<?php
// Database yüklemesi
require __DIR__ . "/../inc/_db.php";
// Sms fonksiyonları
require __DIR__ . "/../sms/inc.php";
// Yetki kontrolü
include __DIR__ . "/../login/branch_redirect.php";

if($_SERVER["REQUEST_METHOD"] == "POST") {
    // İlgilenen satış personeli
    $ilgilenen_satis_personeli = filter_input(INPUT_POST, "ilgilenen_satis_personeli");
    // Müşteri bilgileri
    $musteri = filter_input(INPUT_POST, "musteri");
    $musteri_telefon = filter_input(INPUT_POST, "musteri_telefon");
    if(isset($_POST["musteri_email"]) && strlen($_POST["musteri_email"]) > 1){
        $musteri_email = filter_input(INPUT_POST, "musteri_email", FILTER_VALIDATE_EMAIL);
    } else {
        $musteri_email = "";
    }

    // Bizi nerden duydunuz
    // Foreign key olduğu için ID bulmamız lazım.
    $bizi_nerden_duydunuz = filter_input(INPUT_POST, "bizi_nerden_duydunuz");
    $db->where("nerden", trim($bizi_nerden_duydunuz));
    $bizi_nerden_duydunuz_fetch = $db->getOne("nerden_duydunuz");
    if($db->count !== 1) {
        exit(print('<div class="alert alert-danger">Nerden duydunuz seçeneği veritabanında bulunamadı.</div>'));
    }
    $bizi_nerden_duydunuz_id = $bizi_nerden_duydunuz_fetch["id"];

    // Durum kodunu alıyoruz
    // Foreign key olduğu için ID bulmamız lazım.
    $selected_status_text = filter_input(INPUT_POST, "status_id");
    $db->where("durum", trim($selected_status_text));
    $wi_status_text = $db->getOne("durumkodu");
    if($db->count !== 1) {
        exit(print('<div class="alert alert-danger">Seçtiğiniz durum kodu veritabanında bulunamadı.</div>'));
    }
    $wi_status_id = $wi_status_text["id"];

    // Eğer kayıttan sonra sms yollanması istendiyse öyle yapalım.
    $sms_yolla = filter_input(INPUT_POST, "sms_yolla");
    $sms_yolla = ($sms_yolla == "on") ? 1 : 0;

    // Daha önce bu müşteri için kayıt alınmış mı onu kontrol edelim.
    $db->where("musteri_telefon", $musteri_telefon);
    $ac_count = $db->getValue("ac", "count(*)");

    $db->where("musteri_telefon", $musteri_telefon);
    $wi_count = $db->getValue ("wi", "count(*)");

    if($ac_count > 0) {
        $db->where("musteri_telefon", $musteri_telefon);
        $exists_ac_record = $db->getOne("ac");
        $exists_ac_record_status_id = $exists_ac_record["status_id"];
        $db->where("id", $exists_ac_record_status_id);
        $exists_ac_record_status_code = $db->getOne("durumkodu");
        $exists_ac_record_status_text = $exists_ac_record_status_code["durum"];
        echo '<div class="alert alert-danger">Daha önce bu müşteri için AC kaydı alınmıştır. Mevcut durumu: <b>' . $exists_ac_record_status_text . '</b></div>';
    } else if($wi_count > 0){
        $db->where("musteri_telefon", $musteri_telefon);
        $exists_wi_record = $db->getOne("wi");
        $exists_wi_record_status_id = $exists_wi_record["status_id"];
        $db->where("id", $exists_wi_record_status_id);
        $exists_wi_record_status_code = $db->getOne("durumkodu");
        $exists_wi_record_status_text = $exists_wi_record_status_code["durum"];
        echo '<div class="alert alert-danger">Daha önce bu müşteri için WI kaydı alınmıştır. Mevcut durumu: <b>' . $exists_wi_record_status_text . '</b></div>';
    } else {
        // Eğer alınmamışsa kayda başlayalım
        $db->startTransaction();
        $db_now = $db->now();
        $wi_array = array(
            "tesis_adi" => $_SESSION["portal_tesis"],
            "musteri" => $musteri,
            "ilgilenen_satis_personeli" => $ilgilenen_satis_personeli,
            "musteri_email" => $musteri_email,
            "musteri_telefon" => $musteri_telefon,
            "status_id" => $wi_status_id,
            "bizi_nerden_duydunuz" => $bizi_nerden_duydunuz_id,
            "created_at" => $db_now,
            "updated_at" => $db_now,
        );
        $wi_id = $db->insert("wi", $wi_array);
        $wi_status_array = array(
            "wi_id" => $wi_id,
            "user_id" => $_SESSION["portal_id"],
            "status_id" => $wi_status_id,
            "done_at" => $db_now
        );
        $wi_status_id = $db->insert("wi_status", $wi_status_array);
        if($wi_id && $wi_status_id) {
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
            echo "<script>$('#wiform').trigger('reset');</script>";
        } else {
            echo '<div class="alert alert-danger">Teknik bir sorun oluştu.</div>';
            error_log($db->getLastError() . "\n", 3, __DIR__ . "/new_wi.log");
            $db->rollback();
        }
    }
} else {
    http_response_code(405);
}