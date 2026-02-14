---
description: Webseiten auf Synology DS918+ deployen
---

# Web Deployment Workflow für Synology DS918+

## Verwendung
/web-deploy

## Voraussetzungen
- SSH-Zugriff auf Synology DS918+
- Benutzer: ds918admin
- IP: 192.168.1.10

## Schritte

### 1. Projekt vorbereiten
Stelle sicher, dass alle Web-Dateien im `test-website/` Ordner liegen:
- index.html
- test.php
- phpinfo.php
- test-db.php

### 2. SSH-Verbindung testen
```bash
ssh ds918admin@192.168.1.10 "echo 'Verbindung OK'"
```

### 3. Zielverzeichnis erstellen
```bash
ssh ds918admin@192.168.1.10 "mkdir -p /volume1/web/test-site"
```

### 4. Dateien übertragen
```bash
# Methode 1: PowerShell Skript
.\transfer.ps1

# Methode 2: Manuelles SCP
scp -r test-website/* ds918admin@192.168.1.10:/volume1/web/test-site/

# Methode 3: Pipe Methode (falls scp fehlschlägt)
type test-website\index.html | ssh ds918admin@192.168.1.10 "cat > /volume1/web/test-site/index.html"
type test-website\test.php | ssh ds918admin@192.168.1.10 "cat > /volume1/web/test-site/test.php"
type test-website\phpinfo.php | ssh ds918admin@192.168.1.10 "cat > /volume1/web/test-site/phpinfo.php"
type test-website\test-db.php | ssh ds918admin@192.168.1.10 "cat > /volume1/web/test-site/test-db.php"
```

### 5. Berechtigungen setzen
```bash
ssh ds918admin@192.168.1.10 "chown -R ds918admin:http /volume1/web/test-site"
ssh ds918admin@192.168.1.10 "chmod 755 /volume1/web/test-site/*.php"
ssh ds918admin@192.168.1.10 "chmod 755 /volume1/web/test-site/*.html"
```

### 6. Webserver testen
```bash
# HTML Test
curl -I http://192.168.1.10/test-site/

# PHP Test
curl -I http://192.168.1.10/test-site/test.php
```

### 7. Browser-Test
Öffne im Browser:
- http://192.168.1.10/test-site/
- http://192.168.1.10/test-site/test.php

### 8. Aufräumen (Sicherheit)
```bash
# Nach erfolgreichem Test
ssh ds918admin@192.168.1.10 "rm /volume1/web/test-site/phpinfo.php"
```

## Fehlerbehebung

### SSH-Verbindungsprobleme
- SSH-Dienst in DSM aktivieren
- Benutzerrechte prüfen
- Firewall Einstellungen

### PHP Error 500
- WebStation konfigurieren
- PHP-Profil auswählen
- Virtuellen Host erstellen

### Dateiberechtigungen
```bash
# Berechtigungen zurücksetzen
ssh ds918admin@192.168.1.10 "sudo chown -R http:http /volume1/web/test-site"
```

## Nützliche Befehle

### Apache/Nginx Status
```bash
# Apache
sudo /usr/syno/sbin/synopkgctl status Apache2.4

# Nginx
sudo systemctl reload nginx
```

### PHP-FPM Status
```bash
ps aux | grep php-fpm
```

### Logs prüfen
```bash
# Nginx Fehler
sudo tail -20 /var/log/nginx/error.log

# PHP-FPM Fehler
sudo tail -20 /var/log/php*/error.log
```

## Automatisierung

### Vollautomatisches Deployment
```powershell
# deploy.ps1 Skript erstellen
Write-Host "Starte Web Deployment..."
ssh ds918admin@192.168.1.10 "mkdir -p /volume1/web/test-site"
Get-ChildItem "test-website\*" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content | ssh ds918admin@192.168.1.10 "cat > /volume1/web/test-site/$($_.Name)"
}
ssh ds918admin@192.168.1.10 "chown -R ds918admin:http /volume1/web/test-site"
Write-Host "Deployment abgeschlossen!"
```

---

**Tipp:** Erstelle `.env` Datei mit Zugangsdaten für automatisierte Skripte.
