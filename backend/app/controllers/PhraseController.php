<?php
    require_once '../helpers/Autoload.php';

    class PhraseController {
        public static function getRandomPhrase() {
            $randomPhrase = Phrase::getRandomPhrase();

            if($randomPhrase == null) {
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

        public function checkAnswer() {
            $data = json_decode(file_get_contents('php://input'), true);

            $phraseId = $data['phraseId'] ?? null;
            $answer = $data['answer'] ?? null;

            if (is_null($phraseId) || is_null($answer)) {
                http_response_code(400);
                echo json_encode(['error' => 'ID da frase ou resposta não fornecidos']);
                return;
            }

            try {
                $isCorrect = Phrase::checkAnswer($phraseId, $answer);

                echo json_encode(['is_correct' => $isCorrect]);
            } catch (Exception $e) {

            }
        }
    }
?>  