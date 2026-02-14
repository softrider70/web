# PowerShell Skript zur Uebertragung der Test-Website auf Synology

Write-Host "Test-Website auf Synology uebertragen" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$synology_ip = Read-Host "Gib deine Synology IP-Adresse ein"

if ([string]::IsNullOrEmpty($synology_ip)) {
    Write-Host "Fehler: IP-Adresse erforderlich!" -ForegroundColor Red
    Read-Host "Enter zum Beenden"
    exit 1
}

Write-Host ""
Write-Host "Uebertrage Dateien nach $synology_ip..." -ForegroundColor Yellow
Write-Host ""

try {
    # Pruefen ob scp verfuegbar ist
    $scp_test = Get-Command scp -ErrorAction SilentlyContinue
    if (-not $scp_test) {
        Write-Host "Fehler: scp nicht gefunden. Installiere OpenSSH oder Git Bash." -ForegroundColor Red
        Read-Host "Enter zum Beenden"
        exit 1
    }

    # Dateien uebertragen
    $result = & scp -r "test-website\*" "ds918admin@$synology_ip`:/volume1/web/test-site/" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Uebertragung erfolgreich!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Zugriff im Browser:" -ForegroundColor Cyan
        Write-Host "- Hauptseite: http://$synology_ip/test-site/" -ForegroundColor White
        Write-Host "- PHP Test:   http://$synology_ip/test-site/test.php" -ForegroundColor White
        Write-Host "- PHP Info:   http://$synology_ip/test-site/phpinfo.php" -ForegroundColor White
        Write-Host "- DB Test:    http://$synology_ip/test-site/test-db.php" -ForegroundColor White
        Write-Host ""
        Write-Host "⚠️  Wichtig: phpinfo.php nach Test entfernen (sensible Daten!)" -ForegroundColor Yellow
    } else {
        Write-Host ""
        Write-Host "❌ Uebertragung fehlgeschlagen!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Moegliche Ursachen:" -ForegroundColor Yellow
        Write-Host "- SSH nicht aktiviert auf Synology" -ForegroundColor White
        Write-Host "- Falsche IP-Adresse" -ForegroundColor White
        Write-Host "- Firewall blockiert Verbindung" -ForegroundColor White
        Write-Host "- SSH-Passwort falsch" -ForegroundColor White
        Write-Host ""
        Write-Host "Fehlerdetails: $result" -ForegroundColor Gray
    }
} catch {
    Write-Host ""
    Write-Host "❌ Fehler bei der Uebertragung: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Read-Host "Enter zum Beenden"
