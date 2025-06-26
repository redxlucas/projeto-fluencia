<?php
require_once __DIR__ . '/../helpers/LoadEnv.php';
loadEnv('../.env');

class Database
{

    private static $connection;

    public static function connect()
    {
        $host = $_ENV['DB_HOST'];
        $name = $_ENV['DB_NAME'];
        $username = $_ENV['DB_USER'];
        $password = $_ENV['DB_PASSWORD'];

        try {
            self::$connection = new PDO("mysql:host=$host;dbname=$name;charset=utf8", $username, $password);
            self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return self::$connection;
        } catch (PDOException $e) {
            die('Conexão falhou: ' . $e->getMessage());
        }
    }
}
