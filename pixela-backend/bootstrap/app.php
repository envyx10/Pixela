<?php

use App\Http\Middleware\IsAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(fn (Middleware $m) 
        => $m
            ->trustProxies(
                ['*'],
                Request::HEADER_X_FORWARDED_FOR
              | Request::HEADER_X_FORWARDED_HOST
              | Request::HEADER_X_FORWARDED_PORT
              | Request::HEADER_X_FORWARDED_PROTO
              | Request::HEADER_X_FORWARDED_AWS_ELB
            )
            ->statefulApi()
            ->alias([
                'isAdmin' => IsAdmin::class,
            ]) 
    )
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();