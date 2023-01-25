<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Club;


class Event extends Model
{
    //  /**
    //  * @var array
    //  */
    protected $fillable = ['name','time', 'image', 'description','club_id','slug'];

    public function clubs(){
        return $this->belongsTo(Club::class, "club_id");
    }
}
