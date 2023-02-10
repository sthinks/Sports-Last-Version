<?php
require __DIR__ . "/../login/ac_redirect.php";
?>
<!DOCTYPE html>
<html lang="tr">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Sports International">
    <meta name="author" content="Socialthinks">

    <title>Sports International</title>

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
            href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
            rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">
    <link rel="shortcut icon" href="http://www.sportsinternational.com.tr/images/ico/favicon.ico">

</head>

<body id="page-top">

<!-- Page Wrapper -->
<div id="wrapper">

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
                <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                    <i class="fa fa-bars"></i>
                </button>



                <div class="sidebar-brand-text mx-3 mt-6">Sports International | AC Formu Kaydet</div>

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
                            <a class="dropdown-item" data-toggle="modal" data-target="#logoutModal">
                                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Çıkış Yap
                            </a>
                        </div>
                    </li>
                    <!-- Dropdown - User Information -->
                    <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                         aria-labelledby="userDropdown">
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                        </a>
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Settings
                        </a>
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Activity Log
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
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
            <!-- /.container-fluid -->

        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white">
            <div class="container my-auto">
                <div class="copyright text-center my-auto">
                    <span>Copyright &copy; Sports International <span id="year"></span></span>
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
                <h5 class="modal-title" id="exampleModalLabel">Emin misiniz?</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">Çıkış yap butonuna basarak oturumu sonlandırabilirsiniz.</div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Vazgeç</button>
                <a class="btn btn-primary" href="https://www.sportsinternational.com.tr/portal/login/logout.php">Çıkış Yap</a>
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

<!-- Ajax Form -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>


<script>
    function ac_formu_gonder() {
        var query = $('#gonderilenform').serialize();
        $.ajax({
            type: 'POST',
            url: './new_record.php',
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
<script>
    $(document).ready(function () {
        $('#telefonNumarasi').inputmask("05999999999");
    });
</script>

<!-- Dynamic Year -->
<script>
    document.getElementById("year").innerHTML = new Date().getFullYear();
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
</body>

</html>
