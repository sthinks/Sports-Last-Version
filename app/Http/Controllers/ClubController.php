<?php

namespace App\Http\Controllers;

use App\Models\Club;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClubController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = Club::with('events')
            ->with('club_slider_images')
            ->get();
        $data->map(function ($item) {
            $item->image = url(
                sprintf('storage/%s', str_replace('\\', '/', $item->image))
            );
        });
        $data->map(function ($item) {
            $item->image_banner = url(
                sprintf(
                    'storage/%s',
                    str_replace('\\', '/', $item->image_banner)
                )
            );
        });
        //sliders
        $data->map(function ($item) {
            $item->club_slider_images->map(function ($i) {
                $alotImage = str_contains($i->image, ',');
                if ($alotImage) {
                    //coklu resim -slider
                    $i->image = sprintf(
                        '%s',
                        str_replace('\\\\', '/', $i->image)
                    );
                    $i->image = sprintf(
                        '%s',
                        str_replace('club', url('storage/club'), $i->image)
                    );
                    $i->image = sprintf('%s', str_replace("\"", '', $i->image));
                    $i->image = sprintf('%s', str_replace('[', '', $i->image));
                    $i->image = sprintf('%s', str_replace(']', '', $i->image));
                } else {
                    //tekli resim-slider
                    $i->image = url(
                        sprintf('storage/%s', str_replace('\\', '/', $i->image))
                    );
                }
            });
        });
        //events
        $data->map(function ($item) {
            $item->events->map(function ($i) {
                $alotImage = str_contains($i->image, ',');
                if ($alotImage) {
                    //coklu resim -slider
                    $i->image = sprintf(
                        '%s',
                        str_replace('\\\\', '/', $i->image)
                    );
                    $i->image = sprintf(
                        '%s',
                        str_replace('events', url('storage/events'), $i->image)
                    );
                    $i->image = sprintf('%s', str_replace("\"", '', $i->image));
                    $i->image = sprintf('%s', str_replace('[', '', $i->image));
                    $i->image = sprintf('%s', str_replace(']', '', $i->image));
                } else {
                    //tekli resim-slider
                    $i->image = url(
                        sprintf('storage/%s', str_replace('\\', '/', $i->image))
                    );
                }
            });
        });

        // $data->map(function ($item) {
        //     $item->events->map(
        //         function ($i) {
        //         $i->image = url(sprintf(
        //             "storage/%s",
        //             str_replace("\\","/", $i->image)));

        //     });
        // });

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
        $data = Club::where('slug', $slug)
            ->with('events')
            ->with('club_slider_images')
            ->first();
        $data->image = url(
            sprintf('storage/%s', str_replace('\\', '/', $data->image))
        );
        $data->image_banner = url(
            sprintf('storage/%s', str_replace('\\', '/', $data->image_banner))
        );
        //sliders-image
        $data->club_slider_images->map(function ($i) {
            $alotImage = str_contains($i->image, ',');
            if ($alotImage) {
                //coklu resim -slider
                $i->image = sprintf('%s', str_replace('\\\\', '/', $i->image));
                $i->image = sprintf(
                    '%s',
                    str_replace('club', url('storage/club'), $i->image)
                );
                $i->image = sprintf('%s', str_replace("\"", '', $i->image));
                $i->image = sprintf('%s', str_replace('[', '', $i->image));
                $i->image = sprintf('%s', str_replace(']', '', $i->image));
            } else {
                //tekli resim-slider
                $i->image = url(
                    sprintf('storage/%s', str_replace('\\', '/', $i->image))
                );
            }
        });
        $data->events->map(function ($i) {
            $i->image = url(
                sprintf('storage/%s', str_replace('\\', '/', $i->image))
            );
        });
        return response()->json($data);
    }
}
