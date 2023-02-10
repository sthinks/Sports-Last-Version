<?php
// Database yüklemesi
require __DIR__ . "/../inc/_db.php";
// Sms fonksiyonları
require __DIR__ . "/../sms/inc.php";
// Yetki kontrolü
include __DIR__ . "/../login/branch_redirect.php";

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
    $musteri_email = filter_input(INPUT_POST, "musteri_email");
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
    $birim_aciklamasi = filter_input(INPUT_POST, "birim_aciklamasi");
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
        // Eğer alınmamışsa kayda başlayalım
        $db->startTransaction();
        $db_now = convertToMysqlDate($_POST["at_what"]);
        $ac_array = array(
            "tesis_adi" => $tesis_adi_id,
            "musteri" => $musteri,
            "musteri_email" => "",
            "musteri_telefon" => $musteri_telefon,
            "yeni_yenileme" => $yeni_yenileme_id,
            "talep_aciklamasi" => $talep_aciklamasi,
            "created_at" => $db_now,
            "updated_at" => $db_now,
            "birim_aciklamasi" => $birim_aciklamasi,
            "randevu_alindi_mi" => $randevu_alindi_mi,
            "show_durumu" => $show_durumu,
            "nereden_duydunuz" => $nereden_duydunuz_id,
            "status_id" => $status_id,
        );
        $ac_id = $db->insert("ac", $ac_array);
        $ac_status_array = array(
            "ac_id" => $ac_id,
            "user_id" => $_SESSION["portal_id"],
            "status_id" => $status_id,
            "done_at" => $db_now
        );
        $ac_status_id = $db->insert("ac_status", $ac_status_array);
        if($ac_id && $ac_status_id) {
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