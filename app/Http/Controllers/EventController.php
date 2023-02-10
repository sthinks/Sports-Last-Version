<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Event::orderByRaw('id DESC')
            ->whereDate('time', '>=', now())
            ->with('clubs')
            ->get();
        $data->map(function ($item) {
            $item->image = url(
                sprintf('storage/%s', str_replace('\\', '/', $item->image))
            );
        });
        return response()->json($data);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data = Event::orderByRaw('time DESC')
            ->whereDate('time', '>=', now())
            ->with('clubs')
            ->get();
        $data = $data[0]->clubs->image = url(
            sprintf(
                'storage/%s',
                str_replace('\\', '/', $data[0]->clubs->image)
            )
        );
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
        $data = Event::where('slug', $slug)->first();
        $data->image = url(
            sprintf('storage/%s', str_replace('\\', '/', $data->image))
        );
        return response()->json($data);
    }
}
