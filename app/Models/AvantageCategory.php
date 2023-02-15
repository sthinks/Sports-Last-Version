<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Advantage;

class AvantageCategory extends Model
{
             protected $guarded = [];

     public function advantages(){
    return $this->hasMany(Advantage::class);
    }

}
