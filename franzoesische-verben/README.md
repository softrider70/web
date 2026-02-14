# Französische Verben - Webanwendung

## Projektbeschreibung
Webanwendung zum Abfragen französischer Verben auf Synology DS918. Die Anwendung verwendet client-seitige JavaScript-Logik mit localStorage für Statistiken - vollständig ohne PHP-Abhängigkeiten.

## Funktionen
- **Quiz-Modi:**
  - Deutsch-Französisch
  - Französisch-Deutsch  
  - Automatisch gemischt
  - Multiple Choice (5 Wörter zur Auswahl)
- **Unit-Auswahl:** Checkboxen für verschiedene Verb-Units (Unit 1-4)
- **Zufällige Vorauswahl:** Beim Seitenstart werden zufällig Units vorausgewählt (mindestens eine)
- **Keyboard-Navigation:** Return-Taste prüft Antwort, zweites Return springt zur nächsten Frage
- **Statistiken:** Quiz-Ergebnisse werden client-seitig im localStorage gespeichert (max. 200 Einträge). **Hinweis:** Ursprünglich war serverseitige Speicherung geplant, wurde aufgrund der "keine PHP-Abhängigkeiten"-Anforderung auf localStorage umgestellt.
- **Versionierung:** Deploy-Version wird auf jeder Seite angezeigt
- **Responsive Design:** Mobile-freundliche Oberfläche

## Datenverarbeitung und Dateistruktur

### Wichtige Hinweise zur Datenerstellung
- **Bilder als Datenquelle**: Alle Vokabeln werden aus Lehrbuch-Bildern extrahiert und für das data-Verzeichnis aufbereitet
- **JSON-Format erforderlich**: Verben müssen in das spezifische JSON-Format der Anwendung überführt werden mit den Feldern: deutsch, franzosisch, person, conjugation, type
- **Dateibenennung**: Unit-Volet-Dateinamen werden entweder manuell bestimmt oder aus der blauen Überschrift des Bildes gelesen (z.B. "Unité 1 Volet 1" → unit1_volet1.json)
- **Struktur**: Jede Unit kann mehrere Volets enthalten, die als separate JSON-Dateien abgelegt werden

### Beispiel JSON-Struktur
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

## Projektstruktur
```
franzoesische-verben/
├── index.html          # Hauptseite mit Quiz-Interface
├── data/               # Verb-Dateien nach Units und Volets
│   ├── unit1_volet1.json
│   ├── unit3_volet3.json
│   └── ...
├── css/
│   └── style.css
├── js/
│   └── quiz.js
├── deploy.sh           # Deployment-Skript für Synology
└── README.md
```

## Unit4 - Sonderzeichen-Übungen

### Zweck
Unit4 dient der gezielten Übung französischer Akzentzeichen und Sonderzeichen.

### Inhalt
- **Circumflex (^):** 9 Wörter (île, forêt, temple, fête, maître, hôte, fleuve, sœur)
- **Akut (´):** 13 Wörter (malade, école, café, menu, jouer, aimer, beau, écrire, apprendre, habiter, escalier, clé, petit-déjeuner)
- **Gravis (`):** 10 Wörter (d'où, là, déjà, seulement, devoir, depuis, pendant, mère, père, frère)

### Datenstruktur
Jedes Wort enthält:
- Deutsche Übersetzung
- Französisches Wort mit Akzent
- Akzent-Typ zur Identifikation
- Betroffener Vokal
- Spezielle Übungsaufgabe
- Beispielssatz

### Datei
`data/unit4_sonderzeichen.json` - 32 Übungen für französische Sonderzeichen

## Fortschritt

### ✅ Erledigt
- [x] Projektstruktur angelegt
- [x] HTML-Grundgerät mit Checkbox-Unit-Auswahl
- [x] JavaScript-Quiz-Logik implementiert
- [x] Verb-Daten direkt in JavaScript eingebettet
- [x] Return-Taste für Antwortprüfung und Weiterleitung
- [x] localStorage für Quiz-Historie implementiert
- [x] Tabellarische Statistik-Ansicht mit korrekter Ausrichtung
- [x] Zufällige Unit-Vorauswahl beim Seitenstart
- [x] Deploy-Versionierung mit Cache-Busting
- [x] SSH-Deployment mit tar+ssh statt rsync
- [x] Fokus-Management für verbesserte UX
- [x] Flexible Unit-Auswahl basierend auf verfügbaren JSON-Dateien
- [x] Unit4 für Sonderzeichen-Übungen erstellt (Circumflex ^, Akut ´, Gravis `)

### 🔄 Aktuelle Implementierung
- **Frontend:** Reine JavaScript-Anwendung ohne PHP-Abhängigkeiten
- **Daten:** Verb-Daten werden dynamisch aus JSON-Dateien im data/-Verzeichnis geladen
- **Statistiken:** Client-seitig in localStorage (max. 200 Einträge) aufgrund der "keine PHP-Abhängigkeiten"-Anforderung. Ursprünglich serverseitige Speicherung geplant.
- **Deployment:** Automatisches Deploy mit Versionierung
- **Unit-Erkennung:** Automatische Erkennung verfügbarer Unit-Dateien (unit1_volet1.json, unit3_volet3.json, unit4_sonderzeichen.json)

## Deployment

### Automatisches Deployment
```bash
bash deploy.sh
```
- Erstellt Deploy-Version (Format: YYYYMMDD-HHMMSS)
- Schreibt Version nach `js/version.js`
- Aktualisiert Cache-Busting-Parameter in HTML
- Kopiert Dateien via tar+ssh zur Synology
- Setzt Berechtigungen

### SSH-Zugriff
- **Host:** 192.168.1.10
- **User:** ds918admin
- **SSH-Key:** ~/.ssh/id_ed25519_ds918_new
- **Remote Path:** /volume1/web/franzoesische-verben
- **Web-URL:** http://192.168.1.10/franzoesische-verben/

### SSH-Einrichtung (wichtig für passwortlosen Zugriff)
**Falls SSH-Zugriff noch nicht konfiguriert ist - diese Schritte befolgen:**

1. **SSH-Key prüfen/erstellen:**
   ```bash
   # Prüfen ob Key existiert
   ls -la ~/.ssh/id_ed25519_ds918_new
   
   # Falls nicht vorhanden, erstellen:
   ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_ds918_new -N ""
   ```

2. **⚠️ WICHTIG: Berechtigungen setzen (häufige Fehlerquelle!):**
   ```bash
   chmod 600 ~/.ssh/id_ed25519_ds918_new
   chmod 644 ~/.ssh/id_ed25519_ds918_new.pub
   chmod 700 ~/.ssh
   ```

3. **Public Key zum Server kopieren:**
   ```bash
   ssh-copy-id -i ~/.ssh/id_ed25519_ds918_new.pub ds918admin@192.168.1.10
   ```

4. **Verbindung testen (vor Deployment!):**
   ```bash
   ssh -i ~/.ssh/id_ed25519_ds918_new ds918admin@192.168.1.10 "echo 'SSH-Verbindung erfolgreich'"
   ```

**🔧 Häufige Probleme & Lösungen:**
- **"Permission denied":** Berechtigungen prüfen (Schritt 2)
- **"Connection refused":** SSH-Dienst auf Synology aktivieren
- **"Host key verification failed":** `ssh-keygen -R 192.168.1.10`
- **Key funktioniert nicht:** Im deploy.sh wird der Key automatisch getestet

**💡 Merke:** Das deploy.sh Skript enthält einen SSH-Test und bricht bei Problemen ab!

### Versionierung
- Deploy-Version wird oben links auf jeder Seite angezeigt
- Format: YYYYMMDD-HHMMSS (z.B. 20260214-170204)
- Cache-Busting verhindert Laden alter JavaScript-Versionen

## Technische Details

### JavaScript-Architektur
- **VerbQuiz Klasse:** Zentrale Quiz-Logik
- **Eingebettete Daten:** VERB_DATA Objekt mit allen Verb-Informationen
- **Event-Handling:** Return-Taste, Button-Klicks, Fokus-Management
- **localStorage:** Quiz-Historie mit Datum, Units, Modus, Score

### UI-Features
- **Fokus-Management:** Automatischer Fokus auf Eingabefeld nach jeder Frage
- **Button-Fokus:** Nach Antwortprüfung Fokus auf "Nächste Frage"-Button
- **Tabellenlayout:** Fixe Spaltenbreiten für perfekte Ausrichtung
- **Responsive:** Mobile-optimiertes Design

### Datenstruktur
```javascript
// Beispiel für Verb-Daten
{
  infinitiv: "être",
  bedeutung: "sein",
  konjugationen: {
    present: ["je suis", "tu es", "il est"],
    passe_compose: ["j'ai été", "tu as été", "il a été"]
  },
  beispielsatz: "Je suis français."
}
```

## Aktuelle Herausforderungen und Lösungen

### iOS/Mobile Optimierung
- **Problem:** Tastatur nimmt 50% des Bildschirms ein, Inhalte nicht sichtbar
- **Lösung:** Kompaktes Layout mit Buttons über dem Input-Feld
- **Implementierung:** 
  - Mobile-spezifische CSS-Regeln mit `!important`
  - Flex-Layout für Input-Container mit `order`-Reihenfolge
  - Reduzierter Bottom-Padding (20px normal, 30px iOS)
  - Cache-Busting mit Version-Parametern

### Sonderzeichen-Validierung
- **Problem:** Akzente (ê, é, â) und Umlaute (ä, ö, ü, ß) führen zu Fehlern
- **Lösung:** Flexible Validierung mit Checkbox-Optionen
- **Implementierung:**
  - Zwei Checkboxen: "Akzente streng prüfen" und "Umlaute streng prüfen"
  - `normalizeAnswer()` Funktion entfernt Sonderzeichen bei deaktivierter Prüfung
  - Default: Beide Optionen deaktiviert für Tippfehler-Toleranz

### Dynamische Unit-Verwaltung
- **Problem:** Unit-Dateien umbenannt, feste Liste nicht mehr aktuell
- **Lösung:** Dynamische Dateierkennung mit Fallback
- **Implementierung:**
  - `knownFiles` Array mit aktuellen Dateien (unit1_volet1.json, unit3_volet3.json, unit4_*.json)
  - `convertVerbData()` für verschiedene JSON-Formate
  - qc/qn Entfernung in der Normalisierung

## Technische Erkenntnisse

### CSS-Prioritäten und Browser-Cache
- **Erkenntnis:** Mobile Media Queries ohne `!important` werden ignoriert
- **Lösung:** Alle Mobile-Stile mit `!important` erzwingen
- **Cache-Busting:** CSS-Datei mit `?v=YYYYMMDD-HHMM` Parameter neu laden

### Datenformat-Kompatibilität
- **Altes Format:** `deutsch/franzosisch` mit `conjugation` String
- **Neues Format:** `infinitiv/bedeutung` mit `konjugationen` Objekt
- **Konvertierung:** Automatische Erkennung und Umwandlung in einheitliches Format

### iOS-spezifische Herausforderungen
- **Tastatur-Verhalten:** `font-size: 16px` verhindert Zoom
- **Viewport:** `position: fixed` funktioniert nicht zuverlässig
- **Lösung:** Relative Positionierung mit Flex-Layout

## Offene Punkte

### History-Speicherung (Architektur-Entscheidung)
**Aktueller Status:** Client-seitige localStorage Speicherung
- **Vorteile:** Keine PHP-Abhängigkeiten, offline-fähig, schnell
- **Nachteile:** Pro Gerät getrennt, bei Cache-Löschung weg, 200 Einträge Limit

**Zukünftige Migration zu serverseitiger Speicherung:**
```php
// Geplante API-Endpunkte für zukünftige Implementation
/api/save_history.php    // Quiz-Ergebnis speichern
/api/get_history.php     // History abrufen
/api/export_history.php  // History als JSON exportieren
```

**Migrationsstrategie:**
1. **Hybrid-Ansatz:** localStorage + periodischer Server-Sync
2. **Export-Funktion:** History als JSON herunterladen und manuell sichern
3. **Volle Migration:** Serverseitige Speicherung mit PHP/JSON oder SQLite

**Technische Anforderungen für Server-Implementierung:**
- PHP-Endpunkte für History-CRUD Operationen
- JSON-Datei auf Server oder SQLite-Datenbank
- User-Identifikation (Cookie/IP) für History-Zuordnung
- Import/Export-Funktion für Datenmigration

### Performance-Optimierung
- **Große JSON-Dateien:** Unit4 mit 32 Sonderzeichen-Übungen
- **Mögliche Lösung:** Lazy Loading oder Datei-Aufteilung

### Erweiterbarkeit
- **Neue Units:** Automatische Erkennung zukünftiger Unit-Dateien
- **Konfiguration:** Admin-Interface für Unit-Verwaltung

### Accessibility
- **Screen Reader:** Verbesserte ARIA-Labels
- **Tastatur-Navigation:** Vollständige Steuerung ohne Touch

## Wichtige Hinweise
- **Keine PHP-Abhängigkeiten:** Vollständige client-seitige Funktionalität
- **History-Speicherung:** Aktuell client-seitig (localStorage), serverseitige Speicherung geplant (siehe "Offene Punkte")
- **localStorage-Grenze:** Maximal 200 Quiz-Einträge werden gespeichert
- **Browser-Kompatibilität:** Moderner Browser mit localStorage-Unterstützung erforderlich
- **Deployment:** Immer `deploy.sh` verwenden für konsistente Versionierung
- **Mobile-Testing:** Cache leeren mit `Strg + F5` oder `Cmd + Shift + R` nach Updates
