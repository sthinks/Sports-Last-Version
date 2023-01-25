<?php

namespace App\Http\Controllers;

use App\Models\ClubSliderImage;
use Illuminate\Http\Request;

class ClubSliderImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $data =ClubSliderImage::all();
        $data->map(function ($item) {
           $alotImage=  str_contains($item->image, ",");
           if($alotImage){
                $item->image = sprintf(
                    "%s",
                    str_replace('\\\\', '/', $item->image)
                );
                $item->image =sprintf("%s", str_replace('club',url('storage/club'),$item->image));
                $item->image =sprintf("%s", str_replace(",",'',$item->image));
           }
        });
        return response()->json($data);

    }


}
