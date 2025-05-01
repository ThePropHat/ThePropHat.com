<?php
$name = htmlspecialchars($_POST['name']);
$message = htmlspecialchars($_POST['message']);

if ($name && $message) {
    $entry = "<strong>" . $name . "</strong><br>" . nl2br($message) . "<br><em>" . date("Y-m-d H:i:s") . "</em>\n";
    file_put_contents("entries.txt", $entry . "\n", FILE_APPEND);
}

header("Location: index.html");
exit();
?>