<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;

class HomeSliderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getSlider()
    {
        $data = Slider::all();
        $data->map(function($item){
            $item->image = url(
                sprintf(
                    "storage/%s",
                    str_replace('\\', '/', $item->image)
                )
            );
        });
        return response()->json($data);
    }
}
