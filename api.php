<?
include('config.php');

$url = 'https://uclapi.com/workspaces/sensors/summary?token=' . $token;

/* Forward POST on to the API: */
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
if($type == "post"){
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
}
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

echo curl_exec($ch);

exit;
?>