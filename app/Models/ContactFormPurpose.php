<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ContactForm;


class ContactFormPurpose extends Model
{
        public function contactFormLongs(){
            return $this->hasMany(ContactForm::class);
            }
}
