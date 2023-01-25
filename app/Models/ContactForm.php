<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Club;
use App\Models\ContactFormPurpose;

// /**
//  * @property int $id
//  * @property string $fullname
//  * @property string $phone
//  * @property string $email
//  * @property int $club_id
//  * @property bool $kvkk
//  */
class ContactForm extends Model
{
    /**
     * @var array
     */
    // protected $fillable = ['fullname', 'phone', 'email', 'club_id','kvkk'];
    protected $guarded = [];
    public function clubs()
    {
        return $this->belongsTo(Club::class, 'club_id');
    }
    public function contactFormPurposes()
    {
        return $this->belongsTo(ContactFormPurpose::class, 'purpose_id');
    }
}
