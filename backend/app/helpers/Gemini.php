<?php
require_once 'loadEnv.php';

loadEnv(__DIR__ . '/../.env');

function requestApi($prompt)
{
    $key = $_ENV['API_KEY'];

    $data = [
        'contents' => [
            [
                'parts' => [
                    ['text' => $prompt]
                ]
            ]
        ]
    ];

    $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' . $key;
    $headers = [
        'Content-Type: application/json'
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));


    $response = curl_exec($ch);


    if ($response === false) {
        echo curl_error($ch);
    }


    $objeto  = json_decode($response);
    // print_r($objeto);
    $final = $objeto->candidates[0]->content->parts[0]->text;

    curl_close($ch);
    return $final;
}
