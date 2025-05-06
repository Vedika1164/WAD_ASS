<?php
$file = "tasks.xml";
if (!file_exists($file)) file_put_contents($file, "<tasks></tasks>");

$xml = simplexml_load_file($file);

// If POST, modify tasks
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $data = simplexml_load_string($_POST['xml']);
  if ($data->action == "add") {
    $xml->addChild("item", $data->text);
  } elseif ($data->action == "delete") {
    unset($xml->item[(int)$data->index]);
  }
  $xml->asXML($file);
  exit;
}

// If GET, return task list
header("Content-Type: text/xml");
echo file_get_contents($file);
