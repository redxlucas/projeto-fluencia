<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");
// header("Content-Type: application/json");

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     http_response_code(200);
//     exit();
// }

// file_put_contents('debug.log', $_SERVER['REQUEST_URI'] . PHP_EOL, FILE_APPEND);

// require_once '../app/routes/api.php';

// Configura exibição e log de erros (em produção, display_errors deve ser 0)
ini_set('display_errors', 1);           // Exibir erros na tela (só para debug)
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Configura log de erros em arquivo debug.log (mesmo local do index.php)
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/debug.log');

// CORS e cabeçalhos comuns
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Responde rápido a OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Log simples do URI acessado
file_put_contents(__DIR__ . '/debug.log', "[" . date('Y-m-d H:i:s') . "] " . $_SERVER['REQUEST_METHOD'] . " " . $_SERVER['REQUEST_URI'] . PHP_EOL, FILE_APPEND);

try {
    // Inclui rotas principais
    require_once __DIR__ . '/../app/routes/api.php';
} catch (Throwable $e) {
    // Captura e loga qualquer erro fatal/parcial que ocorrer durante o require ou execução
    $msg = "[" . date('Y-m-d H:i:s') . "] ERRO FATAL: " . $e->getMessage() . " em " . $e->getFile() . ":" . $e->getLine() . PHP_EOL;
    file_put_contents(__DIR__ . '/debug.log', $msg, FILE_APPEND);

    // Retorna erro 500 e mensagem JSON para o cliente
    http_response_code(500);
    echo json_encode([
        "error" => "Erro interno do servidor",
        "message" => $e->getMessage()
    ]);
    exit();
}
