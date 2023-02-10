<?php
require __DIR__ . "/../login/report_redirect.php";
?>
<!DOCTYPE html>
<html lang="tr">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Sports Intenational">
    <meta name="author" content="Socialthinks">

    <title>Şifre Güncelleme</title>

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
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
            <div class="sidebar-brand-icon rotate-n-15">
            </div>
            <div class="sidebar-brand-text mx-3">Sports International</div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">




        <!-- Nav Item - Pages Collapse Menu -->


        <li class="nav-item">
            <a class="nav-link " href="ac.php">
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

                <form id="reset_password" onsubmit="reset_password(); return false;">
              <div class="form-group row">
                <label class="col-4 col-form-label" for="old_password">Eski şifreniz</label>
                <div class="col-8">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="fa fa-lock"></i>
                      </div>
                    </div>
                    <input id="old_password" name="old_password" placeholder="Eski şifreniz" type="password" class="form-control" aria-describedby="old_passwordHelpBlock" required="required">
                  </div>
                  <span id="old_passwordHelpBlock" class="form-text text-muted">Şu an kullandığınız şifreyi yazınız.</span>
                  <span id="old_password_error"></span>
                </div>
              </div>
              <div class="form-group row">
                <label for="new_password" class="col-4 col-form-label">Yeni Şifre</label>
                <div class="col-8">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="fa fa-lock"></i>
                      </div>
                    </div>
                    <input id="new_password" name="new_password" placeholder="Yeni şifreniz" type="password" class="form-control" aria-describedby="new_passwordHelpBlock" required="required">
                  </div>
                  <span id="new_passwordHelpBlock" class="form-text text-muted">Yeni kullanmak istediğiniz şifreyi yazınız.</span>
                </div>
              </div>
              <div class="form-group row">
                <label for="new_password_repeat" class="col-4 col-form-label">Yeni Şifre</label>
                <div class="col-8">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="fa fa-lock"></i>
                      </div>
                    </div>
                    <input id="new_password_repeat" name="new_password_repeat" placeholder="Yeni şifre" type="password" aria-describedby="new_password_repeatHelpBlock" required="required" class="form-control">
                  </div>
                  <span id="new_password_repeatHelpBlock" class="form-text text-muted">Yeni kullanmak istediğiniz şifreyi tekrar yazınız.</span>
                </div>
              </div>
              <div class="form-group row">
                <div class="offset-4 col-8">
                  <button name="submit" type="submit" class="btn btn-primary">Gönder</button>
                </div>
              </div>
            </form>
            <div id="formresponse"></div>

            </div>


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
<script src="vendor/chart.js/Chart.min.js"></script>




<!-- Page level custom scripts -->
<script src="js/demo/datatables-demo.js"></script>

<!-- Dynamic Year -->
<script>

$("#year").text(new Date().getFullYear());
</script>
<script>
    function reset_password() {
        let query = $('#reset_password').serialize();
        let new_password = $("#new_password");
        let new_password_repeat = $("#new_password_repeat");
        if(new_password.val() !== new_password_repeat.val()){
            $("#formresponse").html("<div class='alert alert-danger'>Şifreler uyuşmuyor.</div>");
            return false;
        }
        $.ajax({
            type: 'POST',
            url: '../login/password_reset.php',
            data: query,
            success: function (cevap) {
                $('#formresponse').html(cevap);
            }
        });
        return false;
    }
</script>


<!-- Phone Mask -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.3/jquery.inputmask.min.js"></script>


</body>

</html>
