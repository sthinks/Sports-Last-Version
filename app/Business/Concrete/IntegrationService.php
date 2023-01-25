<?php

namespace App\Business\Concrete;

use App\Models\ContactFormLong;
use Hamcrest\Type\IsInteger;
use Illuminate\Database\Events\TransactionBeginning;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Business\Abstracts\IntegrationServiceInterface;
use App\Models\ContactForm;

class IntegrationService implements IntegrationServiceInterface
{
    protected $db;
    //token alma işlemi  --acceesstoken /login
    public function getBearerToken()
    {
        $curl = curl_init(); // curl aç
        $options = [
            CURLOPT_URL => 'https://ivtapi.mobildev.in/auth',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 5,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_HTTPHEADER => [
                sprintf('Authorization: Basic %s', env('MOBILDEV_API_KEY')),
            ],
        ];
        curl_setopt_array($curl, $options); // options bilgilerini ayarla
        $response = json_decode(curl_exec($curl), true); // kontrol. jsonu php çevir curl calıstır. true başlat
        if (curl_error($curl) !== '') {
            header('Location: http://www.sportsinternational.com.tr');
        }
        curl_close($curl);
        return $response['access_token'];
    }

    //izin kontrolu
    //kontrol ediyor Token ve Phone daha önce kayıtlımı
    public function checkIfGetPermissionBefore($bearer, $phone)
    {
        $ch = curl_init();
        $options = [
            //mobildev auth taslagı
            CURLOPT_URL => sprintf(
                'https://ivtapi.mobildev.in/check?key=%d',
                $phone
            ),
            // url alındı
            CURLOPT_RETURNTRANSFER => true,
            //?
            CURLOPT_MAXREDIRS => 10, //?   // max 10 sayfa yönlendir --10dan fazlası 404 hatası
            CURLOPT_FOLLOWLOCATION => true, //?
            CURLOPT_TIMEOUT => 0,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPHEADER => [
                sprintf('Authorization: Bearer %s', $bearer),
            ],
        ];
        curl_setopt_array($ch, $options); //$ch bilgilerini set et
        $response = json_decode(curl_exec($ch), true); //  sonucu php ye cevir .curl calıstır. true ver
        if (curl_error($ch) !== '') {
            header('Location: http://www.sportsinternational.com.tr'); //
        }
        curl_close($ch); //curl kapat
        if (
            isset($response['Success']) ||
            $response['validated']['text'] == 'Pasif'
        ) {
            return false;
        }
        return true;
    }
    // --yeni kayıt ekleniyor.
    public function sendSms(
        $bearer,
        $firstname,
        $lastname,
        $number,
        $email,
        $etk
    ) {
        $etk = $etk ? 1 : -1;
        $body = [
            'firstName' => $firstname,
            'lastName' => $lastname,
            'msisdn' => (string) $number,
            //phone number.
            'email' => $email,
            'accountType' => 0,
            'language' => 'tr',
            'etk' => [
                'msisdn' => $etk,
                'email' => $etk,
                'share' => $etk,
                'call' => $etk,
            ],
            'kvkk' => [
                'process' => 1,
                'share' => 1,
                'international' => 1,
            ],
        ];
        $ch = curl_init();
        $options = [
            CURLOPT_URL => sprintf(
                'https://ivtapi.mobildev.in/data/%s',
                env('MOBILDEV_COLLECTOR_ID')
            ),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_ENCODING => '',
            CURLOPT_POSTFIELDS => json_encode($body),
            //post verileri => $body (jsona çevir)
            CURLOPT_HTTPHEADER => [
                sprintf('Authorization: Bearer %s', $bearer),
                'Content-Type: application/json',
            ],
        ];
        curl_setopt_array($ch, $options);
        $response = json_decode(curl_exec($ch), true); //ch işleme sok gelen veriyi al . çalıştır . sonucu phpye çevir
        if (curl_error($ch) !== '') {
            header('Location: http://www.sportsinternational.com.tr');
        }
        curl_close($ch); //oturumu kapat
        return isset($response['dataId']) ? $response['dataId'] : false;
    }
    //sms verify onayla
    function verifySms($dataId, $bearer_token, $phone, $verify_code)
    {
        $curl = curl_init(); // curl oturumununu aç
        curl_setopt_array($curl, [
            CURLOPT_URL => "https://ivtapi.mobildev.in/data/verify/$dataId",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => "{\n\"item\" : \"$phone\",\n\"code\" : \"$verify_code\"\n}",
            CURLOPT_HTTPHEADER => [
                "Authorization: Bearer $bearer_token",
                'Content-Type: text/plain',
            ],
        ]);
        $response = json_decode(curl_exec($curl), true);
        curl_close($curl);
        return !isset($response['Success']);
    }
    // crm transfer
    public function sendCrm($name, $surname, $phone, $email, $etk, $subeid)
    {
        $data = '{
            "MethodName": "AdayOlustur",
            "MtdParams":
              {
                  "SubeID": "'.$subeid.'",
                  "MusteriAdi": "'.$name.'",
                  "MusteriSoyadi": "'.$surname.'",
                  "CepTel": "'.$phone.'",
                  "Email": "'.$email.'",
                  "ETKOnaylandi" "'.$etk.'"
              }
          }';
        $host = "https://sportswebformapi.si.com.tr/api/MethodExecuter/ExecuteMethod";
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL =>$host,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_POST=> 1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS =>$data,
            CURLOPT_HTTPHEADER => [
                'Authorization: Basic d2ViZm9ybWFwaUBzaS5jb20udHI6U3BvcnRzITU1Lg==',
                'Content-Type: application/json',
            ],
        ]);

        $response = curl_exec($curl);
        $httpcode = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        return [$httpcode < 300, $response];
    }

    //validation data.
    public function validationData($data)
    {
        $validation = Validator::make($data, [
            'fullname' => ['string', 'required', 'regex:/^[a-zA-Z ]+$/u'],
            'phone' => ['string', 'required', 'starts_with:05,2', 'max:11'],
            'email' => ['string', 'required'],
            'club_id' => ['integer', 'required'],
            'kvkk' => ['bool'],
        ]);

        if ($validation->fails()) {
            return $validation->errors();
        } else {
            return 'Ok';
        }
    }

    public function validationLongFormData($data)
    {
        $validation = Validator::make($data, [
            'fullname' => ['string', 'required', 'regex:/^[a-zA-Z ]+$/u'],
            'phone' => ['string', 'required', 'starts_with:05,2', 'max:11'],
            'email' => ['string', 'required'],
            'club_id' => ['integer', 'required'],
            'address' => ['string', 'required'],
            'purpose_id' => ['integer', 'required'],
            'purpose_other' => ['string'],
            'message' => ['string', 'required'],
        ]);
        if ($validation->fails()) {
            return $validation->errors();
        } else {
            return 'Ok';
        }
    }

    //db kayıt
    function registerDB($data)
    {
        ContactForm::Create([
            'fullname' => $data['fullname'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            'club_id' => $data['club_id'],
            'kvkk' => $data['kvkk'],
            'purpose_id' => 1,
        ]);
        $club_id = $data['club_id'];
        $db = DB::connection('mysql')->select(
            "SELECT *  FROM clubs WHERE id=$club_id"
        );
        $talep_aciklamasi = 'Bu form hemen üye ol formundan doldurulmuştur.';
        $musteri_alternatif_telefon = '';
        $generator = DB::connection('sports_portal')->select(
            "SELECT * FROM uyeler WHERE email='registernow@si.com.tr'"
        );
        $generator_id = $generator[0]->id;
        $yeni_yenileme_id = 1;
        $clubName = $db[0]->name;
        //tesisi bulalım
        $db = DB::connection('sports_portal')->select(
            "SELECT * FROM tesisler WHERE code='$clubName'"
        );
        $tesis = $db[0];
        $tesis_adi_id = $tesis->id;
        $db_now = now();
        //Transaction---
        DB::beginTransaction();
        //portal ac kaydettik
        $ac_id = DB::connection('sports_portal')
            ->table('ac')
            ->insertGetId([
                'tesis_adi' => $tesis_adi_id,
                'musteri' => $data['fullname'],
                'musteri_email' => $data['email'],
                'musteri_telefon' => $data['phone'],
                'musteri_alternatif_telefon' => $musteri_alternatif_telefon,
                'yeni_yenileme' => $yeni_yenileme_id,
                'talep_aciklamasi' => $talep_aciklamasi,
                'created_at' => $db_now,
                'updated_at' => $db_now,
                'status_id' => 8,
                'nereden_duydunuz' => 8,
            ]);
        //portal ac_status kayıt ettik
        $ac_status_array = [
            'ac_id' => $ac_id,
            'user_id' => $generator_id,
            'status_id' => 8,
            'done_at' => $db_now,
        ];
        $ac_status_id = DB::connection('sports_portal')
            ->table('ac_status')
            ->insertGetId($ac_status_array);
        //mail gönder
        $sendThisMail = $this->sendThisMail($tesis_adi_id, $data['fullname']);
        if ($ac_id != null && $ac_status_id != null && ($sendThisMail = true)) {
            DB::commit();
            return true;
        } else {
            DB::rollBack();
            return false;
        }
    }
    function sendThisMail($tesis_adi_id, $musteri)
    {
        $sendingCallCenter = [];
        $db = DB::connection('sports_portal')->select(
            //$$tesis_adi_id
            "SELECT email  FROM users_mail_notification WHERE mail_notification=1 AND tesis=$tesis_adi_id"
        );
        $allusers = $db;
        // Mail yollama işlevleri
        foreach ($allusers as $oneuser) {
            array_push($sendingCallCenter, $oneuser->email);
        }
        $details = [
            'subject' => "Sports International Portal - Yeni AC Kaydı - $musteri",
        ];
        $result = \Mail::to($sendingCallCenter)->send(
            new \App\Mail\Mailing($details)
        );
        $result;
        if ($result) {
            return true;
        }
    }
    function sendMail($fullname, $email, $club, $phone, $subeid)
    {
        $details = [
            'fullname' => $fullname,
            'email' => $email,
            'club' => $club,
            'phone' => $phone,
        ];
        if ($subeid == 4) {
            $toList = [
                'pinar.sarioglu@si.com.tr',
            ];
            $ccList = [
                'Bulent.Yalman@si.com.tr',
                'Reception1.Bilkent@si.com.tr',
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
            ];

            \Mail::to($toList)
                ->cc($ccList)
                ->send(new \App\Mail\RegisterMailing($details));
        } elseif ($subeid == 13) {
            $toList = [
                'Derya.Gonulacari@si.com.tr',
                'busraasena.akyuz@si.com.tr',
                'Reception1.CankayaVadi@si.com.tr',
                'BurcuSukriye.Tuncay@si.com.tr',
            ];
            $ccList = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
            ];
            \Mail::to($toList)
                ->cc($ccList)
                ->send(new \App\Mail\RegisterMailing($details));
        } elseif ($subeid == 9) {
            $toList = [
                'Ecem.Yazar@si.com.tr',
                'UgurOzal.Isik@si.com.tr',
                'Reception1.Altinoran@si.com.tr',
            ];
            $ccList = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
            ];
            \Mail::to($toList)
                ->cc($ccList)
                ->send(new \App\Mail\RegisterMailing($details));
        } elseif ($subeid == 3) {
            $toList = [
                'Guzin.Erk@si.com.tr',
                'Irfan.Ozkan@si.com.tr',
                'aslihan.caglar@si.com.tr',
                'Reception1.Sisli@si.com.tr',
            ];
            $ccList = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
            ];
            \Mail::to($toList)
                ->cc($ccList)
                ->send(new \App\Mail\RegisterMailing($details));
        } elseif ($subeid == 5) {
            $toList = [
                'Reception1.Kadikoy@si.com.tr',
                'onur.karabulut@si.com.tr',
                'aslihan.caglar@si.com.tr',
            ];
            $ccList = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
                'ilgim.gurel@si.com.tr',
            ];
            \Mail::to($toList)
                ->cc($ccList)
                ->send(new \App\Mail\RegisterMailing($details));
        } elseif ($subeid == 6) {
            $toList = [
                'Suzan.Tuncer@si.com.tr',
                'Burakhan.Sahinoglu@si.com.tr',
                'Irfan.Ozkan@si.com.tr',
                'koray.keser@si.com.tr',
                'Reception1.Atakoy@si.com.tr',
            ];
            $ccList = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
            ];
            \Mail::to($toList)
                ->cc($ccList)
                ->send(new \App\Mail\RegisterMailing($details));
        } elseif ($subeid == 8) {
            $toList = [
                'Nese.Guden@si.com.tr',
                'Fusun.Dayioglu@si.com.tr',
                'SafiyeFunda.Ozemrak@si.com.tr',
                'Serpil.Mete@si.com.tr',
                'Osman.Karatas@si.com.tr',
                'Reception1.Mavisehir@si.com.tr',
            ];
            $ccList = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
            ];
            \Mail::to($toList)
                ->cc($ccList)
                ->send(new \App\Mail\RegisterMailing($details));
        } elseif ($subeid == 7) {
            $toList = [
                'Aycan.Coban@si.com.tr',
                'Handan.Yarsuvat@si.com.tr',
                'EnginOzgur.Sahin@si.com.tr',
                'Reception1.Mersin@si.com.tr',
            ];
            $ccList = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
            ];
            \Mail::to($toList)
                ->cc($ccList)
                ->send(new \App\Mail\RegisterMailing($details));
        } elseif ($subeid == 14) {
            $toList = [
                'Begum.Bilgin@si.com.tr',
                'Esin.Celik@si.com.tr',
                'UgurOzal.Isik@si.com.tr',
                'Reception1.Effect@si.com.tr',
            ];
            $ccList = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
            ];
            \Mail::to($toList)
                ->cc($ccList)
                ->send(new \App\Mail\RegisterMailing($details));
        } elseif ($subeid == 15) {
            $toList = [
                'OzturkOzgur.Aydin@si.com.tr',
                'Reception2.Bilkent@si.com.tr',
            ];
            $ccList = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
            ];
            \Mail::to($toList)
                ->cc($ccList)
                ->send(new \App\Mail\RegisterMailing($details));
        }
        $cc = [
            'anil.erzurum@si.com.tr',
            'dilara.atasoy@si.com.tr',
            'elif.ates@si.com.tr',
            'bugse.bilikibrahimov@si.com.tr',
        ];
        \Mail::cc($cc)->send(new \App\Mail\RegisterMailing($details));
    }
    //-------
    function checkIfNumberIsValid($phone)
    {
        $head = substr($phone, 0, 2); //phone üzerinden ilk 2 karakteri $head' e at.
        if (strlen($phone) !== 11 || $head !== '05') {
            //$phone uzunlugu 11 değilse veya head 05 ile başlamıyorsa false
            return false;
        }
        return true;
    }
    function splitFullName($fullname)
    {
        $fullname = trim($fullname); //baştan sondan boşlukları sil
        $fullname = explode(' ', $fullname); // boşluga göre ayır dizi ye at.
        $surname = count($fullname) > 1 ? end($fullname) : ''; //fullname eleman sayisi 1 den büyükse surname = son eleman
        //degillse boş.
        if (count($fullname) > 1) {
            array_pop($fullname);
        } //fullname eleman sayisi 1 den büyükse  fullname son elemanını çıkar
        $fullname = join(' ', $fullname); // araya boşluk koyarak birleştir.
        return [$fullname, $surname]; //2 sini dön
    }
    function crmGetClub($clubName)
    {
        switch ($clubName) {
            case 'merkez':
                $subeid = 1;
                break;
            case 'sisli':
                $subeid = 3;
                break;
            case 'bilkent':
                $subeid = 4;
                break;
            case 'kadikoy':
                $subeid = 5;
                break;
            case 'atakoy':
                $subeid = 6;
                break;
            case 'yenisehir':
                $subeid = 7;
                break;
            case 'mavisehir':
                $subeid = 8;
                break;
            case 'altinoran':
                $subeid = 9;
                break;
            case 'bosphorus':
                $subeid = 10;
                break;
            case 'halkali':
                $subeid = 11;
                break;
            case 'cankayavadi':
                $subeid = 13;
                break;
            case 'sportseffect':
                $subeid = 14;
                break;
            default:
                $subeid = 0;
                return $subeid;
        }
        return $subeid;
    }
    function sendContactMail($data)
    {
        //clubname
        $club_id = $data['club_id'];
        $db = DB::connection('mysql')->select(
            "SELECT *  FROM clubs WHERE id=$club_id"
        );
        $clubName = $db[0]->name;
        //purpose_name
        $purpose_id = $data['purpose_id'];
        $db = DB::connection('mysql')->select(
            "SELECT *  FROM contact_form_purposes WHERE id=$purpose_id"
        );
        $purpose_name = $db[0]->tr;

        $subeId = $this->crmGetClub($clubName);
        $details = [
            'fullname' => $data['fullname'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            'clubName' => $clubName,
            'address' => $data['address'],
            'message' => $data['message'],
            'purpose_name' => $purpose_name,
            //Diğer ise gizle
            'purpose_other' => $data['purpose_other'],
        ];
        if ($subeId == 4) {
            $sendToMails = [
                'ozlem.karakelle@si.com.tr',
                // 'TahaIrfan.Oncu@si.com.tr',
                'Bulent.Yalman@si.com.tr',
                'ebru.boz@si.com.tr',
                'pinar.sarioglu@si.com.tr',
            ];
            $sendToCC = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
                'ilgim.gurel@si.com.tr',
                'dilara.atasoy@si.com.tr',
                'bugse.bilikibrahimov@si.com.tr',
                'elif.ates@si.com.tr',
                'anil.erzurum@si.com.tr',
            ];
            \Mail::to($sendToMails)
                ->cc($sendToCC)
                ->send(new \App\Mail\sendContactMail($details));
        }
        if ($subeId == 13) {
            $sendToMails = [
                'Derya.Gonulacari@si.com.tr',
                'busraasena.akyuz@si.com.tr',
                'BurcuSukriye.Tuncay@si.com.tr',
                'busraasena.akyuz@si.com.tr',
            ];
            $sendToCC = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
                'ilgim.gurel@si.com.tr',
                'dilara.atasoy@si.com.tr',
                'bugse.bilikibrahimov@si.com.tr',
                'elif.ates@si.com.tr',
                'anil.erzurum@si.com.tr',
            ];
            \Mail::to($sendToMails)
                ->cc($sendToCC)
                ->send(new \App\Mail\sendContactMail($details));
        }
        if ($subeId == 9) {
            $sendToMails = [
                'Ecem.Yazar@si.com.tr',
                'Onur.Karabulut@si.com.tr',
                'UgurOzal.Isik@si.com.tr',
                'Erkin.Canakci@si.com.tr',
            ];
            $sendToCC = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
                'ilgim.gurel@si.com.tr',
                'dilara.atasoy@si.com.tr',
                'bugse.bilikibrahimov@si.com.tr',
                'elif.ates@si.com.tr',
                'anil.erzurum@si.com.tr',
            ];
            \Mail::to($sendToMails)
                ->cc($sendToCC)
                ->send(new \App\Mail\sendContactMail($details));
        }
        if ($subeId == 3) {
            $sendToMails = [
                'Guzin.Erk@si.com.tr',
                'Irfan.Ozkan@si.com.tr',
                'aslihan.caglar@si.com.tr',
                'OmerEmre.Engin@si.com.tr',
                'GozdeMelek.Ozer@si.com.tr',
            ];
            $sendToCC = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
                'ilgim.gurel@si.com.tr',
                'dilara.atasoy@si.com.tr',
                'bugse.bilikibrahimov@si.com.tr',
                'elif.ates@si.com.tr',
                'anil.erzurum@si.com.tr',
            ];
            \Mail::to($sendToMails)
                ->cc($sendToCC)
                ->send(new \App\Mail\sendContactMail($details));
        }
        if ($subeId == 5) {
            $sendToMails = [
                'Reception1.Kadikoy@si.com.tr',
                'onur.karabulut@si.com.tr',
                'aslihan.caglar@si.com.tr',
            ];
            $sendToCC = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
                'ilgim.gurel@si.com.tr',
                'dilara.atasoy@si.com.tr',
                'bugse.bilikibrahimov@si.com.tr',
                'elif.ates@si.com.tr',
                'anil.erzurum@si.com.tr',
            ];
            \Mail::to($sendToMails)
                ->cc($sendToCC)
                ->send(new \App\Mail\sendContactMail($details));
        }
        if ($subeId == 6) {
            $sendToMails = [
                'Suzan.Tuncer@si.com.tr',
                'Burakhan.Sahinoglu@si.com.tr',
                'Irfan.Ozkan@si.com.tr',
                'Koray.Keser@si.com.tr',
                'zuleyhan.akgok@si.com.tr',
            ];
            $sendToCC = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
                'ilgim.gurel@si.com.tr',
                'dilara.atasoy@si.com.tr',
                'bugse.bilikibrahimov@si.com.tr',
                'elif.ates@si.com.tr',
                'anil.erzurum@si.com.tr',
            ];
            \Mail::to($sendToMails)
                ->cc($sendToCC)
                ->send(new \App\Mail\sendContactMail($details));
        }
        if ($subeId == 8) {
            $sendToMails = [
                'Nese.Guden@si.com.tr',
                'Fusun.Dayioglu@si.com.tr',
                'SafiyeFunda.Ozemrak@si.com.tr',
                'Serpil.Mete@si.com.tr',
                'Osman.Karatas@si.com.tr',
                'Isilay.Ocal@si.com.tr',
            ];
            $sendToCC = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
                'ilgim.gurel@si.com.tr',
                'dilara.atasoy@si.com.tr',
                'bugse.bilikibrahimov@si.com.tr',
                'elif.ates@si.com.tr',
                'anil.erzurum@si.com.tr',
            ];
            \Mail::to($sendToMails)
                ->cc($sendToCC)
                ->send(new \App\Mail\sendContactMail($details));
        }
        if ($subeId == 7) {
            $sendToMails = [
                'Aycan.Coban@si.com.tr',
                'Handan.Yarsuvat@si.com.tr',
                'EnginOzgur.Sahin@si.com.tr',
                'Duygu.Yucel@si.com.tr',
                'yuksel.kinali@si.com.tr',
            ];
            $sendToCC = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
                'ilgim.gurel@si.com.tr',
                'dilara.atasoy@si.com.tr',
                'bugse.bilikibrahimov@si.com.tr',
                'elif.ates@si.com.tr',
                'anil.erzurum@si.com.tr',
            ];
            \Mail::to($sendToMails)
                ->cc($sendToCC)
                ->send(new \App\Mail\sendContactMail($details));
        }
        if ($subeId == 14) {
            $sendToMails = [
                'Begum.Bilgin@si.com.tr',
                'Esin.Celik@si.com.tr',
                'UgurOzal.Isik@si.com.tr',
                'Erkin.Canakci@si.com.tr',
            ];
            $sendToCC = [
                'Hakan.Ozturk@si.com.tr',
                'socialthinks.admin@tepeservis.com.tr',
                'ilgim.gurel@si.com.tr',
                'dilara.atasoy@si.com.tr',
                'bugse.bilikibrahimov@si.com.tr',
                'elif.ates@si.com.tr',
                'anil.erzurum@si.com.tr',
            ];
            \Mail::to($sendToMails)
                ->cc($sendToCC)
                ->send(new \App\Mail\sendContactMail($details));
        }
    }

    function registerLongDB($data)
    {
        $data = ContactForm::Create([
            'fullname' => $data['fullname'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            'club_id' => $data['club_id'],
            'address' => $data['address'],
            'purpose_id' => $data['purpose_id'],
            'purpose_other' => $data['purpose_other'],
            'message' => $data['message'],
            'gender' => $data['gender'],
            'kvkk' => true,
        ]);
    }
}
