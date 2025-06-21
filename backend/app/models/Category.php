<?php
require_once __DIR__ . '/../traits/Getter.php';
require_once __DIR__ . '/../traits/Constructor.php';

class Category
{

    use Getter, Constructor;

    private $id;
    private $name;

    public static function getAll() {

        $db = Database::connect();

        $stmt = $db->prepare("SELECT * FROM categories");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach($result as $row) {
            $categories[] = new Category($row);
        }

        return $categories;
    }
}
