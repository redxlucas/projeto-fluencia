<?php
require_once '../helpers/Autoload.php';

class PhraseController
{
    public static function getRandomPhrase()
    {
        $randomPhrase = Phrase::getRandomPhrase();

        if ($randomPhrase == null) {
            http_response_code(404);
            echo json_encode(['error' => 'Frase não encontrada']);
            return;
        }

        header('Content-Type: application/json');
        echo json_encode([
            'id' => $randomPhrase->getId(),
            'phrase' => $randomPhrase->getPhrase(),
            'translation' => $randomPhrase->getTranslation(),
            'difficult' => $randomPhrase->getDifficult()
        ]);
    }

    public static function getPhrase(int $phraseId)
    {
        $userId = AuthMiddleware::requireAuth();

        $phrase = Phrase::getOne($phraseId);

        if (!$phrase) {
            http_response_code(404);
            echo json_encode(['error' => 'Frase não encontrada']);
            return;
        }

        echo json_encode([
            'id' => $phrase->getId(),
            'phrase' => $phrase->getPhrase(),
            'translation' => $phrase->getTranslation(),
            'difficult' => $phrase->getDifficult(),
        ]);
    }
}
