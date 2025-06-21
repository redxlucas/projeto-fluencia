<?php
    require_once '../helpers/Autoload.php';

    class CategoryController {
        public static function getAll() {
            $categories = Category::getAll();

            if($categories == null) {
                http_response_code(404);
                echo json_encode(['error' => 'Categorias não encontradas']);
                return;
            }

            $response = [];

            foreach ($categories as $category) {
                $response[] = [
                    'id' => $category->getId(),
                    'name' => $category->getName()
                ];
            }

            header('Content-Type: application/json');
            echo json_encode($response);
    }
}