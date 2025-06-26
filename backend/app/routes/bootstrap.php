<?php

require_once __DIR__ . '/../middleware/JWTMiddleware.php';

$method = $_SERVER['REQUEST_METHOD'];
$parsedUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$cleanedUri = preg_replace('#^/[^/]+/api#', '/api', $parsedUri);
$routeKey = "$method $cleanedUri";

$publicRoutes = [
    'POST /auth/login',
    'POST /auth/register',
    'GET /api/phrases/random',
    'GET /api/category/all',
    'GET /api/phrases'
];

if (!in_array($routeKey, $publicRoutes)) {
    $user = JWTMiddleware::authenticate();
    $GLOBALS['authenticated_user'] = $user;
}
