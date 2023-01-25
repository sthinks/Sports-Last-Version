<html>
<head>
    <title>Yeni İletişim Formu</title>
<body>
    <table border='0' cellspacing='0' cellpadding='6'>
        <tr>
          <td style='border-bottom:1px solid #CCCCCC;'><strong>Ad Soyad</strong></td>
          <td style='border-bottom:1px solid #CCCCCC;'>{{$details['fullname']}}</td>
        </tr>
        <tr>
          <td style='border-bottom:1px solid #CCCCCC;'><b>E-Posta</b></td>
          <td style='border-bottom:1px solid #CCCCCC;'> {{$details['email']}}</td>
        </tr>
        <tr>
          <td style='border-bottom:1px solid #CCCCCC;'><b>Telefon</b></td>
          <td style='border-bottom:1px solid #CCCCCC;'>{{$details['phone']}}</td>
        </tr>
        <tr>
          <td style='border-bottom:1px solid #CCCCCC;'><b>Adres</b></td>
          <td style='border-bottom:1px solid #CCCCCC;'>{{$details['address']}}</td>
        </tr>
        <tr>
          <td style='border-bottom:1px solid #CCCCCC;'><b>Kulüp</b></td>
          <td style='border-bottom:1px solid #CCCCCC;'>{{$details['clubName']}}</td>
        </tr>
        @if( $details['purpose_name'] != "Diğer")
        <tr>
            <td style='border-bottom:1px solid #CCCCCC;'><b>Duyum</b></td>
            <td style='border-bottom:1px solid #CCCCCC;'>{{$details['purpose_name']}}</td>
          </tr>
        @else
        <tr>
            <td style='border-bottom:1px solid #CCCCCC;'><b>Duyum</b></td>
            <td style='border-bottom:1px solid #CCCCCC;'>{{$details['purpose_other']}}</td>
          </tr>
        @endif
        <tr>
          <td style='border-bottom:1px solid #CCCCCC;'><b>Mesaj</b></td>
          <td style='border-bottom:1px solid #CCCCCC;'>{{$details['message']}}</td>
        </tr>
        <tr>
          <td style='border-bottom:1px solid #CCCCCC;'><b>Gönderim Tarihi</b></td>
          <td style='border-bottom:1px solid #CCCCCC;'>{{now()->format("d/m/Y H:i:s")}}</td>
        </tr>
      </table>
</body>
</head>
</html>
