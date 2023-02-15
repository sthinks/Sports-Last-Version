<?php

namespace App\Http\Controllers;

use App\Models\Advantage;
use Illuminate\Http\Request;
use App\Models\AdvantageCategory;


class AdvantageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getall()
    {
        $data = Advantage::with("avantage_categories")->get();
        $data->map(function ($item) {
            $item->image_discount = url(
                sprintf('storage/%s', str_replace('\\', '/', $item->image_discount))
            );
        });
     $data->map(function ($item) {
             $item->avantage_categories->image_banner= url(
                sprintf('storage/%s', str_replace('\\', '/', $item->avantage_categories->image_banner))
            );
             
         });
        return response()->json($data);
    }
    
}