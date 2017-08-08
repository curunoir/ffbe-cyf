<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
		Validator::extend('friendcode', function ($attribute, $value, $parameters, $validator) {
			if( preg_match('/\b\d{3}[,]?\d{3}[,]?\d{3}\b/', $value) )
				return true;

			return false;
		});

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
