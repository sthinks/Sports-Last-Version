<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Club;


class ClubSliderImage extends Model
{
    public function clubs(){
        return  $this->belongsTo(Club::class,"club_id");
    }
}
