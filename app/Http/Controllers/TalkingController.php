<?php

namespace App\Http\Controllers;

use App\Models\Talking;
use Illuminate\Http\Request;

class TalkingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Talking::orderByRaw('id DESC')->paginate(9);
        $data->map(function ($item) {
            $item->image = url(
                sprintf('storage/%s', str_replace('\\', '/', $item->image))
            );
        });
        $data->map(function ($item) {
            $item->img_banner = url(
                sprintf('storage/%s', str_replace('\\', '/', $item->img_banner))
            );
        });
        return response()->json($data);
    }
    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $data = Talking::where('slug', $slug)->first();
        $data->image = url(
            sprintf('storage/%s', str_replace('\\', '/', $data->image))
        );

        $data->img_banner = url(
            sprintf('storage/%s', str_replace('\\', '/', $data->img_banner))
        );

        return response()->json($data);
    }
}
