<?php
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    require '../../vendor/autoload.php';

    class SecurityConfig {
        private $key = "teste";
        private $token;

        function generateToken($user) {
            $payload = [
                "id" => $user->getId(),
                "username" => $user->getUsername(),
                "exp" => time() + 3600
            ];

            $jwt = JWT::encode($payload, self::$key, 'HS256');
            echo json_encode(["token" => $jwt]);
        }

        function verifyToken() {
            try {
                $data = JWT::decode($this->token, new Key($this->key, 'HS256'));
                echo "Usuário: " . $data->username; 
            } catch(Exception $e) {
                echo "Token inválido!";
            }
        }
    }
?>