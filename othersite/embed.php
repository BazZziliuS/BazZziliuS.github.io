<?php
    $content = isset($_POST['content']) ? $_POST['content'] : '';
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $url = isset($_POST['url']) ? $_POST['url'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    
    if ($password == 'pass')
    {

        $webhookurl = $url;
        
        $timestamp = date("c", strtotime("now"));
        
        $json_data = json_encode([

            "username" => "Логирование Наказания",
            
            "embeds" => [
                [
                    "title" => "Логи",
                    "description" => $content,
                    "timestamp" => $timestamp,
                    "color" => hexdec( "ff5e40" ),
        
                ]
            ]
        
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
        
        $ch = curl_init( $webhookurl );
        curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
        curl_setopt( $ch, CURLOPT_POST, 1);
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $json_data);
        curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt( $ch, CURLOPT_HEADER, 0);
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);
        
        $response = curl_exec( $ch );
        curl_close( $ch );
    }
?>