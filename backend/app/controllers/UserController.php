<?php
require_once __DIR__ . '/../helpers/Autoload.php';

class UserController
{
    public function login()
    {
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);

        if (
            !isset($data['email'], $data['password']) ||
            !filter_var($data['email'], FILTER_VALIDATE_EMAIL) ||
            strlen($data['password']) < 6
        ) {
            http_response_code(400);
            echo json_encode(['error' => 'Dados inválidos']);
            return;
        }

        $user = new User($data);

        $token = $user->login();

        if ($token === null) {
            http_response_code(401);
            echo json_encode(['error' => 'Credenciais inválidas']);
            return;
        }

        echo json_encode(['token' => $token]);
    }

    public function register()
    {
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);

        if (
            !isset($data['name'], $data['email'], $data['password']) ||
            !filter_var($data['email'], FILTER_VALIDATE_EMAIL) ||
            strlen($data['password']) < 6
        ) {
            http_response_code(400);
            echo json_encode(['error' => 'Dados inválidos']);
            return;
        }

        $user = new User($data);

        if ($user->emailExists()) {
            http_response_code(409);
            echo json_encode(['error' => 'E-mail já cadastrado']);
            return;
        }

        $user->setPassword($data['password']);

        if (!$user->save()) {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao cadastrar usuário']);
            return;
        }

        header('Content-Type: application/json');
        http_response_code(201);
        echo json_encode(['message' => 'Usuário cadastrado com sucesso']);
    }
}
