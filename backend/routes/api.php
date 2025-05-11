<?php
    require_once '../app/controllers/PhraseController.php';

    $method = $_SERVER['REQUEST_METHOD'];
    $parsedUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    $cleanedUri = preg_replace('#^/[^/]+/api#', '/api', $parsedUri);
    $routeKey = "$method $cleanedUri";

    switch ($routeKey) {
        case 'GET /api/phrases/random':
            PhraseController::getRandomPhrase();
            break;

        case 'POST /api/phrases/check':
            (new PhraseController())->checkAnswer();
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Rota não encontrada']);
    }

