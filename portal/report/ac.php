<?php
// Database yüklemesi
require __DIR__ . "/../inc/_db.php";
global $db;
// Yetki kontrolü
include __DIR__ . "/../login/report_redirect.php";
error_reporting(E_ALL); ini_set('display_errors', TRUE); ini_set('display_startup_errors', TRUE);
// Bugünün tarihi
$dater = new DateTime();
$todayDate = $dater->format("d/m/Y");
$dater->modify("+1 day");
$tomorrowDate = $dater->format("d/m/Y");
?>
<!DOCTYPE html>
<html lang="tr">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Sports Intenational">
    <meta name="author" content="Socialthinks">

    <title>AC Raporu Al</title>

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
    <link rel="stylesheet" href="css/bootstrap-datepicker.min.css">

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
            <a class="nav-link collapsed" href="ac.php">
                <i class="fas fa-fw fa-folder"></i>
                <span>AC Raporu Al</span>
            </a>

        </li>

        <!-- Nav Item - Utilities Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="wi.php">
                <i class="fas fa-fw fa-folder"></i>
                <span>WI Raporu Al</span>

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

                <div>
                    <b>AC Raporu Al</b>
                </div>



                <!-- Topbar Navbar -->
                <ul class="navbar-nav ml-auto">




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
                <!-- DataTales Example -->
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">AC RAPORU ALMA</h6>
                    </div>
                    <div class="card-body">

                        <form id="quicksearch" method="post" onsubmit="talep_search(); return false;">
                            <div class="row">
                                <div class="col-3">
                                    <input name="start_date" value="<?php echo $todayDate; ?>" required autocomplete="off" class="form-control datepicker" placeholder="Başlangıç Tarihi" data-date-format="dd/mm/yyyy" data-date-end-date="0d">
                                </div>
                                <div class="col-3">
                                    <input name="end_date" value="<?php echo $tomorrowDate; ?>" required autocomplete="off" class="form-control datepicker" placeholder="Bitiş Tarihi" data-date-format="dd/mm/yyyy" data-date-end-date="0d">
                                </div>
                                <div class="col-3">
                                    <select class="form-select form-control" name="tesis_adi" id="tesis_adi" required>
                                        <option value="-1" selected>Tümünü Göster</option>
                                        <?php
                                        $db->where("id", array(4, 7, 10, 11), "NOT IN");
                                        foreach ($db->get("tesisler") as $tesis){
                                            echo sprintf("<option value='%d'>%s</option>", $tesis["id"], $tesis["tesis"]);
                                        }
                                        ?>
                                    </select>
                                </div>
                                <div class="col-3">
                                    <select class="form-select form-control" name="tam_isim" id="tam_isim" required>
                                        <option value="-1" selected>Tümünü Göster</option>
                                        <?php
                                        foreach ($db->rawQuery("SELECT DISTINCT tam_isim from ac_report") as $creator){
                                            echo sprintf("<option value='%s'>%s</option>", $creator["tam_isim"], $creator["tam_isim"]);
                                        }
                                        ?>
                                    </select>
                                </div>
                                <div class="col-3">
                                    <button type="submit" class="btn btn-primary">Sonuçları Listele</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <!-- /.container-fluid -->
            <!--  Form sonuçları  -->
            <div id="acreportresponse"></div>
            <!-- /Form sonuçları  -->

        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white">
            <div class="container my-auto">
                <div class="copyright text-center my-auto">
                    <span>Copyright © Sports International <span id="year">/span></span>
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
                <a class="btn btn-primary" href="https://www.sportsinternational.com.tr/portal/login/logout.php">Oturumu Kapat</a>
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
    document.getElementById("year").innerHTML = new Date().getFullYear();
</script>

<!-- Date Picker -->
<script src="js/bootstrap-datepicker.min.js"></script>
<script>


$('.datepicker').datepicker({
    format: 'dd/mm/yyyy',

});

</script>

<!-- Excel PDF Export -->
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.6.5/js/dataTables.buttons.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/1.6.5/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.6.5/js/buttons.print.min.js"></script>


<!-- Ajax Form -->
<script>
    function talep_search() {
        let query = $('#quicksearch').serialize();
        $.ajax({
            type: 'POST',
            url: './ac_bring.php',
            data: query,
            success: function (cevap) {
                $('#acreportresponse').html(cevap);

            }
        });
        return false;
    }
</script>

</body>

</html>
