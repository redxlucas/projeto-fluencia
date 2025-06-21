<?php

require_once __DIR__ . '/bootstrap.php';

require_once '../app/controllers/PracticeSessionController.php';

if ($routeKey === 'POST /api/sessions/start') {
    (new PracticeSessionController())->start();
    exit;
}

if ($routeKey === 'POST /api/sessions/attempt') {
    (new PracticeSessionController())->attempt();
    exit;
}

if (preg_match('#^/api/sessions/(\d+)/check$#', $cleanedUri, $matches)) {
    (new PracticeSessionController())->checkSession($matches[1]);
    exit;
}

if (preg_match('#^/api/sessions/(\d+)/end$#', $cleanedUri, $matches)) {
    (new PracticeSessionController())->end($matches[1]);
    exit;
}
