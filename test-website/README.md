# Apache 2.4 Test-Website für Synology DS918+

Diese Test-Website hilft dir zu überprüfen, ob dein Apache 2.4 Server auf der Synology korrekt funktioniert.

## Dateien

- `index.html` - Hauptseite mit Status-Informationen
- `test.php` - PHP-Funktionalitätstest
- `phpinfo.php` - Detaillierte PHP-Informationen
- `test-db.php` - Datenbank-Verbindungstest

## Installation auf Synology

### 1. Dateien kopieren
```bash
# Per SSH zur Synology verbinden
ssh admin@deine-synology-ip

# In das Web-Verzeichnis wechseln
cd /volume1/web

# Test-Verzeichnis erstellen
mkdir test-site

# Dateien hochladen (per SCP oder File Station)
# Oder direkt per wget von deinem PC
```

### 2. Per SCP kopieren (von deinem PC)
```bash
scp -r test-website/* admin@deine-synology-ip:/volume1/web/test-site/
```

### 3. Berechtigungen setzen
```bash
# Per SSH auf Synology
ssh admin@deine-synology-ip
cd /volume1/web/test-site
chmod 755 *.php *.html
```

### 4. Zugriff
Öffne im Browser:
- `http://deine-synology-ip/test-site/`
- `http://deine-synology-ip/test-site/test.php`
- `http://deine-synology-ip/test-site/phpinfo.php`
- `http://deine-synology-ip/test-site/test-db.php`

## Was wird getestet?

- ✅ HTML-Ausgabe
- ✅ CSS-Styling
- ✅ JavaScript-Funktionalität
- ✅ PHP-Version und Konfiguration
- ✅ Server-Informationen
- ✅ Datenbank-Verbindung (MariaDB/MySQL)

## Fehlersuche

### Apache nicht erreichbar
```bash
# Apache Status prüfen
sudo synoservicecfg --status pkgctl-Apache2.4

# Apache neustarten
sudo synoservicecfg --restart pkgctl-Apache2.4
```

### PHP funktioniert nicht
1. **PHP7-Paket installieren** über Paketzentrum
2. **Web Station** konfigurieren:
   - Öffne Web Station in DSM
   - Wähle PHP-Version aus
   - Aktiviere Erweiterungen

### Datenbank-Verbindung fehlgeschlagen
1. **MariaDB-Paket** installieren
2. In **Web Station** MariaDB aktivieren
3. Standard-Passwort für root ist leer

## Nützliche Pfade auf Synology

- **Web-Verzeichnis**: `/volume1/web`
- **Apache Config**: `/usr/local/etc/apache24/`
- **PHP Config**: `/usr/local/etc/php74/php.ini`
- **Apache Logs**: `/var/log/apache24/`
- **MariaDB**: `/var/services/mysql`

## Sicherheitshinweis

⚠️ **Wichtig:** Die `phpinfo.php` Datei enthält sensible Informationen und sollte nach dem Test wieder entfernt werden!

```bash
# Nach dem Test entfernen
rm /volume1/web/test-site/phpinfo.php
```
