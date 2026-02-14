<?php
// API-Endpunkt zum Abrufen von Quiz-History
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Nur GET-Requests erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// History-Datei auf Server
$historyFile = '../data/history.json';

if (!file_exists($historyFile)) {
    echo json_encode([]);
    exit;
}

// History laden
$jsonContent = file_get_contents($historyFile);
if ($jsonContent === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to read history file']);
    exit;
}

$history = json_decode($jsonContent, true);
if (!is_array($history)) {
    http_response_code(500);
    echo json_encode(['error' => 'Invalid history file format']);
    exit;
}

// User-ID bestimmen (Cookie oder IP)
$userId = $_COOKIE['user_id'] ?? $_SERVER['REMOTE_ADDR'] ?? 'anonymous';

// History für aktuellen User filtern
$userHistory = array_filter($history, function($entry) use ($userId) {
    return isset($entry['user_id']) && $entry['user_id'] === $userId;
});

// Nach Datum absteigend sortieren (neueste zuerst)
usort($userHistory, function($a, $b) {
    return strtotime($b['timestamp']) - strtotime($a['timestamp']);
});

// Auf letzte 200 Einträge beschränken (wie localStorage)
$userHistory = array_slice($userHistory, 0, 200);

echo json_encode(array_values($userHistory));
?>
