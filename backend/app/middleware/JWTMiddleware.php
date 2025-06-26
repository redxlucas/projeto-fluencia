<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../../vendor/autoload.php';

class JWTMiddleware
{
    public static function authenticate(): ?array
    {
        $headers = apache_request_headers();

        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Token não enviado']);
            exit;
        }

        $authHeader = $headers['Authorization'];

        if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            http_response_code(401);
            echo json_encode(['error' => 'Token inválido']);
            exit;
        }

        $jwt = $matches[1];
        $secret = 'teste'; // trocar aqui

        try {
            $decoded = JWT::decode($jwt, new Key($secret, 'HS256'));
            return (array) $decoded;
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(['error' => 'Token expirado ou inválido']);
            exit;
        }
    }
}
