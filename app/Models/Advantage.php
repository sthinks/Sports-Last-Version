<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\AvantageCategory;

class Advantage extends Model
{
         protected $guarded = [];
    public function avantage_categories(){
        return $this->belongsTo(AvantageCategory::class, "avantage_categories_id");
    }

}
