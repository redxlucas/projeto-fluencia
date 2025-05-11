<?php 
    require_once __DIR__ . '/../traits/Getter.php';
    require_once __DIR__ . '/../traits/Constructor.php';

    class Phrase {

        use Getter, Constructor;

        private $id;
        private $phrase;
        private $translation;
        private $difficult;

        // public function __construct($data = null){
        //     if($data) {
        //         $this->id = isset($data['id']) ? (int) $data['id'] : null;
        //         $this->phrase = $data['phrase'] ?? null;
        //         $this->translation = $data['translation'] ?? null;
        //         $this->difficult = $data['difficult'] ?? null;
        //     }
        // }

        public static function getRandomPhrase() {
            $db = Database::connect();
            $stmt = $db->query("SELECT * FROM phrases ORDER BY RAND() LIMIT 1");
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            return $result ? new Phrase($result) : null;
        }

        public static function checkAnswer($id, $answer) {
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
?>