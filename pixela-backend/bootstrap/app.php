<?php

use App\Http\Middleware\IsAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(fn (Middleware $m) 
        => $m->statefulApi()
            ->alias([
                'isAdmin' => IsAdmin::class,
            ]) 
    )
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
