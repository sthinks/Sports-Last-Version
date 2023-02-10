<?php
// Database yüklemesi
require __DIR__ . "/../inc/_db.php";

// Yetki kontrolü
include __DIR__ . "/../login/branch_redirect.php";

// Check if this WI exists
$requested_ac = isset($_GET["ac"]) ? intval($_GET["ac"]) : Null;
$check_if_exists  = $db->where("id", $requested_ac);
$retrieved_ac = $db->getOne("ac");
if($db->count < 1 || $retrieved_ac["tesis_adi"] != $_SESSION["portal_tesis"]){
    exit(http_response_code(405));
}
?>
<!DOCTYPE html>
<html lang="tr">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Sports Intenational">
    <meta name="author" content="Socialthinks">

    <title>Sports International - AC raporu düzenleme</title>

    <!-- Custom fonts for this template -->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
            href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
            rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

    <!-- Custom styles for this page -->
    <link href="vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link rel="shortcut icon" href="http://www.sportsinternational.com.tr/images/ico/favicon.ico">

</head>

<body id="page-top">

<!-- Page Wrapper -->
<div id="wrapper">

    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.php">
            <div class="sidebar-brand-icon rotate-n-15">
            </div>
            <div class="sidebar-brand-text mx-3">Sports International</div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">





        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
               aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-fw fa-folder"></i>
                <span>AC Raporu</span>
            </a>
            <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Durumu:</h6>
                    <a class="collapse-item" href="ac.php?status=0">Tümü</a>
                    <?php
                    $status = $db->get("durumkodu");
                    foreach ($status as $item){
                        printf('<a class="collapse-item" href="ac.php?status=%d">%s</a>', $item["id"], $item["durum"]);
                    }
                    ?>
                </div>
            </div>
        </li>

        <!-- Nav Item - Utilities Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseUtilities"
               aria-expanded="false" aria-controls="collapseUtilities">
                <i class="fas fa-fw fa-folder"></i>
                <span>WI Raporu</span>
            </a>
            <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                 data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Durumu:</h6>
                    <a class="collapse-item" href="wi.php?status=0">Tümü</a>
                    <?php
                    $db->where("id", 8, "!=");
                    $wiStatus = $db->get("durumkodu");
                    foreach ($wiStatus as $item){
                        printf('<a class="collapse-item" href="wi.php?status=%d">%s</a>', $item["id"], $item["durum"]);
                    }
                    ?>
                </div>
            </div>
            <a class="nav-link collapsed" href="wi_raporu_ekle.php"
               aria-expanded="true" aria-controls="collapsePages">
                <i class="fas fa-check-square"></i>
                <span>WI Formu Ekle</span>
            </a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

        <!-- Main Content -->
        <div id="content">

            <!-- Topbar -->
            <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <!-- Sidebar Toggle (Topbar) -->
                <form class="form-inline">
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>
                </form>

                <!-- Topbar Search -->
                <div>
                    <b><?php echo $_SESSION["portal_tesis_name"]; ?> Şubesi</b>
                </div>

                <!-- Topbar Navbar -->
                <ul class="navbar-nav ml-auto">

                    <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                    <li class="nav-item dropdown no-arrow d-sm-none">
                        <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-search fa-fw"></i>
                        </a>
                        <!-- Dropdown - Messages -->
                        <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                             aria-labelledby="searchDropdown">
                            <form class="form-inline mr-auto w-100 navbar-search">
                                <div class="input-group">
                                    <input type="text" class="form-control bg-light border-0 small"
                                           placeholder="Search for..." aria-label="Search"
                                           aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button">
                                            <i class="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>


                    <!-- Nav Item - User Information -->
                    <li class="nav-item dropdown no-arrow">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="mr-2 d-none d-lg-inline text-gray-600 small">Sayın <?php echo $_SESSION["portal_tam_isim"]; ?></span>
                        </a>
                        <!-- Dropdown - User Information -->
                        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                             aria-labelledby="userDropdown">
                            <a class="dropdown-item" href="sifre_guncelle.php">
                                    <i class="fas fa-lock fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Şifre güncelleme
                            </a>
                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Çıkış Yap
                            </a>
                        </div>
                    </li>

                </ul>

            </nav>
            <!-- End of Topbar -->


            <!-- Begin Page Content -->
            <div class="container-fluid">

                <!-- Page Heading -->
                <form id="acform" onsubmit="ac_formu_gonder(); return false;">
                    <input type="hidden" name="id" value="<?php echo $requested_ac; ?>">
                    <div class="form-group">
                        <label for="tesis_adi">Tesis Adı</label>
                        <select class="form-control col-md-3" name="tesis_adi" id="tesis_adi" required readonly>
                            <option disabled selected value="">Tesis Adı</option>
                            <?php
                            foreach($db->get("tesisler") as $tesis){
                                $selected_tesis = ($tesis["id"] == $retrieved_ac["tesis_adi"]) ? "selected" : "";
                                echo "<option value='{$tesis["tesis"]}'{$selected_tesis}>{$tesis["tesis"]}</option>";
                            }
                            ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label  for="adı_soyadı">Adı Soyadı</label>
                        <input value="<?php echo $retrieved_ac["musteri"]; ?>" class="form-control col-md-3" id="adı_soyadı" name="musteri" placeholder="Adı Soyadı"
                                  required readonly></input>
                    </div>
                    <div class="form-group">
                        <label  for="exampleFormControlInput1">Telefon Numarası</label>
                        <input value="<?php echo $retrieved_ac["musteri_telefon"]; ?>" title="Numarayı 05xxxxxxxxx şeklinde giriniz." pattern="[0-9]{11}" type="telephone"
                               name="musteri_telefon" class="form-control col-md-3" id="telefonNumarasi"
                               placeholder="Telefon Numarası" minlength="11" required readonly>
                    </div>
                    <div class="form-group">
                        <label  for="exampleFormControlInput1">Alternatif Telefon Numarası</label>
                        <input value="<?php echo $retrieved_ac["musteri_alternatif_telefon"]; ?>" pattern="[0-9]{11}" type="telephone"
                               name="musteri_alternatif_telefon" class="form-control col-md-3" id="alt_telefonNumarasi"
                               placeholder="Alternatif Telefon Numarası" minlength="11" required readonly>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Email</label>
                        <input type="email" value="<?php echo $retrieved_ac["musteri_email"]; ?>" name="musteri_email" class="form-control col-md-3"
                               id="exampleFormControlInput1" placeholder="E-Mail" required readonly>
                    </div>
                    <div class="form-group">
                        <label for="yeni_yenileme">Yeni/Yenileme</label>
                        <select class="form-control col-md-3" name="yeni_yenileme" id="yeni_yenileme" required readonly>
                            <option disabled selected value="">Yeni/Yenileme</option>
                            <?php
                            foreach($db->get("uyelik_tipi") as $tip){
                                $selected_uyelik = ($tip["id"] == $retrieved_ac["yeni_yenileme"]) ? "selected":"";
                                echo "<option value='{$tip["tip"]}'{$selected_uyelik}>{$tip["tip"]}</option>";
                            }
                            ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="mt-3" for="talep_aciklamasi">Talep Açıklaması</label>
                        <textarea class="form-control col-md-6" id="talep_aciklamasi" rows="3" name="talep_aciklamasi"
                                  required readonly><?php echo $retrieved_ac["talep_aciklamasi"]; ?></textarea>
                    </div>
                    <div class="form-group">
                        <label class="mt-3" for="birim_aciklamasi">Birim Açıklaması</label>
                        <select class="form-control col-md-3" name="birim_aciklamasi" id="birim_aciklamasi" required>
                            <option disabled selected value="">Lütfen birim seçiniz.</option>
                            <?php
                            $db->orderBy('user', 'asc');
                            foreach($db->get("birimler") as $birim){
                                $current_unit_code = ($birim["user"] == $retrieved_ac["birim_aciklamasi"]) ? " selected" : "";
                                echo "<option value='{$birim["user"]}'{$current_unit_code}>{$birim["user"]}</option>";
                            }
                            ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="yeni_yenileme">Randevu alındı mi?</label>
                        <select class="form-control col-md-3" name="randevu_alindi_mi" id="randevu_alindi_mi" required>
                            <option disabled selected value="">Randevu alındı mı?</option>
                            <option value="Evet" <?php if($retrieved_ac["randevu_alindi_mi"] == "Evet"){echo " selected";} ?>>Evet</option>
                            <option value="Hayır" <?php if($retrieved_ac["randevu_alindi_mi"] == "Hayır"){echo " selected";} ?>>Hayır</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="yeni_yenileme">Show Durumu</label>
                        <select class="form-control col-md-3" name="show_durumu" id="show_durumu" required>
                            <option disabled selected value="">Show Durumu</option>
                            <option value="Show Oldu" <?php if($retrieved_ac["show_durumu"] == "Show Oldu"){echo " selected";} ?>>Show Oldu</option>
                            <option value="Show Olmadı" <?php if($retrieved_ac["show_durumu"] == "Show Olmadı"){echo " selected";} ?>>Show Olmadı</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="durum_kodu">Durum Kodu</label>
                        <select class="form-control col-md-3" name="status_code" id="status_code" required>
                            <option disabled selected value="">Durum Kodu</option>
                            <?php
                            foreach($db->get("durumkodu") as $durum){
                                $current_status_code = ($retrieved_ac["status_id"] == $durum["id"]) ? " selected" : "";
                                echo "<option value='{$durum["durum"]}'{$current_status_code}>{$durum["durum"]}</option>";
                            }
                            ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="nereden_duydunuz">Bizi Nereden Duydunuz</label>
                        <select class="form-control col-md-3" name="nereden_duydunuz" id="nereden_duydunuz" required>
                            <option disabled selected value="Bizi nerden duydunuz">Bizi nerden duydunuz</option>
                            <?php
                            foreach($db->get("nerden_duydunuz") as $nerden){
                                $current_where_code = ($retrieved_ac["nereden_duydunuz"] == $nerden["id"]) ? " selected" : "";
                                echo "<option value='{$nerden["nerden"]}'{$current_where_code}>{$nerden["nerden"]}</option>";
                            }
                            ?>
                        </select>
                    </div>

                    </br>
                    <button type="submit" id="buton" class="btn btn-primary">Gönder</button>
                </form>
            <div id="updateacresponse"></div>
            </div>
            <!-- /.container-fluid -->


        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white mt-3">
            <div class="container my-auto">
                <div class="copyright text-center my-auto">
                    <span>Copyright © Sports International <span id="year"></span></span>
                </div>
            </div>
        </footer>
        <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

</div>
<!-- End of Page Wrapper -->

<!-- Scroll to Top Button-->
<a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
</a>

<!-- Logout Modal-->
<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Oturumu kapatmak istediğinizden emin misiniz?</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">Çıkış yapmak istiyorsanız "Oturumu Kapat" butonuna tıklayın</div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">İptal</button>
                <a class="btn btn-primary" href="http://www.sportsinternational.com.tr/portal/login/logout.php">Oturumu Kapat</a>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap core JavaScript-->
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- Core plugin JavaScript-->
<script src="vendor/jquery-easing/jquery.easing.min.js"></script>

<!-- Custom scripts for all pages-->
<script src="js/sb-admin-2.min.js"></script>

<!-- Page level plugins -->
<script src="vendor/datatables/jquery.dataTables.min.js"></script>
<script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

<!-- Page level custom scripts -->
<script src="js/demo/datatables-demo.js"></script>

<!-- Dynamic Year -->
<script>

    $("#year").text(new Date().getFullYear());
</script>

<script>
    function ac_formu_gonder() {
        let query = $('#acform').serialize();
        $.ajax({
            type: 'POST',
            url: './edit_ac.php',
            data: query,
            success: function (cevap) {
                $('#updateacresponse').html(cevap);
            }
        });
        return false;
    }


</script>

<!-- Phone Mask -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.3/jquery.inputmask.min.js"></script>
<script>
    $(document).ready(function () {
        $('#musteri_telefon').inputmask("05999999999");
    });
</script>

</body>

</html>