<?php

namespace App\Http\Middleware;

use Closure;

class AutoAssets
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        \Assets::add('css_primary');
        \Assets::add('js_primary');
        return $next($request);
    }
}
