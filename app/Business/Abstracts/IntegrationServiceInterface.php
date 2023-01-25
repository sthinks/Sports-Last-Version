<?php
namespace App\Business\Abstracts;
interface IntegrationServiceInterface{
    public function getBearerToken();
     //kontrol ediyor Token ve Phone daha önce kayıtlımı
    public function checkIfGetPermissionBefore($bearer, $phone);
     // --yeni kayıt ekleniyor.
    public function sendSms($bearer, $firstname, $lastname, $number, $email, $etk);
    // crm transfer
    public function sendCrm($name, $surname, $phone, $email, $etk, $subeid);
    function validationData($data);
        //db kayıt

    function registerDB($data);
    function sendThisMail($tesis_adi_id, $musteri);

    function sendMail($fullname, $email, $club, $phone, $subeid);
    function checkIfNumberIsValid($phone);
    function splitFullName($fullname);

    function crmGetClub($clubName);

    public function validationLongFormData($data);
    function sendContactMail($data);

    function registerLongDB($data);
}
