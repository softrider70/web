# Französische Verben - Webanwendung

Webanwendung zum Abfragen französischer Verben auf Synology DS918. Vollständig client-seitig mit localStorage für Statistiken.

## Funktionen
- **Quiz-Modi:** Deutsch-Französisch, Französisch-Deutsch, gemischt, Multiple Choice
- **Unit-Auswahl:** Checkboxen für verschiedene Verb-Units, zufällige Vorauswahl beim Start
- **Keyboard-Navigation:** Return-Taste prüft Antwort, zweites Return springt zur nächsten Frage
- **Statistiken:** Client-seitig im localStorage gespeichert (max. 200 Einträge)
- **Versionierung:** Deploy-Version wird auf jeder Seite angezeigt
- **Responsive Design:** Mobile-freundliche Oberfläche

## Projektstruktur
```
franzoesische-verben/
├── index.html          # Hauptseite mit Quiz-Interface
├── data/               # Verb-Dateien nach Units und Volets
├── css/style.css       # Stylesheet
├── js/
│   ├── quiz.js         # Quiz-Logik
│   └── version.js      # Deploy-Version
├── api/                # PHP-API für serverseitige History (optional)
├── deploy.sh           # Deployment-Skript
└── README.md
```

## Datenformat
Verben müssen als JSON-Dateien im `data/` Verzeichnis liegen:

```json
[
    {
        "deutsch": "(jdn/etw.) vorstellen",
        "franzosisch": "présenter qn/qc",
        "person": "ich stelle vor",
        "conjugation": "je présente",
        "type": "regelmäßiges Verb (-er)"
    }
]
```

## Deployment

### Automatisches Deployment
```bash
bash deploy.sh
```
- Erstellt Deploy-Version (Format: YYYYMMDD-HHMMSS)
- Kopiert Dateien via tar+ssh zur Synology
- Setzt Berechtigungen

### SSH-Zugriff
- **Host:** 192.168.1.10
- **User:** ds918admin
- **SSH-Key:** ~/.ssh/id_ed25519_ds918_new
- **Remote Path:** /volume1/web/franzoesische-verben
- **Web-URL:** http://192.168.1.10/franzoesische-verben/

### SSH-Einrichtung (falls nötig)
```bash
# SSH-Key erstellen
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_ds918_new -N ""

# Berechtigungen setzen (wichtig!)
chmod 600 ~/.ssh/id_ed25519_ds918_new
chmod 644 ~/.ssh/id_ed25519_ds918_new.pub
chmod 700 ~/.ssh

# Public Key kopieren
ssh-copy-id -i ~/.ssh/id_ed25519_ds918_new.pub ds918admin@192.168.1.10

# Verbindung testen
ssh -i ~/.ssh/id_ed25519_ds918_new ds918admin@192.168.1.10 "echo 'SSH-Verbindung erfolgreich'"
```

## Wichtige Hinweise
- **Keine PHP-Abhängigkeiten:** Vollständige client-seitige Funktionalität
- **History-Speicherung:** Client-seitig (localStorage), optional serverseitig über API
- **localStorage-Grenze:** Maximal 200 Quiz-Einträge
- **Deployment:** Immer `deploy.sh` für konsistente Versionierung verwenden
- **Mobile-Testing:** Cache leeren mit `Strg + F5` nach Updates

## Technische Details
- **JavaScript-Architektur:** VerbQuiz Klasse mit zentraler Quiz-Logik
- **UI-Features:** Fokus-Management, responsive Design, mobile Optimierung
- **Sonderzeichen:** Flexible Validierung mit Akzenten und Umlauten
- **Unit-Verwaltung:** Dynamische Erkennung verfügbarer JSON-Dateien

## Aktuelle Herausforderungen
- **iOS/Mobile:** Tastatur-Optimierung mit kompaktem Layout
- **Sonderzeichen:** Tolerante Validierung für Akzente und Umlaute
- **Performance:** Lazy Loading für große JSON-Dateien geplant
