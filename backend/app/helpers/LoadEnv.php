<?php
    function loadEnv($path) {
        if (!file_exists($path)) {
            throw new Exception('.env file not found.');
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0 || strpos($line, '=') === false) {
                continue;
            }

            list($name, $value) = explode('=', $line, 2);
            putenv("$name=$value");
            $_ENV[trim($name)] = trim($value);
        }
    }
?>