<?php

namespace App\Providers;


use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use App\UnitsTool;

class UnitsToolServiceProvider extends ServiceProvider
{

    protected $defer = true;

    public function register()
    {
        $this->app->bind('unitstool', function ($app) {
            return new UnitsTool($app);
        });

        $this->app->bind(UnitsTool::class, 'unitstool');
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['unitstool'];
    }
}
