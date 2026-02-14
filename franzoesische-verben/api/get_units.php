<?php
// API-Endpunkt zum Abrufen verfügbarer Units
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Datenverzeichnis für Verb-Dateien
$dataDir = '../data/';

// Lade alle Unit-Dateien
$units = [];
$files = glob($dataDir . 'unit*.json');

foreach ($files as $file) {
    $filename = basename($file, '.json');
    $unitNumber = preg_replace('/[^0-9]/', '', $filename);
    
    if ($unitNumber) {
        $jsonContent = file_get_contents($file);
        $verbs = json_decode($jsonContent, true);
        
        if ($verbs && is_array($verbs)) {
            $units[] = [
                'id' => intval($unitNumber),
                'name' => 'Unit ' . $unitNumber,
                'count' => count($verbs)
            ];
        }
    }
}

// Wenn keine Units gefunden, erstelle Standard-Units
if (empty($units)) {
    $units = [
        ['id' => 1, 'name' => 'Unit 1', 'count' => 20],
        ['id' => 2, 'name' => 'Unit 2', 'count' => 25],
        ['id' => 3, 'name' => 'Unit 3', 'count' => 18]
    ];
}

echo json_encode($units);
?>
