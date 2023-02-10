<?php
require __DIR__ . "/_db.php";
global $db;

class Records
{
    /**
     * Retrieve AC records
     * @param int $sube_id : Şube ID değeri
     * @param int $status_id : Status ID değeri
     * @return array: Belirtilen şube ve durum için AC kayıtlarını getirir.
     */
    public static function retrieveAC($sube_id, $status_id)
    {
        global $db;
        $db->where("tesis_adi", $sube_id);
        if($status_id !== 0){
            $db->where("status_id", $status_id);
        }
        $db->orderBy("updated_at", "asc");
        return $db->get("ac");
    }

    /**
     * WI kayıtlarını getirir
     * @param int $sube_id : Şube ID değeri
     * @param int $status_id : Status id değeri
     * @return array: Belirtilen şube ve durum için WI kayıtlarını getirir
     */
    public static function retrieveWI($sube_id, $status_id)
    {
        global $db;
        $db->where("tesis_adi", $sube_id);
        if($status_id !== 0){
            $db->where("status_id", $status_id);
        }
        $db->orderBy("updated_at", "asc");
        return $db->get("wi");
    }

    /**
     * AC raporunu getirir
     * @param $baslangic_tarihi
     * @param $bitis_tarihi
     * @param null $sube_id
     * @return array
     */
    public static function retrieveACReport($baslangic_tarihi, $bitis_tarihi, $sube_id = -1, $creator = -1)
    {
        global $db;
        $baslangic_tarihi = self::toMysqlDate($baslangic_tarihi);
        $bitis_tarihi = self::toMysqlDate($bitis_tarihi);
        $db->where("DATE(updated_at)", array($baslangic_tarihi, $bitis_tarihi), "BETWEEN");
        if ($sube_id != -1) {
            $db->where("tesis_adi", $sube_id);
        }
        if ($creator != -1 || $creator != "-1") {
            $db->where('tam_isim', $creator);
        }
        $db->orderBy("updated_at", "asc");
        return $db->get("ac_report");
    }

    /**
     * WI raporunu getirir
     * @param $baslangic_tarihi
     * @param $bitis_tarihi
     * @param null $sube_id
     * @return array
     */
    public static function retrieveWIReport($baslangic_tarihi, $bitis_tarihi, $sube_id = -1)
    {
        global $db;
        $baslangic_tarihi = self::toMysqlDate($baslangic_tarihi);
        $bitis_tarihi = self::toMysqlDate($bitis_tarihi);
        $db->where("DATE(updated_at)", array($baslangic_tarihi, $bitis_tarihi), "BETWEEN");
        if ($sube_id != -1) {
            $db->where("tesis_adi", $sube_id);
        }
        $db->orderBy("updated_at", "asc");
        return $db->get("wi");
    }

    /**
     * Convert submitted date to timestamp
     * @param $date
     * @return false|string|null
     */
    private static function toMysqlDate($date)
    {
        if ($date == '1970-01-01' || $date == '0000-00-00' || $date == '00.00.0000' || $date == '0000-00-00 00:00:00' || empty($date)) {
            $output = null;
        } else {

            $output = date('Y-m-d', strtotime(str_replace('/', '.', $date)));
        }
        return $output;
    }
}