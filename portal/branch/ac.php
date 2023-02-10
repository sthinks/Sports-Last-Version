<?php
// Database yüklemesi
require __DIR__ . "/../inc/_db.php";

// Kayıtların yüklemesi
require __DIR__ . "/../inc/Records.php";

// Yetki kontrolü
include __DIR__ . "/../login/branch_redirect.php";

// Get the status
$requested_status = isset($_GET["status"]) ? intval($_GET["status"]) : Null;
$check_if_exists  = $db->where("id", $requested_status);
$check_if_exists_query = $db->get("durumkodu");
if($db->count < 1 && $requested_status !== 0){
    exit(http_response_code(404));
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

    <title>Sports International - <?php echo $check_if_exists_query[0]["durum"]; ?></title>

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
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseTwo"
               aria-expanded="false" aria-controls="collapseTwo">
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
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
               aria-expanded="true" aria-controls="collapseUtilities">
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



                <!-- DataTales Example -->
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <?php
                        $db->where("id", $requested_status);
                        $selected_status = $db->getOne("durumkodu");
                        ?>
                        <h6 class="m-0 font-weight-bold text-primary"><?php echo $selected_status["durum"]; ?></h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                <tr>
                                    <th>Son işlem Tarihi</th>
                                    <th>Durumu</th>
                                    <th>Müşteri</th>
                                    <th>Müşteri Cep Telefonu</th>
                                    <th>İşlem Yap</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php
                                $records = Records::retrieveAC($_SESSION["portal_tesis"], $requested_status);
                                foreach($records as $record){
                                    $formated_updated_at = new DateTime($record["updated_at"]);
                                ?>
                                <tr>
                                    <td><?php echo $formated_updated_at->format("d/m/Y"); ?></td>
                                    <td><?php $db->where("id", $record["status_id"]); $_record = $db->getOne("durumkodu"); echo $_record["durum"]; ?></td>
                                    <td><?php echo $record["musteri"]; ?></td>
                                    <td><?php echo $record["musteri_telefon"]; ?></td>
                                    <td><a href="ac_raporu_duzenle.php?ac=<?php echo $record["id"]; ?>" class="btn btn-secondary btn-xs">Düzenle</a></td>
                                </tr>
                                <?php
                                }
                                ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            <!-- /.container-fluid -->

        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white">
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
    document.getElementById("year").innerHTML = new Date().getFullYear();
</script>

</body>

</html>