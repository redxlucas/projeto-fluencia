<?php

require_once __DIR__ . '/../helpers/Autoload.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class PracticeSessionController
{

    public function start()
    {
        $userId = AuthMiddleware::requireAuth();
        $session = new PracticeSession();

        $openSession = $session->findOpenSessionByUser($userId);
        if ($openSession) {
            $session->end($openSession->id);
        }

        $input = json_decode(file_get_contents('php://input'), true);
        $categoryIds = $input['category_ids'] ?? [];

        if (empty($categoryIds)) {
            http_response_code(400);
            echo json_encode(['error' => 'Categorias obrigatórias']);
            return;
        }

        $sessionId = $session->start($userId, $categoryIds);

        echo json_encode(['session_id' => $sessionId]);
    }

    public function attempt()
    {
        $userId = AuthMiddleware::requireAuth();

        $input = json_decode(file_get_contents('php://input'), true);

        $userInput = $input['user_input'] ?? '';
        $phraseId = $input['phrase_id'] ?? null;
        $practiceSessionId = $input['practice_session_id'] ?? null;

        // if (empty($phraseId) || empty($practiceSessionId)) {
        //     http_response_code(400);
        //     echo json_encode(['error' => 'Dados incompletos']);
        //     return;
        // }

        try {
            $isCorrect = Phrase::checkAnswer($phraseId, $userInput);
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(['error' => $e->getMessage()]);
            return;
        }

        $practice = new Practice([
            'userInput' => $userInput,
            'isCorrect' => $isCorrect,
            'userId' => $userId,
            'phraseId' => $phraseId,
            'practiceSessionId' => $practiceSessionId
        ]);

        $success = $practice->save();

        if (!$success) {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao salvar tentativa']);
            return;
        }

        $session = new PracticeSession();
        $session->updateStats($practiceSessionId, $isCorrect);

        echo json_encode(['correct' => $isCorrect]);
    }

    public function checkSession(int $sessionId)
    {
        $userId = AuthMiddleware::requireAuth();

        $session = new PracticeSession();
        $sessionData = $session->findOpenSessionByIdAndUser($sessionId, $userId);

        if (!$sessionData) {
            http_response_code(400);
            echo json_encode(['error' => 'Sessão inválida ou já encerrada']);
            return;
        }

        echo json_encode(['valid' => true]);
    }

    public function end(int $sessionId)
    {
        $userId = AuthMiddleware::requireAuth();
        $session = new PracticeSession();

        $existingSession = $session->findOpenSessionByIdAndUser($sessionId, $userId);

        if (!$existingSession) {
            http_response_code(403);
            echo json_encode(['error' => 'Sessão não encontrada ou já encerrada']);
            return;
        }

        $session->end($sessionId);

        echo json_encode(['ended' => true]);
    }

    public function getAll()
    {
        $userId = AuthMiddleware::requireAuth();

        $session = new PracticeSession();
        $sessions = $session->getAllByUser($userId);

        echo json_encode($sessions);
    }

    public function getPractices(int $sessionId)
    {
        $userId = AuthMiddleware::requireAuth();

        $session = new PracticeSession();

        $existingSession = $session->findSessionByIdAndUser($sessionId, $userId);

        if (!$existingSession) {
            http_response_code(403);
            echo json_encode(['error' => 'Sessão não encontrada ou você não tem permissão']);
            return;
        }

        $practice = new Practice();
        $practicesList = $practice->getAllByPracticeSessionId($sessionId);

        echo json_encode($practicesList);
    }
}
