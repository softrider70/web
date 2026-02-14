<?php
// API-Endpunkt zum Speichern von Quiz-History
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS-Request für CORS behandeln
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Nur POST-Requests erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// POST-Daten auslesen
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// Benötigte Felder prüfen
$required = ['date', 'units', 'mode', 'score'];
foreach ($required as $field) {
    if (!isset($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing field: $field"]);
        exit;
    }
}

// History-Datei auf Server
$historyFile = '../data/history.json';
$history = [];

// Existierende History laden
if (file_exists($historyFile)) {
    $jsonContent = file_get_contents($historyFile);
    if ($jsonContent !== false) {
        $history = json_decode($jsonContent, true) ?: [];
    }
}

// User-ID bestimmen (Cookie oder IP)
$userId = $_COOKIE['user_id'] ?? $_SERVER['REMOTE_ADDR'] ?? 'anonymous';

// Neuen Eintrag erstellen
$entry = [
    'id' => uniqid('hist_', true),
    'timestamp' => date('Y-m-d H:i:s'),
    'date' => $input['date'],
    'units' => $input['units'],
    'mode' => $input['mode'],
    'score' => (int)$input['score'],
    'user_id' => $userId,
    'ip_address' => $_SERVER['REMOTE_ADDR'],
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? ''
];

// Eintrag hinzufügen
$history[] = $entry;

// History-Datei speichern
$success = file_put_contents($historyFile, json_encode($history, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($success === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save history file']);
    exit;
}

// Erfolg zurückgeben
echo json_encode([
    'success' => true,
    'id' => $entry['id'],
    'timestamp' => $entry['timestamp'],
    'total_entries' => count($history)
]);
?>
