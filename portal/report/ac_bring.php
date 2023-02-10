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
$form_tam_isim = filter_input(INPUT_POST, "tam_isim");
$acResults = Records::retrieveACReport($start_date, $end_date, $tesis_adi, $form_tam_isim);
$text = <<<EOD
<!-- Begin Page Content -->
    <div class="container-fluid">
        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">$start_date - $end_date tarihleri için AC Raporu</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTables" width="100%" cellspacing="0">
                        <thead>
                        <tr>
                            <th>Kaydı Oluşturan Kişi</th>
                            <th>Oluşturma Tarihi</th>
                            <th>Oluşturma Saati</th>
                            <th>Tesis Adı</th>
                            <th>Müşteri</th>
                            <th>Cep Telefonu(Müşteri)</th>
                            <th>Yeni/Yenileme</th>
                            <th>Talep Açıklaması</th>
                            <th>Birim Açıklaması</th>
                            <th>Randevu Alındı mı?</th>
                            <th>Show Durumu</th>
                            <th>Durum Kodu</th>
                            <th>Nereden Duydunuz</th>
                            <th>Yapılan İşlemler</th>
                        </tr>
                        </thead>
                        <tbody>
EOD;

foreach ($acResults as $item) {
    // Tarih
    $date = new DateTime($item["updated_at"]);
    $print_date = $date->format("d/m/Y H:i:s");
    $print_date = explode(" ", $print_date);
    $split_date = $print_date[0];
    $split_hours = $print_date[1];
    // Şube
    $branch = (int) $item["tesis_adi"];
    $db->where("id", $branch);
    $sql_branch = $db->getOne("tesisler");
    $print_branch = $sql_branch["tesis"];

    // Tam ad soyad
    $print_full_name = $item["musteri"];

    // Telefon numarası
    $print_phone_number = $item["musteri_telefon"];

    // Yeni - yenileme
    $new_renew = (int) $item["yeni_yenileme"];
    $db->where("id", $new_renew);
    $sql_new_renew = $db->getOne("uyelik_tipi");
    $print_new_renew = $sql_new_renew["tip"];

    // Talep açıklama
    $print_description = $item["talep_aciklamasi"];

    // Birim açıklama
    $print_unit_description = $item["birim_aciklamasi"];

    // Randevu alındı mı?
    $print_whether_reservation = $item["randevu_alindi_mi"];

    // Show durumu?
    $print_show = $item["show_durumu"];

    // Statü
    $status = (int) $item["status_id"];
    $db->where("id", $status);
    $sql_status = $db->getOne("durumkodu");
    $print_status = $sql_status["durum"];

    // Nereden duydunuz?
    $where = (int) $item["nereden_duydunuz"];
    $db->where("id", $where);
    $sql_where = $db->getOne("nerden_duydunuz");
    $print_where = $sql_where["nerden"];

    // kaydı oluşturan kişi 
    $print_creator = $item["tam_isim"];

    // yapılan işlemler
    $db->join('users u', 'u.id = a.user_id', 'INNER');
    $db->join('durumkodu d', 'd.id = a.status_id', 'INNER');
    $db->where('a.ac_id', $item['id']);
    $operations = $db->get ("ac_status a", null, "a.id, u.tam_isim, d.durum, a.done_at");
    $print_operations = "";
    foreach($operations as $operation) {
        $done_at = (new DateTime($operation['done_at']))->format('d/m/Y H:i:s');
        $print_operations .= sprintf("<b>%s</b> <br /> %s <br /> %s<br /><br />", $operation['durum'], $operation['tam_isim'],  $done_at); 
    }
    
    $text .= <<<EOD
                        <tr>
                            <td>$print_creator</td>
                            <td>$split_date</td>
                            <td>$split_hours</td>
                            <td>$print_branch</td>
                            <td>$print_full_name</td>
                            <td>$print_phone_number</td>
                            <td>$print_new_renew</td>
                            <td>$print_description</td>
                            <td>$print_unit_description</td>
                            <td>$print_whether_reservation</td>
                            <td>$print_show</td>
                            <td>$print_status</td>
                            <td>$print_where</td>
                            <td>$print_operations</td>
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
        $('#dataTables').DataTable( {
            dom: 'Bfrtip',
            bSort : false,
            buttons: [
                {
                    extend: 'excelHtml5',
                    text: 'Excel Raporu Al',
                    filename: function(){
                        const excelOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        const excelToday = new Date();
                        return 'AC Raporu' + ' - ' + (excelToday.toLocaleDateString('tr-TR', excelOptions));
                    },
                },
            ]


        } );
    } );
</script>";