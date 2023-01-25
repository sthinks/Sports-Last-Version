<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use TCG\Voyager\Models\Page;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Page::paginate(9);
        $data->map(function ($item) {
            $item->image = url(
                sprintf('storage/%s', str_replace('\\', '/', $item->image))
            );
            $item->image = sprintf(
                '%s',
                str_replace('club', url('storage/pages'), $item->image)
            );
            $item->image = sprintf('%s', str_replace(',', '', $item->image));
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
        $data = Page::where('slug', $slug)->first();
        $data->image = url(
            sprintf('storage/%s', str_replace('\\', '/', $data->image))
        );
        $data->image = sprintf(
            '%s',
            str_replace('club', url('storage/pages'), $data->image)
        );
        $data->image = sprintf('%s', str_replace(',', '', $data->image));
        return response()->json($data);
    }
}
