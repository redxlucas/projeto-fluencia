<?php

require_once __DIR__ . '/JWTMiddleware.php';

class AuthMiddleware
{
    public static function requireAuth(): int
    {
        $jwtPayload = JWTMiddleware::authenticate();
        $userId = $jwtPayload['sub'] ?? null;

        if ($userId === null) {
            http_response_code(401);
            echo json_encode(['error' => 'Usuário não autenticado']);
            exit;
        }

        return (int) $userId;
    }
}
