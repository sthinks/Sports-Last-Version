<?php
namespace App\Http\Controllers;

use App\Business\Abstracts\IntegrationServiceInterface;
use App\Models\ContactForm;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

// use Illuminate\Support\Facades\DB;

class ContactFormController extends Controller
{
    private $integrationService;
    public function __construct(IntegrationServiceInterface $integrationService)
    {
        $this->integrationService = $integrationService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = ContactForm::all();
        return response()->json($data);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
            //validation
        $validation = $this->integrationService->validationData($data);
        if ($validation == 'Ok') {
            //db kayıt
            // $this->integrationService->registerDB($data);
            $customer_fullname = $this->integrationService->splitFullName(
                $data['fullname']
            );
            $customer_name = $customer_fullname[0];
            $customer_lastname = $customer_fullname[1];
            $etk = $data['kvkk'];
            $etk_int = $etk ? 1 : 0;
            $club_id = $data['club_id'];
            $db = DB::connection('mysql')->select(
                "SELECT *  FROM clubs WHERE id=$club_id"
            );
            $kulup = $db[0]->title;
            $clubName = $db[0]->name;
            $subeId = $this->integrationService->crmGetClub($clubName);
            //token al
            $bearer_token = $this->integrationService->getBearerToken();
           // crm ve mail kayıt
            $this->integrationService->sendCrm($customer_name, $customer_lastname, $data["phone"], $data["email"], $etk_int, $subeId);
            $this->integrationService->sendMail($data["fullname"], $data["email"], $kulup, $data["phone"], $subeId);
            if ($etk) {
                if (
                    $this->integrationService->checkIfGetPermissionBefore(
                        $bearer_token,
                        $data['phone']
                    )
                ) {
                    return response()->json([
                        'message' => 'telefon kaydı zaten mevcut!',
                    ]);
                } else {
                    //kayıtlı değilse sms gönderiyoruz. $dataId = sms durumu
                    $dataId = $this->integrationService->sendSms(
                        $bearer_token,
                        $customer_name,
                        $customer_lastname,
                        $data['phone'],
                        $data['email'],
                        $etk
                    );
                    if ($dataId == false || $dataId == null) {
                        return response()->json([
                            'message' => 'sms hatası code  alınamıyor...',
                        ]);
                    } else {
                        //cookie
                        Cache::put('ivt_phone', $data['phone'], 120);
                        Cache::put('ivt_bearer_token', $bearer_token, 120);
                        Cache::put('dataId', $dataId, 120);
                        return response()->json([
                            'isVerificationRequired' => true,
                        ]);
                    }
                }
            }
        }
    }
    public function validateSMS(Request $request)
    {
        $onayKodu = $request->onayKodu;
        $dataId = Cache::pull('dataId');
        $bearer_token = Cache::pull('ivt_bearer_token');
        $phone = Cache::pull('ivt_phone');

        $verifySms = $this->integrationService->verifySms(
            $dataId,
            $bearer_token,
            $phone,
            $onayKodu
        );
        //

        if ($verifySms) {
            return response()->json([
                'message' => 'doğrulama başarılı',
            ]);
        } else {
            return response()->json([
                'message' => 'hatalı kod girdiniz',
            ]);
        }
    }
    public function contactFormLongPost(Request $request)
    {
        try {
            $data = $request->all();
            $validation = $this->integrationService->validationLongFormData(
                $data
            );

            if ($validation == true) {
                $this->integrationService->registerLongDB($data);

                $this->integrationService->sendContactMail($data);
            }
            return response()->json(['message' => 'işlem başarılı']);
        } catch (\Throwable $th) {
            return response([
                'error' => $th->getMessage(),
            ]);
        }
    }
}
