# Französische Verben - Webanwendung

## Projektbeschreibung
Webanwendung zum Abfragen französischer Verben auf Synology DS918 mit Nginx/PHP-FPM. Die Anwendung verwendet client-seitige JavaScript-Logik mit localStorage für Statistiken.

## Funktionen
- **Quiz-Modi:**
  - Deutsch-Französisch
  - Französisch-Deutsch  
  - Automatisch gemischt
  - Multiple Choice (5 Wörter zur Auswahl)
- **Unit-Auswahl:** Checkboxen für verschiedene Verb-Units (Unit 1-3)
- **Zufällige Vorauswahl:** Beim Seitenstart werden zufällig Units vorausgewählt (mindestens eine)
- **Keyboard-Navigation:** Return-Taste prüft Antwort, zweites Return springt zur nächsten Frage
- **Statistiken:** Historische Quiz-Ergebnisse in localStorage gespeichert, tabellarische Ansicht
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
├── test.html           # Testseite
├── data/               # Verb-Dateien nach Units und Volets
│   ├── unit1_volet1.json
│   ├── unit3_volet3.json
│   └── ...
├── css/
│   └── style.css
├── js/
│   └── quiz.js
└── README.md
```

## Fortschritt

### ✅ Erledigt
- [x] Projektstruktur angelegt
- [x] HTML-Grundgerät mit Checkbox-Unit-Auswahl
- [x] JavaScript-Quiz-Logik implementiert
- [x] Verb-Daten direkt in JavaScript eingebettet (PHP-Umgehung)
- [x] Return-Taste für Antwortprüfung und Weiterleitung
- [x] localStorage für Quiz-Historie implementiert
- [x] Tabellarische Statistik-Ansicht mit korrekter Ausrichtung
- [x] Zufällige Unit-Vorauswahl beim Seitenstart
- [x] Deploy-Versionierung mit Cache-Busting
- [x] SSH-Deployment mit tar+ssh statt rsync
- [x] Fokus-Management für verbesserte UX
- [x] Flexible Unit-Auswahl basierend auf verfügbaren JSON-Dateien

### 🔄 Aktuelle Implementierung
- **Frontend:** Reine JavaScript-Anwendung ohne PHP-Abhängigkeiten
- **Daten:** Verb-Daten werden dynamisch aus JSON-Dateien im data/-Verzeichnis geladen
- **Statistiken:** Client-seitig in localStorage (max. 200 Einträge)
- **Deployment:** Automatisches Deploy mit Versionierung
- **Unit-Erkennung:** Automatische Erkennung verfügbarer Unit-Dateien (unit1.json, unit1_volet1.json, unit3_volet3.json)

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

## Historie der Änderungen

### PHP-Probleme und Lösung
- **Problem:** PHP 500 Fehler auf Synology Nginx/PHP-FPM
- **Lösung:** Daten direkt in JavaScript eingebettet, PHP-APIs umgangen
- **Vorteil:** Schneller, keine Server-Abhängigkeiten, offline-fähig

### Deployment-Optimierungen
- **SSH-Key:** Korrekte Berechtigungen (600) und Windows-kompatible Pfade
- **Dateiübertragung:** tar+ssh statt rsync für bessere Kompatibilität
- **Versionierung:** Automatische Versionserstellung und Cache-Busting

### UX-Verbesserungen
- **Return-Taste:** Antwort prüfen → nächste Frage → Fokus auf Eingabe
- **Zufallsauswahl:** Mindestens eine Unit wird beim Start vorausgewählt
- **Statistiken:** Neueste Einträge oben, sortierte Tabelle

## Wichtige Hinweise
- **Keine PHP-Abhängigkeiten:** Vollständige client-seitige Funktionalität
- **localStorage-Grenze:** Maximal 200 Quiz-Einträge werden gespeichert
- **Browser-Kompatibilität:** Moderner Browser mit localStorage-Unterstützung erforderlich
- **Deployment:** Immer `deploy.sh` verwenden für konsistente Versionierung
