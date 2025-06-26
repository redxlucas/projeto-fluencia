<?php

require_once __DIR__ . '/bootstrap.php';

require_once '../app/controllers/UserController.php';


if ($routeKey === 'POST /auth/login') {
    (new UserController())->login();
    exit;
}

if ($routeKey === 'POST /auth/register') {
    (new UserController())->register();
    exit;
}
