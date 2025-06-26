<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

file_put_contents('debug.log', $_SERVER['REQUEST_URI'] . PHP_EOL, FILE_APPEND);

require_once '../app/routes/api.php';
