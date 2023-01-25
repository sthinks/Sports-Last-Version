<?php

namespace App\Models;


use App\Models\Event;
use App\Models\ContactForm;
use App\Models\ClubSliderImage;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    use HasFactory;
    protected $fillable = [ 'title','image','description,image_banner','slug',"club_id","name"];

    public function events(){

    return $this->hasMany(Event::class);
    }

    public function contactForms(){

        return $this->hasMany(ContactForm::class);
    }

    public function club_slider_images(){

        return $this->hasMany(ClubSliderImage::class);
    }
}


