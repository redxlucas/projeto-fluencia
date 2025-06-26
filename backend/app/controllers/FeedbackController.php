<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../helpers/LoadEnv.php';
require_once __DIR__ . '/../helpers/Autoload.php';
require_once __DIR__ . '/../../vendor/autoload.php';

loadEnv(__DIR__ . '/../.env');

class FeedbackController
{
    public static function sendFeedback()
    {
        header('Content-Type: application/json; charset=UTF-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST');
        header('Access-Control-Allow-Headers: Content-Type');

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Método não permitido. Use POST.']);
            exit;
        }

        $key = $_ENV['GOOGLE_PASSWORD'];
        $rawInput = file_get_contents('php://input');
        $input = json_decode($rawInput, true);

        if (json_last_error() !== JSON_ERROR_NONE || empty($input['feedback'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Feedback inválido ou ausente.']);
            exit;
        }

        $feedback = trim($input['feedback']);

        $fromEmail = 'lucassetem@gmail.com';
        $fromName = 'Lucas Azevedo';
        $toEmail = 'feedback.echoen@gmail.com';

        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->SMTPAuth = true;
            $mail->Host = 'smtp.gmail.com';
            $mail->Username = $fromEmail;
            $mail->Password = $key;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Configuração da mensagem
            $mail->setFrom($fromEmail, $fromName);
            $mail->addAddress($toEmail, 'Destinatário');

            $mail->isHTML(true);
            $mail->Subject = 'Novo feedback do usuário - Sessão EchoEN';
            $mail->Body = "<strong>Feedback:</strong><br>" . nl2br(htmlspecialchars($feedback));
            $mail->AltBody = "Feedback: " . $feedback;

            $mail->send();
            echo json_encode(['success' => true, 'message' => 'Feedback enviado com sucesso.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'error' => 'Erro ao enviar feedback.',
                'detail' => $mail->ErrorInfo,
            ]);
        }
    }
}
