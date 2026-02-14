<?php
// PHP Test-Seite für Apache 2.4 auf Synology
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Test - Apache 2.4</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1000px;
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
        .info {
            background: #e3f2fd;
            padding: 15px;
            margin: 10px 0;
            border-left: 4px solid #2196F3;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background: #f2f2f2;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🐘 PHP Test-Seite</h1>
        
        <div class="info">
            <h3>PHP Status</h3>
            <p>PHP Version: <span class="success"><?php echo phpversion(); ?></span></p>
            <p>Server: <?php echo $_SERVER['SERVER_SOFTWARE']; ?></p>
            <p>Datum/Zeit: <?php echo date('d.m.Y H:i:s'); ?></p>
        </div>

        <h3>Server Informationen</h3>
        <table>
            <tr><th>Parameter</th><th>Wert</th></tr>
            <tr><td>Server Name</td><td><?php echo $_SERVER['SERVER_NAME']; ?></td></tr>
            <tr><td>Server Port</td><td><?php echo $_SERVER['SERVER_PORT']; ?></td></tr>
            <tr><td>Document Root</td><td><?php echo $_SERVER['DOCUMENT_ROOT']; ?></td></tr>
            <tr><td>PHP Memory Limit</td><td><?php echo ini_get('memory_limit'); ?></td></tr>
            <tr><td>Max Execution Time</td><td><?php echo ini_get('max_execution_time'); ?>s</td></tr>
            <tr><td>Upload Max Filesize</td><td><?php echo ini_get('upload_max_filesize'); ?></td></tr>
        </table>

        <h3>Erweiterte PHP-Informationen</h3>
        <p><a href="phpinfo.php">Vollständige phpinfo() anzeigen</a></p>

        <h3>Datenbank-Verbindungstest</h3>
        <p><a href="test-db.php">Datenbank-Verbindung testen</a></p>

        <div class="info">
            <h3>✅ Testergebnis</h3>
            <p>PHP funktioniert korrekt auf deinem Apache 2.4 Server!</p>
        </div>
    </div>
</body>
</html>
