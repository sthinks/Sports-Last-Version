<?php

namespace App\Providers;

use App\Business\Abstracts\IntegrationServiceInterface;
use App\Business\Concrete\IntegrationService;
use Illuminate\Support\ServiceProvider;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(IntegrationServiceInterface::class, IntegrationService::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
