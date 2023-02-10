<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sports International</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link rel="stylesheet"  type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    <!-- Styles -->
    <style>
        html, body {
            background-color: #fff;
            color: #636b6f;
            font-family: 'Nunito', sans-serif;
            font-weight: 200;
            height: 100vh;
            margin: 0;
            overflow: hidden
        }

        .full-height {
            height: 100vh;
        }

        .flex-center {
            align-items: center;
            display: flex;
            justify-content: center;
            width: 100%;
        }

        .position-ref {
            position: absolute;
            top: 46px;
        }

        .top-right {
            position: absolute;
            right: 10px;
            top: 18px;
        }

        .content {
            text-align: center;
            margin-bottom: 30px;
        }

        .title {
            font-size: 114px;
            font-weight: 900;
        }

        .links > a {
            color: #636b6f;
            padding: 0 25px;
            font-size: 25px;
            font-weight: 600;
            letter-spacing: .1rem;
            text-decoration: none;
            text-transform: uppercase;
        }
        .imgg {
            background-image: url('b.png');
            background-repeat: no-repeat;̥
            background-position: 50% 0;
            -ms-background-size: cover;
            -o-background-size: cover;
            -moz-background-size: cover;
            -webkit-background-size: cover;
            background-size: cover;
            background-color: #fff;
            color: #636b6f;
            font-family: 'Nunito', sans-serif;
            font-weight: 200;
            height: 100vh;
            margin: 0;
            opacity:0.1;
        }

        .m-b-md {
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
<div id="root"></div>
{{--
<div class="imgg"></div>
<div class="flex-center position-ref full-height">
    <div class="content">
        <div class="title m-b-md">
            How To Install
            <a style="color: #61dafb"  href="https://github.com/shailesh-ladumor/one-signal">React JS</a>  in
            <span style="color: #ff2d20">
                <strong>Laravel</strong>
            </span>
        </div>
        <br>
        <div class="links">
            <a href="#"><strong style="font-size: 60px">- By Shailesh Ladumor</strong></a>
        </div>
    </div>
</div>
 --}}
</body>
<script type="text/javascript" src="{{ mix('js/app.js') }}"></script>
</html>
