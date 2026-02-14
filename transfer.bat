@echo off
echo Test-Website auf Synology uebertragen
echo =====================================
echo.

set /p synology_ip="Gib deine Synology IP-Adresse ein: "

if "%synology_ip%"=="" (
    echo Fehler: IP-Adresse erforderlich!
    pause
    exit /b 1
)

echo.
echo Uebertrage Dateien nach %synology_ip%...
echo.

scp -r "test-website\*" ds918admin@%synology_ip%:/volume1/web/test-site/

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Uebertragung erfolgreich!
    echo.
    echo Zugriff im Browser: http://%synology_ip%/test-site/
    echo.
    echo Test-Seiten:
    echo - Hauptseite: http://%synology_ip%/test-site/
    echo - PHP Test:   http://%synology_ip%/test-site/test.php
    echo - PHP Info:   http://%synology_ip%/test-site/phpinfo.php
    echo - DB Test:    http://%synology_ip%/test-site/test-db.php
) else (
    echo.
    echo ❌ Uebertragung fehlgeschlagen!
    echo.
    echo Moegliche Ursachen:
    echo - SSH nicht aktiviert auf Synology
    echo - Falsche IP-Adresse
    echo - Firewall blockiert Verbindung
    echo - SSH-Passwort falsch
)

echo.
pause
