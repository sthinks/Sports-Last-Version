<?php
session_start();
if ($_SESSION["portal_id"]) {
    if ($_SESSION["portal_departman"] == 1) {
        exit(header("Location:https://www.sportsinternational.com.tr/portal/call-center"));
    } else if ($_SESSION["portal_departman"] < 12) {
        exit(header("Location:https://www.sportsinternational.com.tr/portal/branch"));
    } else {
        exit(header("Location:https://www.sportsinternational.com.tr/portal/report"));
    }
}
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

<body class="bg-gradient-primary">

<div class="container">

    <!-- Outer Row -->
    <div class="row justify-content-center">

        <div class="col-xl-10 col-lg-12 col-md-9">

            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                    <!-- Nested Row within Card Body -->
                    <div class="row">
                        <div class="col-lg-3 d-none d-lg-block "></div>
                        <div class="col-lg-6 justify-content-center">
                            <div class="p-5">
                                <div class="text-center">
                                    <h1 class="h4 text-gray-900 mb-4">Sports International</h1>
                                </div>
                                <form class="user" id="gonderilenform" method="post"
                                      onsubmit="login_formu_gonder(); return false;">
                                    <div class="form-group">
                                        <input type="email" name="mail" class="form-control form-control-user"
                                               id="exampleInputEmail" aria-describedby="emailHelp"
                                               placeholder="Email adresini giriniz..." required>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="password" class="form-control form-control-user"
                                               id="exampleInputPassword" placeholder="Parola" required>
                                    </div>

                                    <hr>
                                    <button class="btn btn-primary btn-user btn-block" type="submit" value="submit"
                                            id="buton">
                                        Login
                                    </button>
                                </form>
                                <form class="user" id="forgotpassword" method="post"
                                      onsubmit="reset_form_send(); return false;" style="display:none;">
                                    <div class="form-group">
                                        <input type="email" name="mail" class="form-control form-control-user"
                                               id="exampleInputEmail" aria-describedby="emailHelp"
                                               placeholder="Email adresini giriniz..." required>
                                    </div>

                                    <hr>
                                    <button class="btn btn-primary btn-user btn-block" type="submit" value="submit"
                                            id="buton">
                                        Şifreyi sıfırla
                                    </button>
                                </form>
                                <hr>
                                <p class="text-center"><a onclick="sifreunuttun()" href="#" id="sifrenizimi_unuttunuz">Şifrenizi mi unuttunuz?</a></p>
                                    <div id="loginresponse" class="mt-3">
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
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
    function login_formu_gonder() {
        var query = $('#gonderilenform').serialize();
        $.ajax({
            type: 'POST',
            url: './control.php',
            data: query,
            success: function (cevap) {
                $('#loginresponse').html(cevap);

            }
        });
        return false;
    }
</script>
<script>
    function reset_form_send() {
        let forgotpassword = $('#forgotpassword');
        $.ajax({
            type: 'POST',
            url: './forgot_password.php',
            data: forgotpassword.serialize(),
            success: function (r) {
                $('#loginresponse').html(r)
            }
        })
    }
</script>
<script>
    function sifreunuttun() {
        let gonderilenform = $('#gonderilenform');
        let forgotpassword = $('#forgotpassword');
        let sifre_yazi = $('#sifrenizimi_unuttunuz');
        gonderilenform.hide();
        forgotpassword.show();
        sifre_yazi.text('Giriş mi yapmak istiyorsunuz?');
        sifre_yazi.attr("onclick", "giris_yap()");
    }
    function giris_yap() {
        let gonderilenform = $('#gonderilenform');
        let forgotpassword = $('#forgotpassword');
        let sifre_yazi = $('#sifrenizimi_unuttunuz');
        forgotpassword.hide();
        gonderilenform.show();
        sifre_yazi.text('Şifrenizi mi unuttunuz?');
        sifre_yazi.attr("onclick", "sifreunuttun()");
    }
</script>
</body>

</html>
