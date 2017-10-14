<?php

namespace App\Facades;
use Illuminate\Support\Facades\Facade;

class UnitsTool extends Facade
{
    /**
     * The facade accessor for retrieving translation from the IoC.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'unitstool';
    }
}