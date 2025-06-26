<?php

require_once __DIR__ . '/bootstrap.php';

require_once '../app/controllers/PhraseController.php';

if (preg_match('#^/api/phrases/(\d+)$#', $cleanedUri, $matches)) {
    PhraseController::getPhrase($matches[1]);
    exit;
}

if ($routeKey === 'GET /api/phrases/random') {
    PhraseController::getRandomPhrase();
}
