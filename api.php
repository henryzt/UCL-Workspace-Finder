<?php
include('config.php');

$url = 'https://uclapi.com/workspaces/sensors/summary?token=' . $token;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

echo curl_exec($ch);

exit;
?>