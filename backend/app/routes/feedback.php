<?php

require_once __DIR__ . '/bootstrap.php';

require_once '../app/controllers/FeedbackController.php';

if ($routeKey === 'POST /api/feedback') {
    FeedbackController::sendFeedback();
    exit;
}
