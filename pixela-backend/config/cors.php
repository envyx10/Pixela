<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'frontend-logout'],


    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:3000', 'http://laravel.test'],

    /*
     * Patrones de orígenes permitidos
     */
    'allowed_origins_patterns' => [],

    /*
     * Encabezados permitidos durante las solicitudes CORS
     */
    'allowed_headers' => ['*'],

    /*
     * Encabezados que pueden ser expuestos desde el servidor
     */
    'exposed_headers' => [],

    /*
     * Tiempo de caché máximo para los resultados preflight
     */
    'max_age' => 0,

    /*
     * Si se deben enviar credenciales durante las solicitudes CORS
     */
    'supports_credentials' => false,
]; 