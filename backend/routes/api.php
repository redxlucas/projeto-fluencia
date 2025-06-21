<?php
require_once '../app/controllers/PhraseController.php';
require_once __DIR__ . '/sessions.php';
require_once __DIR__ . '/users.php';
require_once __DIR__ . '/categories.php';

require_once '../helpers/Autoload.php';

switch ($routeKey) {
    case 'GET /api/phrases/random':
        PhraseController::getRandomPhrase();
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Rota não encontrada']);
}
