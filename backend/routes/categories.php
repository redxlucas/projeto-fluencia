<?php

require_once __DIR__ . '/bootstrap.php';

require_once '../app/controllers/CategoryController.php';

if ($routeKey === 'GET /api/categories') {
    CategoryController::getAll();
    exit;
}
