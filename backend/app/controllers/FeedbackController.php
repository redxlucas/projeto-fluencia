<?php
require_once __DIR__ . '/../helpers/Autoload.php';

class FeedbackController
{
    public static function sendFeedback()
    {
        header('Content-Type: application/json');
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: Content-Type");

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Método não permitido. Use POST.']);
            return;
        }

        $input = json_decode(file_get_contents('php://input'), true);

        if (!isset($input['feedback']) || trim($input['feedback']) === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Feedback não pode ser vazio.']);
            return;
        }

        $feedback = trim($input['feedback']);

        $to = 'lucassetem@gmail.com';
        $subject = 'Novo feedback do usuário - Sessão EchoEN';
        $message = "Feedback recebido:\n\n" . $feedback;
        $headers = "From: no-reply@echoen.com\r\n";
        $headers .= "Reply-To: no-reply@seusite.com\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(['success' => true, 'message' => 'Feedback enviado com sucesso.']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Falha ao enviar feedback.']);
        }
    }
}
