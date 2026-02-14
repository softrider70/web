# Dateien auf Synology 192.168.1.10 hochladen

## Methode 1: File Station (empfohlen)

1. **Synology DSM öffnen**
2. **File Station starten**
3. Zum Web-Verzeichnis navigieren: `/volume1/web/`
4. **Neuen Ordner erstellen**: `test-site`
5. **Alle Dateien** aus `test-website` Ordner hochladen:
   - `index.html`
   - `test.php`
   - `phpinfo.php`
   - `test-db.php`

## Methode 2: SSH beheben & SCP verwenden

### SSH aktivieren:
1. Systemsteuerung → Terminal & SNMP
2. SSH-Dienst aktivieren ✓
3. Port 22 freigeben

### Admin-Account prüfen:
1. Systemsteuerung → Benutzer & Gruppe
2. Admin-Benutzer aktivieren
3. SSH-Zugriff erlauben

### Danach Übertragung:
```bash
scp -r test-website/* ds918admin@192.168.1.10:/volume1/web/test-site/
```

## Zugriff nach Upload

Öffne im Browser:
- **Hauptseite**: http://192.168.1.10/test-site/
- **PHP Test**: http://192.168.1.10/test-site/test.php
- **PHP Info**: http://192.168.1.10/test-site/phpinfo.php
- **DB Test**: http://192.168.1.10/test-site/test-db.php

## Fehlersuche

### Seite nicht erreichbar:
1. Apache 2.4 Paket installieren
2. Web Station konfigurieren
3. PHP-Version auswählen

### PHP funktioniert nicht:
1. PHP7/8 Paket installieren
2. In Web Station aktivieren

### 403 Forbidden:
```bash
# Per SSH Berechtigungen setzen
chmod 755 /volume1/web/test-site/*.php
chmod 755 /volume1/web/test-site/*.html
```

## Sicherheit

⚠️ **Nach Test phpinfo.php entfernen!**
```bash
rm /volume1/web/test-site/phpinfo.php
```
