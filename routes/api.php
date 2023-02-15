<?php

use App\Http\Controllers\AgendaController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\ClubServiceController;
use App\Http\Controllers\ClubSliderImageController;
use App\Http\Controllers\ContactFormController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\GroupLessonController;
use App\Http\Controllers\HomeSliderController;
use App\Http\Controllers\IvtController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SmsCodeController;
use App\Http\Controllers\TalkingController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\AdvantageController;

use App\Models\ClubSliderImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//CLUB
Route::get('/clubs', [ClubController::class, 'index']);
Route::get('/club/{slug}', [ClubController::class, 'show']);

//EVENT
Route::get('/events', [EventController::class, 'index']);
Route::get('/event/{slug}', [EventController::class, 'show']);

//PAGE
Route::get('/pages', [PageController::class, 'index']);
Route::get('/page/{slug}', [PageController::class, 'show']);

//TALKING
Route::get('/talks', [TalkingController::class, 'index']);
Route::get('/talk/{slug}', [TalkingController::class, 'show']);

//contact_form
Route::get('/contacts', [ContactFormController::class, 'index']);
Route::post('/join-us', [ContactFormController::class, 'store']);
Route::post('/join-us/validate', [ContactFormController::class, 'validateSMS']);

//contac-form-long
Route::post('/contact', [ContactFormController::class, 'contactFormLongPost']);

//SmsCode
Route::post('/get-contacts', [ContactFormController::class, 'validateSMS']);

//Home Slider
Route::get('/get-slider', [HomeSliderController::class, 'getSlider']);

//Home Slider
Route::get('/services', [ServiceController::class, 'all']);

//advantages
Route::get('/advantages', [AdvantageController::class, 'getall']);
//registeruser
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
