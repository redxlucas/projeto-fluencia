<?php

require_once __DIR__ . '/../traits/Getter.php';
require_once __DIR__ . '/../traits/Constructor.php';

class PracticeSession
{
    use Getter, Constructor;

    private int $id;
    private string $startedAt;
    private ?string $endedAt;
    private int $totalCorrect = 0;
    private int $totalAttempts = 0;
    private int $userId;

    public function start(int $userId, array $categoryIds): ?int
    {
        $db = Database::connect();
        $stmt = $db->prepare("INSERT INTO practice_sessions (user_id) VALUES (:user_id)");
        $stmt->execute(['user_id' => $userId]);
        $sessionId = $db->lastInsertId();

        $stmt = $db->prepare("INSERT INTO practice_session_categories (practice_session_id, category_id) VALUES (?, ?)");
        foreach ($categoryIds as $categoryId) {
            $stmt->execute([$sessionId, $categoryId]);
        }

        return $sessionId;
    }

    public function updateStats(int $sessionId, bool $isCorrect): void
    {
        $db = Database::connect();

        $stmt = $db->prepare("
            UPDATE practice_sessions
            SET 
                total_attempts = total_attempts + 1,
                total_correct = total_correct + :correct
            WHERE id = :id
        ");
        $stmt->execute([
            'correct' => $isCorrect ? 1 : 0,
            'id' => $sessionId
        ]);
    }

    public function end(int $sessionId): void
    {
        $db = Database::connect();
        $stmt = $db->prepare("UPDATE practice_sessions SET ended_at = NOW() WHERE id = :id");
        $stmt->execute([':id' => $sessionId]);
    }

    public function findOpenSessionByUser(int $userId)
    {
        $db = Database::connect();
        $sql = "SELECT * FROM practice_sessions WHERE user_id = :userId AND ended_at IS NULL LIMIT 1";
        $stmt = $db->prepare($sql);
        $stmt->execute(['userId' => $userId]);
        return $stmt->fetchObject();
    }

    public function findOpenSessionByIdAndUser(int $sessionId, int $userId)
    {
        $db = Database::connect();
        $sql = "SELECT * FROM practice_sessions WHERE id = :sessionId AND user_id = :userId AND ended_at IS NULL";
        $stmt = $db->prepare($sql);
        $stmt->execute(['sessionId' => $sessionId, 'userId' => $userId]);
        return $stmt->fetchObject();
    }

    public function getAllByUser(int $userId): array
    {
        $db = Database::connect();
        $sql = "SELECT * FROM practice_sessions WHERE user_id = :userId ORDER BY started_at DESC";
        $stmt = $db->prepare($sql);
        $stmt->execute(['userId' => $userId]);
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    public function getOneByIdAndUser(int $sessionId, int $userId)
    {
        $db = Database::connect();
        $sql = "SELECT * FROM practice_sessions WHERE id = :sessionId AND user_id = :userId LIMIT 1";
        $stmt = $db->prepare($sql);
        $stmt->execute(['sessionId' => $sessionId, 'userId' => $userId]);
        return $stmt->fetchObject();
    }

    public function findSessionByIdAndUser(int $sessionId, int $userId)
    {
        $db = Database::connect();
        $sql = "SELECT * FROM practice_sessions WHERE id = :sessionId AND user_id = :userId";
        $stmt = $db->prepare($sql);
        $stmt->execute(['sessionId' => $sessionId, 'userId' => $userId]);
        return $stmt->fetchObject();
    }
}
