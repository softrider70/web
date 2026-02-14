<?php
// API-Endpunkt zum Abrufen von Verben für ausgewählte Units
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Datenverzeichnis für Verb-Dateien
$dataDir = '../data/';

// POST-Daten auslesen
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['units']) || !is_array($input['units'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige Anfrage']);
    exit;
}

$selectedUnits = $input['units'];
$allVerbs = [];

// Lade Verben für jede ausgewählte Unit
foreach ($selectedUnits as $unitId) {
    $filename = $dataDir . 'unit' . $unitId . '.json';
    
    if (file_exists($filename)) {
        $jsonContent = file_get_contents($filename);
        $verbs = json_decode($jsonContent, true);
        
        if ($verbs && is_array($verbs)) {
            $allVerbs['unit' . $unitId] = $verbs;
        }
    }
}

// Wenn keine echten Daten vorhanden, erstelle Beispieldaten
if (empty($allVerbs)) {
    $allVerbs = createSampleData($selectedUnits);
}

echo json_encode($allVerbs);

// Funktion zum Erstellen von Beispieldaten
function createSampleData($units) {
    $sampleData = [];
    
    // Beispieldaten für verschiedene Units
    $verbDatabase = [
        1 => [
            ['deutsch' => 'sein', 'franzosisch' => 'être', 'person' => 'ich bin', 'conjugation' => 'je suis'],
            ['deutsch' => 'haben', 'franzosisch' => 'avoir', 'person' => 'ich habe', 'conjugation' => 'j\'ai'],
            ['deutsch' => 'gehen', 'franzosisch' => 'aller', 'person' => 'ich gehe', 'conjugation' => 'je vais'],
            ['deutsch' => 'machen', 'franzosisch' => 'faire', 'person' => 'ich mache', 'conjugation' => 'je fais'],
            ['deutsch' => 'sagen', 'franzosisch' => 'dire', 'person' => 'ich sage', 'conjugation' => 'je dis']
        ],
        2 => [
            ['deutsch' => 'kommen', 'franzosisch' => 'venir', 'person' => 'ich komme', 'conjugation' => 'je viens'],
            ['deutsch' => 'sehen', 'franzosisch' => 'voir', 'person' => 'ich sehe', 'conjugation' => 'je vois'],
            ['deutsch' => 'wollen', 'franzosisch' => 'vouloir', 'person' => 'ich will', 'conjugation' => 'je veux'],
            ['deutsch' => 'können', 'franzosisch' => 'pouvoir', 'person' => 'ich kann', 'conjugation' => 'je peux'],
            ['deutsch' => 'müssen', 'franzosisch' => 'devoir', 'person' => 'ich muss', 'conjugation' => 'je dois']
        ],
        3 => [
            ['deutsch' => 'sprechen', 'franzosisch' => 'parler', 'person' => 'ich spreche', 'conjugation' => 'je parle'],
            ['deutsch' => 'essen', 'franzosisch' => 'manger', 'person' => 'ich esse', 'conjugation' => 'je mange'],
            ['deutsch' => 'trinken', 'franzosisch' => 'boire', 'person' => 'ich trinke', 'conjugation' => 'je bois'],
            ['deutsch' => 'schlafen', 'franzosisch' => 'dormir', 'person' => 'ich schlafe', 'conjugation' => 'je dors'],
            ['deutsch' => 'arbeiten', 'franzosisch' => 'travailler', 'person' => 'ich arbeite', 'conjugation' => 'je travaille']
        ]
    ];
    
    foreach ($units as $unitId) {
        if (isset($verbDatabase[$unitId])) {
            $sampleData['unit' . $unitId] = $verbDatabase[$unitId];
        }
    }
    
    return $sampleData;
}
?>
