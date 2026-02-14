<?php
// Health-Check API für History-Server
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Prüfe ob data-Verzeichnis beschreibbar ist
$dataDir = '../data';
$writable = is_dir($dataDir) && is_writable($dataDir);

// Prüfe ob history.json beschreibbar ist
$historyFile = '../data/history.json';
$historyWritable = file_exists($historyFile) ? is_writable($historyFile) : $writable;

$health = [
    'status' => 'ok',
    'timestamp' => date('Y-m-d H:i:s'),
    'server' => 'available',
    'data_directory' => [
        'exists' => is_dir($dataDir),
        'writable' => $writable,
        'path' => $dataDir
    ],
    'history_file' => [
        'exists' => file_exists($historyFile),
        'writable' => $historyWritable,
        'path' => $historyFile
    ],
    'php_version' => PHP_VERSION,
    'memory_limit' => ini_get('memory_limit'),
    'post_max_size' => ini_get('post_max_size')
];

echo json_encode($health, JSON_PRETTY_PRINT);
?>
