<?php
require_once __DIR__ . '/../traits/Getter.php';
require_once __DIR__ . '/../traits/Constructor.php';

class Phrase
{

    use Getter, Constructor;

    private $id;
    private $phrase;
    private $translation;
    private $difficult;
    private $categories = [];

    public static function getRandomPhrase()
    {
        $db = Database::connect();
        $stmt = $db->query("SELECT * FROM phrases ORDER BY RAND() LIMIT 1");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result ? new Phrase($result) : null;
    }

    // public static function getRandomPhraseByCategory($categoryId)
    // {
    //     $db = Database::connect();
    //     $stmt = $db->prepare("
    //             SELECT p.* FROM phrases p
    //             INNER JOIN phrase_category pc ON p.id = pc.phrase_id
    //             WHERE pc.category_id = :categoryId
    //             ORDER BY RAND()
    //             LIMIT 1
    //         ");

    //     $result = $stmt->fetch(PDO::FETCH_ASSOC);

    //     $phrase = new Phrase($result);
    //     $phrase->categories = self::getAll($phrase->id);

    //     return $result ? new Phrase($result) : null;
    // }

    public static function getOne($id)
    {
        $db = Database::connect();
        $stmt = $db->prepare("SELECT * FROM phrases WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result ? new Phrase($result) : null;
    }

    public static function checkAnswer($id, $answer)
    {
        $db = Database::connect();
        $stmt = $db->prepare("SELECT * FROM phrases WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $phrase = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$phrase) {
            throw new Exception('Frase não encontrada.');
        }

        $correctTranslation = trim($phrase['translation']);
        $userAnswer = trim($answer);

        return strcasecmp($correctTranslation, $userAnswer) === 0;
    }
}
