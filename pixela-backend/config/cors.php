<?php

return [
    /*
     * Rutas que deberían permitir CORS
     */
    'paths' => ['api/*', 'sanctum/csrf-cookie', '*'],

    /*
     * Métodos permitidos durante las solicitudes CORS
     */
    'allowed_methods' => ['*'],

    /*
     * Orígenes permitidos para CORS
     */
    'allowed_origins' => ['*'],

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