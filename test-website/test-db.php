<?php
// Datenbank-Verbindungstest für Synology
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datenbank-Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .success {
            color: #4CAF50;
            font-weight: bold;
        }
        .error {
            color: #f44336;
            font-weight: bold;
        }
        .info {
            background: #e3f2fd;
            padding: 15px;
            margin: 10px 0;
            border-left: 4px solid #2196F3;
        }
        .warning {
            background: #fff3cd;
            padding: 15px;
            margin: 10px 0;
            border-left: 4px solid #ffc107;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🗄️ Datenbank-Verbindungstest</h1>
        
        <?php
        // MariaDB/MySQL Verbindungstest
        echo '<div class="info">';
        echo '<h3>MySQL/MariaDB Erweiterung</h3>';
        if (extension_loaded('mysqli')) {
            echo '<p class="success">✅ MySQLi Erweiterung ist geladen</p>';
        } else {
            echo '<p class="error">❌ MySQLi Erweiterung ist nicht geladen</p>';
        }
        
        if (extension_loaded('pdo_mysql')) {
            echo '<p class="success">✅ PDO MySQL Erweiterung ist geladen</p>';
        } else {
            echo '<p class="error">❌ PDO MySQL Erweiterung ist nicht geladen</p>';
        }
        echo '</div>';

        // Testverbindung zu localhost (Standard Synology MariaDB)
        $host = 'localhost';
        $user = 'root';
        $password = ''; // Standardmäßig leer bei Synology
        
        echo '<div class="info">';
        echo '<h3>Verbindungstest zu MariaDB/MySQL</h3>';
        
        try {
            $conn = new mysqli($host, $user, $password);
            
            if ($conn->connect_error) {
                echo '<p class="error">❌ Verbindung fehlgeschlagen: ' . $conn->connect_error . '</p>';
                echo '<div class="warning">';
                echo '<p><strong>Hinweis:</strong> Standardmäßig hat MariaDB auf Synology kein Passwort für root.</p>';
                echo '<p>Überprüfe die MariaDB-Einstellungen in der DSM Systemsteuerung.</p>';
                echo '</div>';
            } else {
                echo '<p class="success">✅ Verbindung erfolgreich hergestellt!</p>';
                echo '<p><strong>Server-Info:</strong> ' . $conn->server_info . '</p>';
                echo '<p><strong>Host:</strong> ' . $conn->host_info . '</p>';
                
                // Datenbanken auflisten
                $result = $conn->query("SHOW DATABASES");
                if ($result) {
                    echo '<h4>Verfügbare Datenbanken:</h4>';
                    echo '<ul>';
                    while ($row = $result->fetch_array()) {
                        if ($row[0] != 'information_schema' && $row[0] != 'performance_schema' && $row[0] != 'mysql') {
                            echo '<li>' . htmlspecialchars($row[0]) . '</li>';
                        }
                    }
                    echo '</ul>';
                }
            }
            $conn->close();
            
        } catch (Exception $e) {
            echo '<p class="error">❌ Fehler: ' . $e->getMessage() . '</p>';
        }
        
        echo '</div>';
        
        // PHP Erweiterungen anzeigen
        echo '<div class="info">';
        echo '<h3>Verfügbare Datenbank-Erweiterungen</h3>';
        $db_extensions = ['mysqli', 'pdo_mysql', 'pdo_sqlite', 'sqlite3'];
        foreach ($db_extensions as $ext) {
            if (extension_loaded($ext)) {
                echo '<p class="success">✅ ' . $ext . ' - Version: ' . phpversion($ext) . '</p>';
            } else {
                echo '<p class="error">❌ ' . $ext . ' - Nicht verfügbar</p>';
            }
        }
        echo '</div>';
        ?>

        <div class="info">
            <h3>📝 Konfiguration für Synology</h3>
            <p><strong>Standard MariaDB-Pfad:</strong> /var/services/mysql</p>
            <p><strong>Web-Verzeichnis:</strong> /volume1/web</p>
            <p><strong>PHP-Konfiguration:</strong> /usr/local/etc/php74/php.ini (oder PHP-Version)</p>
        </div>
    </div>
</body>
</html>
