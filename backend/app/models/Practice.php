<?php

require_once __DIR__ . '/../core/Database.php';
require_once __DIR__ . '/../traits/Getter.php';
require_once __DIR__ . '/../traits/Constructor.php';

class Practice
{
    use Getter, Constructor;

    private int $id;
    private string $userInput;
    private ?bool $isCorrect;
    private string $answeredAt;
    private string $createdAt;
    private int $userId;
    private int $phraseId;
    private int $practiceSessionId;


    public function save(): bool
    {
        $db = Database::connect();

        $this->createdAt = date('Y-m-d H:i:s');
        $this->answeredAt = date('Y-m-d H:i:s');

        $stmt = $db->prepare("
        INSERT INTO practices 
        (user_input, is_correct, answered_at, created_at, user_id, phrase_id, practice_session_id)
        VALUES (:user_input, :is_correct, :answered_at, :created_at, :user_id, :phrase_id, :practice_session_id)
    ");

        $success = $stmt->execute([
            ':user_input' => $this->userInput,
            ':is_correct' => $this->isCorrect ? 1 : 0,
            ':answered_at' => $this->answeredAt,
            ':created_at' => $this->createdAt,
            ':user_id' => $this->userId,
            ':phrase_id' => $this->phraseId,
            ':practice_session_id' => $this->practiceSessionId,
        ]);

        if (!$success) {
            $errorInfo = $stmt->errorInfo();
            var_dump('Save Practice failed: ' . print_r($errorInfo, true));
        }

        return $success;
    }

    public function getAllByPracticeSessionId(int $practiceSessionId): array
    {
        $db = Database::connect();
        $sql = "SELECT * FROM practices WHERE practice_session_id = :practiceSessionId ORDER BY answered_at ASC";
        $stmt = $db->prepare($sql);
        $stmt->execute(['practiceSessionId' => $practiceSessionId]);
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }
}
