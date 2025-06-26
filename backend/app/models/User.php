<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../traits/Getter.php';
require_once __DIR__ . '/../traits/Constructor.php';
require_once __DIR__ . '/../../vendor/autoload.php';

class User
{

    use Getter, Constructor;

    private int $id;
    private string $name;
    private string $email;
    private string $password;
    private string $createdAt;

    public function setPassword(string $password): void
    {
        $this->password = password_hash($password, PASSWORD_BCRYPT);
    }

    public function verifyPassword(string $password): bool
    {
        return password_verify($password, $this->password);
    }

    public function login()
    {
        $db = Database::connect();
        $stmt = $db->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
        $stmt->execute([':email' => $this->email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            return null;
        }

        if (!password_verify($this->password, $user['password'])) {
            return null;
        }

        $this->id = (int)$user['id'];
        $this->name = $user['name'];
        $this->email = $user['email'];
        $this->createdAt = $user['created_at'] ?? '';

        return $this->generateJWT("teste", 36000);
    }

    public function save(): bool
    {
        $db = Database::connect();
        $stmt = $db->prepare("
            INSERT INTO users (name, email, password)
            VALUES (:name, :email, :password)
        ");

        return $stmt->execute([
            ':name' => $this->name,
            ':email' => $this->email,
            ':password' => $this->password
        ]);
    }

    public function emailExists(): bool
    {
        $db = Database::connect();
        $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$this->email]);
        return (bool) $stmt->fetch();
    }

    private function generateJWT(string $secret, int $expirationSeconds = 3600): string
    {
        $now = time();
        $payload = [
            'iss' => 'echoen',
            'sub' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'iat' => $now,
            'exp' => $now + $expirationSeconds,
        ];

        return JWT::encode($payload, $secret, 'HS256');
    }

    private static function validateJWT(string $jwt, string $secret): ?array
    {
        try {
            $decoded = JWT::decode($jwt, new Key($secret, 'HS256'));
            return (array) $decoded;
        } catch (Exception $e) {
            return null;
        }
    }
}
