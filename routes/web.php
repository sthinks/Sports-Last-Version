<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get("/test",function(){
  $db = DB::connection('mysql')->select(
            "SELECT *  FROM clubs WHERE id=207"
        );
     $data=     $clubName = $db[0]->name;
    return print_r($data);
    
});


Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});
// URL TÜM DEGERLERİ ALABİLMESİ İÇİN

Route::any('/{any}', function(){
    return view('welcome');
})->where('any', '^(?!api\/)[\/\w\.-]*');
