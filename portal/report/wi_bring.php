<?php
// Database yüklemesi
require __DIR__ . "/../inc/_db.php";
global $db;

// Kayıtların yüklemesi
require __DIR__ . "/../inc/Records.php";

// Yetki kontrolü
include __DIR__ . "/../login/report_redirect.php";

if($_SERVER["REQUEST_METHOD"] !== "POST"){
    exit(http_response_code(400));
}

$start_date = filter_input(INPUT_POST, "start_date");
$end_date = filter_input(INPUT_POST, "end_date");
$tesis_adi = (int) filter_input(INPUT_POST, "tesis_adi");
$wiResults = Records::retrieveWIReport($start_date, $end_date, $tesis_adi);
$text = <<<EOD
<!-- Begin Page Content -->
    <div class="container-fluid">
        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">$start_date - $end_date tarihleri için WI Raporu</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="wiForm" width="100%" cellspacing="0">
                        <thead>
                        <tr>
                            <th>İlgilenen Satış Personeli</th>
                            <th>Oluşturma Tarihi</th>
                            <th>Oluşturma Saati</th>
                            <th>Tesis Adı</th>
                            <th>Müşteri</th>
                            <th>Cep Telefonu(Müşteri)</th>
                            <th>Durumu</th>
                            <th>Bizi Nerden Duydunuz</th>
                        </tr>
                        </thead>
                        <tbody>
EOD;

foreach ($wiResults as $i => $item) {
    // İlgilenen satış personeli
    $yazdir_ilgilenen_satis_personeli = $item["ilgilenen_satis_personeli"];

    // Oluşturma tarihi
    $olusturma_tarihi = null;
    try {
        $olusturma_tarihi = new DateTime($item["updated_at"]);
    } catch (Exception $e) {
        error_log(json_encode(array('ts' => date('d/m/Y H:i:s'), 'type' => 'exception', 'msg' => $e->getMessage(), 'file' => $e->getFile())) . PHP_EOL, 3, "/home/sportsinternatio/logs/wi_errors.log");
    }
    $yazdir_olusturma_tarihi = $olusturma_tarihi->format("d/m/Y H:i:s");
    $yazdir_olusturma_tarihi = explode(" ", $yazdir_olusturma_tarihi);
    $split_date = $yazdir_olusturma_tarihi[0];
    $split_hours = $yazdir_olusturma_tarihi[1];
    // Tesis adını alıyoruz
    $tesis_adi = (int) $item["tesis_adi"];
    $db->where("id", $tesis_adi);
    $sql_tesis_adi = $db->getOne("tesisler");
    $yazdir_tesis_adi = $sql_tesis_adi["tesis"];

    // Tam ad soyad
    $yazdir_tam_isim = $item["musteri"];

    // Telefon numarası
    $yazdir_telefon_numarasi = $item["musteri_telefon"];

    // Statü
    $status = (int) $item["status_id"];
    $db->where("id", $status);
    $sql_status = $db->getOne("durumkodu");
    $print_status = $sql_status["durum"];

    // Nereden duydunuz?
    $where = (int) $item["bizi_nerden_duydunuz"];
    $db->where("id", $where);
    $sql_where = $db->getOne("nerden_duydunuz");
    $print_where = $sql_where["nerden"];

    $text .= <<<EOD
                        <tr>
                            <td>$yazdir_ilgilenen_satis_personeli</td>
                            <td>$split_date</td>
                            <td>$split_hours</td>
                            <td>$yazdir_tesis_adi</td>
                            <td>$yazdir_tam_isim</td>
                            <td>$yazdir_telefon_numarasi</td>
                            <td>$print_status</td>
                            <td>$print_where</td>
                        </tr>
EOD;

}
$text .= <<<EOD
                        </tbody>
                    </table>
                </div>
            </div>
        </div>




    </div>
    <!-- /.container-fluid -->

</div>
<!-- End of Main Content -->
EOD;
echo $text;
echo "<script>
    $(document).ready(function() {
    $('#wiForm').DataTable( {
        dom: 'Bfrtip',
        bSort : false,
        buttons: [
            {
                extend: 'excelHtml5',
                text: 'Excel Raporu Al',
                filename: function(){
                const excelOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const excelToday = new Date();
                return 'WI Raporu' + ' - ' + (excelToday.toLocaleDateString('tr-TR', excelOptions));
            },
            },
        ]


    } );
} );

</script>";