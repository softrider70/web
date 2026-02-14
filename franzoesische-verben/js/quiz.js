// JavaScript für die französische Verben Abfrageanwendung

window.__FRANZOESISCHE_VERBEN_QUIZ_VERSION__ = '2026-02-14T16:20';
console.log('quiz.js version:', window.__FRANZOESISCHE_VERBEN_QUIZ_VERSION__);

// History-Konfiguration für serverseitige Speicherung mit Fallback
const HISTORY_CONFIG = {
    mode: 'hybrid',        // 'local', 'server', 'hybrid'
    fallback: true,        // Bei Server-Problemen automatisch zu local wechseln
    syncInterval: 5000,    // Sync alle 5 Sekunden versuchen
    maxRetries: 3,         // Nach 3 Fehlversuchen aufgeben
    serverTimeout: 3000    // Server-Timeout in Millisekunden
};

// User-ID System
function getUserId() {
    let userId = localStorage.getItem('user_id');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('user_id', userId);
        // Auch als Cookie für PHP-Zugriff setzen
        document.cookie = `user_id=${userId}; max-age=31536000; path=/`;
    }
    return userId;
}

// Verb-Daten direkt eingebettet
const VERB_DATA = {
    unit1: [
        {"deutsch": "sein", "franzosisch": "être", "person": "ich bin", "conjugation": "je suis", "type": "Hilfsverb"},
        {"deutsch": "haben", "franzosisch": "avoir", "person": "ich habe", "conjugation": "j'ai", "type": "Hilfsverb"},
        {"deutsch": "gehen", "franzosisch": "aller", "person": "ich gehe", "conjugation": "je vais", "type": "unregelmäßiges Verb"},
        {"deutsch": "machen", "franzosisch": "faire", "person": "ich mache", "conjugation": "je fais", "type": "unregelmäßiges Verb"},
        {"deutsch": "sagen", "franzosisch": "dire", "person": "ich sage", "conjugation": "je dis", "type": "unregelmäßiges Verb"},
        {"deutsch": "kommen", "franzosisch": "venir", "person": "ich komme", "conjugation": "je viens", "type": "unregelmäßiges Verb"},
        {"deutsch": "sehen", "franzosisch": "voir", "person": "ich sehe", "conjugation": "je vois", "type": "unregelmäßiges Verb"},
        {"deutsch": "wollen", "franzosisch": "vouloir", "person": "ich will", "conjugation": "je veux", "type": "unregelmäßiges Verb"},
        {"deutsch": "können", "franzosisch": "pouvoir", "person": "ich kann", "conjugation": "je peux", "type": "unregelmäßiges Verb"},
        {"deutsch": "müssen", "franzosisch": "devoir", "person": "ich muss", "conjugation": "je dois", "type": "unregelmäßiges Verb"},
        {"deutsch": "wissen", "franzosisch": "savoir", "person": "ich weiß", "conjugation": "je sais", "type": "unregelmäßiges Verb"},
        {"deutsch": "nehmen", "franzosisch": "prendre", "person": "ich nehme", "conjugation": "je prends", "type": "unregelmäßiges Verb"},
        {"deutsch": "geben", "franzosisch": "donner", "person": "ich gebe", "conjugation": "je donne", "type": "regelmäßiges Verb (-er)"},
        {"deutsch": "sprechen", "franzosisch": "parler", "person": "ich spreche", "conjugation": "je parle", "type": "regelmäßiges Verb (-er)"},
        {"deutsch": "finden", "franzosisch": "trouver", "person": "ich finde", "conjugation": "je trouve", "type": "regelmäßiges Verb (-er)"}
    ],
    unit2: [
        {"deutsch": "arbeiten", "franzosisch": "travailler", "person": "ich arbeite", "conjugation": "je travaille", "type": "regelmäßiges Verb (-er)"},
        {"deutsch": "wohnen", "franzosisch": "habiter", "person": "ich wohne", "conjugation": "j'habite", "type": "regelmäßiges Verb (-er)"},
        {"deutsch": "essen", "franzosisch": "manger", "person": "ich esse", "conjugation": "je mange", "type": "regelmäßiges Verb (-er)"},
        {"deutsch": "trinken", "franzosisch": "boire", "person": "ich trinke", "conjugation": "je bois", "type": "unregelmäßiges Verb"},
        {"deutsch": "kaufen", "franzosisch": "acheter", "person": "ich kaufe", "conjugation": "j'achète", "type": "regelmäßiges Verb (-er)"},
        {"deutsch": "verkaufen", "franzosisch": "vendre", "person": "ich verkaufe", "conjugation": "je vends", "type": "regelmäßiges Verb (-re)"},
        {"deutsch": "schlafen", "franzosisch": "dormir", "person": "ich schlafe", "conjugation": "je dors", "type": "unregelmäßiges Verb"},
        {"deutsch": "lernen", "franzosisch": "apprendre", "person": "ich lerne", "conjugation": "j'apprends", "type": "regelmäßiges Verb (-re)"},
        {"deutsch": "schreiben", "franzosisch": "écrire", "person": "ich schreibe", "conjugation": "j'écris", "type": "unregelmäßiges Verb"},
        {"deutsch": "lesen", "franzosisch": "lire", "person": "ich lese", "conjugation": "je lis", "type": "unregelmäßiges Verb"},
        {"deutsch": "öffnen", "franzosisch": "ouvrir", "person": "ich öffne", "conjugation": "j'ouvre", "type": "regelmäßiges Verb (-ir)"},
        {"deutsch": "schließen", "franzosisch": "fermer", "person": "ich schließe", "conjugation": "je ferme", "type": "regelmäßiges Verb (-er)"},
        {"deutsch": "fragen", "franzosisch": "demander", "person": "ich frage", "conjugation": "je demande", "type": "regelmäßiges Verb (-er)"},
        {"deutsch": "antworten", "franzosisch": "répondre", "person": "ich antworte", "conjugation": "je réponds", "type": "unregelmäßiges Verb"},
        {"deutsch": "suchen", "franzosisch": "chercher", "person": "ich suche", "conjugation": "je cherche", "type": "regelmäßiges Verb (-er)"}
    ],
    unit3: [
        {"deutsch": "fahren", "franzosisch": "conduire", "person": "ich fahre", "conjugation": "je conduis", "type": "unregelmäßiges Verb"},
        {"deutsch": "fliegen", "franzosisch": "voler", "person": "ich fliege", "conjugation": "je vole", "type": "regelmäßiges Verb (-er)"},
        {"deutsch": "schwimmen", "franzosisch": "nager", "person": "ich schwimme", "conjugation": "je nage", "type": "regelmäßiges Verb (-er)"},
        {"deutsch": "rennen", "franzosisch": "courir", "person": "ich renne", "conjugation": "je cours", "type": "unregelmäßiges Verb"},
        {"deutsch": "springen", "franzosisch": "sauter", "person": "ich springe", "conjugation": "je saute", "type": "regelmäßiges Verb (-er)"},
        {"deutsch": "sitzen", "franzosisch": "s'asseoir", "person": "ich sitze", "conjugation": "je m'assois", "type": "unregelmäßiges Verb"},
        {"deutsch": "stehen", "franzosisch": "être debout", "person": "ich stehe", "conjugation": "je suis debout", "type": "Ausdruck"},
        {"deutsch": "liegen", "franzosisch": "être couché", "person": "ich liege", "conjugation": "je suis couché", "type": "Ausdruck"},
        {"deutsch": "kommen", "franzosisch": "arriver", "person": "ich komme an", "conjugation": "j'arrive", "type": "regelmäßiges Verb (-er)"},
        {"deutsch": "gehen", "franzosisch": "partir", "person": "ich gehe", "conjugation": "je pars", "type": "unregelmäßiges Verb"},
        {"deutsch": "bleiben", "franzosisch": "rester", "person": "ich bleibe", "conjugation": "je reste", "type": "regelmäßiges Verb (-er)"},
        {"deutsch": "werden", "franzosisch": "devenir", "person": "ich werde", "conjugation": "je deviens", "type": "unregelmäßiges Verb"},
        {"deutsch": "kennen", "franzosisch": "connaître", "person": "ich kenne", "conjugation": "je connais", "type": "unregelmäßiges Verb"},
        {"deutsch": "denken", "franzosisch": "penser", "person": "ich denke", "conjugation": "je pense", "type": "regelmäßiges Verb (-er)"},
        {"deutsch": "glauben", "franzosisch": "croire", "person": "ich glaube", "conjugation": "je crois", "type": "unregelmäßiges Verb"},
        {"deutsch": "hoffen", "franzosisch": "espérer", "person": "ich hoffe", "conjugation": "j'espère", "type": "regelmäßiges Verb (-er)"}
    ]
};

class VerbQuiz {
    constructor() {
        this.selectedUnits = [];
        this.quizMode = 'de-fr';
        this.currentVerb = null;
        this.score = 0;
        this.totalQuestions = 0;
        this.serverRetryCount = 0;
        this.serverAvailable = false;
        
        // User-ID initialisieren
        getUserId();
        
        // Server-Verfügbarkeit prüfen
        this.checkServerAvailability();
        
        this.initializeEventListeners();
        this.loadUnits();
    }
    
    initializeEventListeners() {
        // Event Listener für Buttons
        document.getElementById('start-quiz').addEventListener('click', async () => await this.startQuiz());
        document.getElementById('show-stats').addEventListener('click', () => this.showStats());
        document.getElementById('next-question').addEventListener('click', async () => await this.nextQuestion());
        document.getElementById('end-quiz').addEventListener('click', async () => await this.endQuiz());
        document.getElementById('close-stats').addEventListener('click', () => this.hideStats());
        
        // Event Listener für Abfragemodus
        document.querySelectorAll('input[name="mode"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.quizMode = e.target.value;
            });
        });
        
        // Event Listener für Akzent-Checkbox
        const strictAccentsCheckbox = document.getElementById('strict-accents');
        if (strictAccentsCheckbox) {
            strictAccentsCheckbox.addEventListener('change', (e) => {
                this.strictAccents = e.target.checked;
            });
        }
        
        // Event Listener für Umlaut-Checkbox
        const strictUmlautsCheckbox = document.getElementById('strict-umlauts');
        if (strictUmlautsCheckbox) {
            strictUmlautsCheckbox.addEventListener('change', (e) => {
                this.strictUmlauts = e.target.checked;
            });
        }
    }
    
    async checkServerAvailability() {
        try {
            const response = await fetch('api/health.php', {
                method: 'GET',
                signal: AbortSignal.timeout(HISTORY_CONFIG.serverTimeout)
            });
            this.serverAvailable = response.ok;
            console.log('🌐 Server-Verfügbarkeit:', this.serverAvailable);
            return this.serverAvailable;
        } catch (error) {
            console.log('❌ Server nicht erreichbar:', error.message);
            this.serverAvailable = false;
            return false;
        }
    }
    
    async loadUnits() {
        console.log('🔄 Starte loadUnits()...');
        try {
            // Feste Unit-Liste mit bekannten Dateien
            const knownFiles = [
                { file: 'unit1_volet1.json', name: 'unit1_volet1' },
                { file: 'unit3_volet3.json', name: 'unit3_volet3' },
                { file: 'unit4_circumflex.json', name: 'unit4_circumflex' },
                { file: 'unit4_sonderzeichen.json', name: 'unit4_sonderzeichen' }
            ];
            console.log('📁 Bekannte Dateien:', knownFiles);
            
            this.units = [];
            
            for (const unitInfo of knownFiles) {
                console.log(`🔍 Lade ${unitInfo.file}...`);
                try {
                    const unitResponse = await fetch(`./data/${unitInfo.file}`);
                    console.log(`📡 Fetch-Status für ${unitInfo.file}:`, unitResponse.status, unitResponse.ok);
                    if (unitResponse.ok) {
                        const data = await unitResponse.json();
                        console.log(`✅ ${unitInfo.file} geladen, ${data.length} Einträge`);
                        this.units.push({
                            id: this.units.length + 1,
                            name: unitInfo.name,
                            file: unitInfo.file,
                            count: data.length
                        });
                    } else {
                        console.warn(`⚠️ ${unitInfo.file} nicht OK:`, unitResponse.status);
                    }
                } catch (error) {
                    console.warn(`❌ Unit ${unitInfo.file} konnte nicht geladen werden:`, error);
                }
            }
            
            console.log('📊 Geladene Units:', this.units);
            
            if (this.units.length === 0) {
                console.log('🔄 Keine Units gefunden, verwende Fallback...');
                // Fallback auf fest codierte Units
                this.units = [
                    { id: 1, name: 'unit1', count: 15 },
                    { id: 2, name: 'unit2', count: 18 },
                    { id: 3, name: 'unit3', count: 18 }
                ];
            }
            
            console.log('🎯 Rendere Units:', this.units);
            this.renderUnits();
        } catch (error) {
            console.error('💥 Fehler beim Laden der Units:', error);
            // Fallback auf fest codierte Units
            this.units = [
                { id: 1, name: 'unit1', count: 15 },
                { id: 2, name: 'unit2', count: 18 },
                { id: 3, name: 'unit3', count: 18 }
            ];
            this.renderUnits();
        }
    }
    
    renderUnits() {
        const container = document.getElementById('units-container');
        container.innerHTML = '';
        
        // Zuerst sicherstellen, dass mindestens eine Unit ausgewählt wird
        let hasSelection = false;
        
        this.units.forEach(unit => {
            const unitDiv = document.createElement('div');
            unitDiv.className = 'unit-checkbox';
            
            // Zufällig auswählen (30% Wahrscheinlichkeit pro Unit)
            const randomlySelected = Math.random() < 0.3;
            if (randomlySelected) hasSelection = true;
            
            unitDiv.innerHTML = `
                <input type="checkbox" id="unit-${unit.id}" value="${unit.id}" ${randomlySelected ? 'checked' : ''}>
                <label for="unit-${unit.id}">${unit.name} (${unit.count} Verben)</label>
            `;

            const checkbox = unitDiv.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => this.updateSelectedUnits());

            container.appendChild(unitDiv);
        });
        
        // Wenn keine Unit zufällig ausgewählt wurde, erste Unit auswählen
        if (!hasSelection && this.units.length > 0) {
            const firstCheckbox = document.querySelector('#units-container input[type="checkbox"]');
            if (firstCheckbox) {
                firstCheckbox.checked = true;
            }
        }
        
        // Nach dem Rendern einmal die Auswahl aktualisieren
        this.updateSelectedUnits();
    }
    
    updateSelectedUnits() {
        const checkboxes = document.querySelectorAll('#units-container input[type="checkbox"]:checked');
        this.selectedUnits = Array.from(checkboxes).map(cb => parseInt(cb.value));
    }
    
    async startQuiz() {
        if (this.selectedUnits.length === 0) {
            alert('Bitte wählen Sie mindestens eine Unit aus!');
            return;
        }
        
        try {
            // Lade Verben dynamisch aus den ausgewählten Unit-Dateien
            this.verbData = {};
            
            for (const unitId of this.selectedUnits) {
                const unit = this.units.find(u => u.id === unitId);
                if (unit && unit.file) {
                    try {
                        const response = await fetch(`./data/${unit.file}`);
                        if (response.ok) {
                            const data = await response.json();
                            // Konvertiere Datenformat falls nötig
                            const convertedData = this.convertVerbData(data, unit.file);
                            this.verbData[unit.file] = convertedData;
                            console.log(`Geladene Verben für ${unit.name}:`, convertedData.length);
                        } else {
                            console.warn(`Konnte ${unit.file} nicht laden`);
                            this.verbData[unit.file] = this.getFallbackVerbs(unitId);
                        }
                    } catch (error) {
                        console.error(`Fehler beim Laden von ${unit.file}:`, error);
                        this.verbData[unit.file] = this.getFallbackVerbs(unitId);
                    }
                } else {
                    // Fallback für Units ohne Datei
                    this.verbData[`unit${unitId}`] = this.getFallbackVerbs(unitId);
                }
            }
            
            console.log('Alle Verbdetails:', this.verbData);
            
            if (Object.keys(this.verbData).length === 0) {
                alert('Keine Verben für die ausgewählten Units gefunden!');
                return;
            }
            
            this.quizActive = true;
            this.score = 0;
            this.totalQuestions = 0;
            
            // Zeige Quiz-Bereich
            document.getElementById('quiz-area').classList.remove('hidden');
            document.querySelector('.unit-selection').classList.add('hidden');
            document.querySelector('.quiz-mode').classList.add('hidden');
            document.querySelector('.quiz-controls').classList.add('hidden');
            
            this.nextQuestion();
            
        } catch (error) {
            console.error('Fehler beim Starten des Quiz:', error);
            alert('Fehler beim Starten des Quiz: ' + error.message);
        }
    }
    
    // Hilfsfunktion zum Konvertieren verschiedener Datenformate
    convertVerbData(data, filename) {
        // Prüfe das Datenformat und konvertiere falls nötig
        if (Array.isArray(data)) {
            return data.map(item => {
                // Altes Format mit deutsch/franzosisch
                if (item.deutsch && item.franzosisch) {
                    return {
                        infinitiv: item.franzosisch || '',
                        bedeutung: item.deutsch || '',
                        konjugationen: {
                            present: item.conjugation ? [item.conjugation] : [],
                            passe_compose: []
                        },
                        beispielsatz: item.person || '',
                        type: item.type || ''
                    };
                }
                // Neues Format mit infinitiv/bedeutung
                else if (item.infinitiv && item.bedeutung) {
                    return item;
                }
                // Fallback
                else {
                    return {
                        infinitiv: item.franzosisch || '',
                        bedeutung: item.deutsch || '',
                        konjugationen: { present: [], passe_compose: [] },
                        beispielsatz: '',
                        type: ''
                    };
                }
            });
        }
        return [];
    }
    
    getFallbackVerbs(unitId) {
        const fallbackData = {
            1: [
                {deutsch: 'sein', franzosisch: 'être', person: 'ich bin', conjugation: 'je suis'},
                {deutsch: 'haben', franzosisch: 'avoir', person: 'ich habe', conjugation: 'j\'ai'},
                {deutsch: 'gehen', franzosisch: 'aller', person: 'ich gehe', conjugation: 'je vais'},
                {deutsch: 'machen', franzosisch: 'faire', person: 'ich mache', conjugation: 'je fais'},
                {deutsch: 'sagen', franzosisch: 'dire', person: 'ich sage', conjugation: 'je dis'}
            ],
            2: [
                {deutsch: 'kommen', franzosisch: 'venir', person: 'ich komme', conjugation: 'je viens'},
                {deutsch: 'sehen', franzosisch: 'voir', person: 'ich sehe', conjugation: 'je vois'},
                {deutsch: 'wollen', franzosisch: 'vouloir', person: 'ich will', conjugation: 'je veux'},
                {deutsch: 'können', franzosisch: 'pouvoir', person: 'ich kann', conjugation: 'je peux'},
                {deutsch: 'müssen', franzosisch: 'devoir', person: 'ich muss', conjugation: 'je dois'}
            ],
            3: [
                {deutsch: 'sprechen', franzosisch: 'parler', person: 'ich spreche', conjugation: 'je parle'},
                {deutsch: 'essen', franzosisch: 'manger', person: 'ich esse', conjugation: 'je mange'},
                {deutsch: 'trinken', franzosisch: 'boire', person: 'ich trinke', conjugation: 'je bois'},
                {deutsch: 'schlafen', franzosisch: 'dormir', person: 'ich schlafe', conjugation: 'je dors'},
                {deutsch: 'arbeiten', franzosisch: 'travailler', person: 'ich arbeite', conjugation: 'je travaille'}
            ]
        };
        
        return fallbackData[unitId] || [];
    }
    
    async nextQuestion() {
        if (!this.quizActive) return;
        
        const verbs = Object.values(this.verbData).flat();
        if (verbs.length === 0) {
            this.endQuiz();
            return;
        }
        
        // Zufälliges Verb auswählen
        this.currentQuestion = verbs[Math.floor(Math.random() * verbs.length)];
        this.renderQuestion();
        
        // Fokus auf das Eingabefeld setzen
        setTimeout(() => {
            const input = document.getElementById('user-answer');
            if (input) input.focus();
        }, 50);
    }
    
    renderQuestion() {
        const questionText = document.getElementById('question-text');
        const answerContainer = document.getElementById('answer-container');
        const feedback = document.getElementById('feedback');
        
        feedback.innerHTML = '';
        feedback.className = 'feedback';
        
        if (this.quizMode === 'multiple') {
            this.renderMultipleChoice(questionText, answerContainer);
        } else {
            this.renderTextInput(questionText, answerContainer);
        }
    }
    
    renderTextInput(questionText, answerContainer) {
        let question = '';
        let expectedAnswer = '';
        
        switch (this.quizMode) {
            case 'de-fr':
                question = `Französisch für: ${this.currentQuestion.bedeutung || this.currentQuestion.deutsch}`;
                expectedAnswer = this.currentQuestion.infinitiv || this.currentQuestion.franzosisch;
                break;
            case 'fr-de':
                question = `Deutsch für: ${this.currentQuestion.infinitiv || this.currentQuestion.franzosisch}`;
                expectedAnswer = this.currentQuestion.bedeutung || this.currentQuestion.deutsch;
                break;
            case 'mixed':
                if (Math.random() < 0.5) {
                    question = `Französisch für: ${this.currentQuestion.bedeutung || this.currentQuestion.deutsch}`;
                    expectedAnswer = this.currentQuestion.infinitiv || this.currentQuestion.franzosisch;
                } else {
                    question = `Deutsch für: ${this.currentQuestion.infinitiv || this.currentQuestion.franzosisch}`;
                    expectedAnswer = this.currentQuestion.bedeutung || this.currentQuestion.deutsch;
                }
                break;
        }
        
        questionText.textContent = question;
        
        answerContainer.innerHTML = `
            <input type="text" class="answer-input" id="user-answer" placeholder="Ihre Antwort...">
            <button onclick="quiz.checkAnswer('${expectedAnswer}')">Prüfen</button>
        `;
        
        // Enter-Taste für Antwort
        document.getElementById('user-answer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer(expectedAnswer);
            }
        });
        
        document.getElementById('user-answer').focus();
    }
    
    renderMultipleChoice(questionText, answerContainer) {
        const isGermanQuestion = Math.random() < 0.5;
        let question = '';
        let correctAnswer = '';
        
        if (isGermanQuestion) {
            question = `Französisch für: ${this.currentQuestion.bedeutung || this.currentQuestion.deutsch}`;
            correctAnswer = this.currentQuestion.infinitiv || this.currentQuestion.franzosisch;
        } else {
            question = `Deutsch für: ${this.currentQuestion.infinitiv || this.currentQuestion.franzosisch}`;
            correctAnswer = this.currentQuestion.bedeutung || this.currentQuestion.deutsch;
        }
        
        questionText.textContent = question;
        
        // Generiere Multiple-Choice-Optionen
        const options = this.generateMultipleChoiceOptions(correctAnswer);

        const choicesHtml = options.map((option, index) => `
            <div class="choice-option" onclick="quiz.selectMultipleChoice(${index}, '${correctAnswer}')">
                ${option}
            </div>
        `).join('');

        answerContainer.innerHTML = `<div class="multiple-choice">${choicesHtml}</div>`;
    }

    generateMultipleChoiceOptions(correctAnswer) {
        const allVerbs = Object.values(this.verbData).flat();
        const options = [correctAnswer];

        // Füge 4 zufällige falsche Optionen hinzu
        while (options.length < 5) {
            const randomVerb = allVerbs[Math.floor(Math.random() * allVerbs.length)];
            const wrongAnswer = Math.random() < 0.5 ? 
                (randomVerb.bedeutung || randomVerb.deutsch) : 
                (randomVerb.infinitiv || randomVerb.franzosisch);
            
            if (!options.includes(wrongAnswer)) {
                options.push(wrongAnswer);
            }
        }

        // Mische die Optionen
        return options.sort(() => Math.random() - 0.5);
    }
    
    selectMultipleChoice(index, correctAnswer) {
        const options = document.querySelectorAll('.choice-option');
        const selectedAnswer = options[index].textContent.trim();
        
        // Entferne vorherige Auswahl
        options.forEach(opt => opt.classList.remove('selected'));
        options[index].classList.add('selected');
        
        // Prüfe Antwort nach kurzer Verzögerung
        setTimeout(() => {
            this.checkAnswer(correctAnswer);
        }, 500);
    }
    
    checkAnswer(expectedAnswer) {
        const feedback = document.getElementById('feedback');
        let userAnswer = '';
        
        if (this.quizMode === 'multiple') {
            const selected = document.querySelector('.choice-option.selected');
            if (selected) {
                userAnswer = selected.textContent.trim();
            }
        } else {
            userAnswer = document.getElementById('user-answer').value.trim();
        }
        
        this.totalQuestions++;
        
        const isCorrect = this.normalizeAnswer(userAnswer) === this.normalizeAnswer(expectedAnswer);
        
        if (isCorrect) {
            this.score++;
            feedback.innerHTML = `✅ Korrekt! ${expectedAnswer}`;
            feedback.className = 'feedback correct';
        } else {
            feedback.innerHTML = `❌ Falsch! Korrekte Antwort: ${expectedAnswer}`;
            feedback.className = 'feedback incorrect';
        }
        
        // Deaktiviere Eingabe und zeige Nächste-Frage-Button
        const answerContainer = document.getElementById('answer-container');
        const inputs = answerContainer.querySelectorAll('input, button, .choice-option');
        inputs.forEach(input => {
            if (input.id !== 'next-question') {
                input.disabled = true;
                input.style.opacity = '0.6';
            }
        });
        
        // Fokus auf den "Nächste Frage"-Button legen
        const nextBtn = document.getElementById('next-question');
        if (nextBtn) nextBtn.focus();
    }
    
    normalizeAnswer(answer) {
        let normalized = answer.toLowerCase()
                           .trim()
                           .replace(/[.,!?;:]/g, '')
                           .replace(/\s+/g, ' ')
                           .replace(/\s+(qc|qn)$/, '') // Entferne qc/qn am Ende
                           .replace(/\s+(qc|qn)\s+/, ' '); // Entferne qc/qn in der Mitte;
        
        // Wenn Akzente nicht streng geprüft werden sollen, entferne sie
        if (!this.strictAccents) {
            // Ersetze Akzente durch Basis-Buchstaben
            const accentMap = {
                'à': 'a', 'â': 'a', 'ä': 'a',
                'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
                'î': 'i', 'ï': 'i', 'ì': 'i',
                'ô': 'o', 'ö': 'o', 'ò': 'o',
                'ù': 'u', 'û': 'u', 'ü': 'u',
                'ç': 'c', 'ñ': 'n'
            };
            
            normalized = normalized.split('').map(char => accentMap[char] || char).join('');
        }
        
        // Wenn Umlaute nicht streng geprüft werden sollen, entferne sie
        if (!this.strictUmlauts) {
            // Ersetze Umlaute durch Basis-Buchstaben
            const umlautMap = {
                'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss'
            };
            
            normalized = normalized.split('').map(char => umlautMap[char] || char).join('');
        }
        
        return normalized;
    }
    
    async endQuiz() {
        this.quizActive = false;
        await this.saveStats();
        
        // Zeige Ergebnis
        const percentage = this.totalQuestions > 0 ? Math.round((this.score / this.totalQuestions) * 100) : 0;
        const feedback = document.getElementById('feedback');
        feedback.innerHTML = `
            <h3>Quiz beendet!</h3>
            <p>Ihr Ergebnis: ${this.score} von ${this.totalQuestions} (${percentage}%)</p>
        `;
        feedback.className = 'feedback';

        // UI zurücksetzen
        document.getElementById('quiz-area').classList.add('hidden');
        document.querySelector('.unit-selection').classList.remove('hidden');
        document.querySelector('.quiz-mode').classList.remove('hidden');
        document.querySelector('.quiz-controls').classList.remove('hidden');

        // Nächste-Frage-Button wieder sichtbar machen
        document.getElementById('next-question').style.display = '';
    }
    
    showStats() {
        const statsContent = document.getElementById('stats-content');

        const history = this.getHistory();
        // history.unshift() in saveStats() sorgt schon dafür, dass neue Einträge oben stehen
        const rows = history.map(entry => {
            const units = Array.isArray(entry.units) ? entry.units.join(',') : '';
            const percent = typeof entry.percent === 'number' ? `${entry.percent}%` : '';
            return `
                <tr>
                    <td style="text-align:left;padding:6px;">${entry.datetime || ''}</td>
                    <td style="text-align:left;padding:6px;">${units}</td>
                    <td style="text-align:left;padding:6px;">${entry.mode || ''}</td>
                    <td style="text-align:center;padding:6px;">${entry.score ?? ''}</td>
                    <td style="text-align:center;padding:6px;">${entry.total ?? ''}</td>
                    <td style="text-align:center;padding:6px;">${percent}</td>
                </tr>
            `;
        }).join('');

        statsContent.innerHTML = `
            <div class="stat-item">
                <span>Gesamte Abfragen:</span>
                <span>${history.length}</span>
            </div>
            <div style="overflow:auto;max-height:60vh;">
                <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
                    <thead>
                        <tr>
                            <th style="text-align:left;border-bottom:1px solid #ccc;padding:6px;width:25%;">Datum/Uhrzeit</th>
                            <th style="text-align:left;border-bottom:1px solid #ccc;padding:6px;width:15%;">Units</th>
                            <th style="text-align:left;border-bottom:1px solid #ccc;padding:6px;width:15%;">Modus</th>
                            <th style="text-align:center;border-bottom:1px solid #ccc;padding:6px;width:15%;">Richtig</th>
                            <th style="text-align:center;border-bottom:1px solid #ccc;padding:6px;width:15%;">Fragen</th>
                            <th style="text-align:center;border-bottom:1px solid #ccc;padding:6px;width:15%;">Quote</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows || '<tr><td colspan="6" style="padding:8px;">Keine Daten vorhanden</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('stats-area').classList.remove('hidden');
    }
    
    hideStats() {
        document.getElementById('stats-area').classList.add('hidden');
    }
    
    getStat(key, defaultValue) {
        return localStorage.getItem(`quiz_${key}`) || defaultValue;
    }

    getHistory() {
        try {
            const raw = localStorage.getItem('quiz_history');
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    async saveHistory(history) {
        // Immer lokal speichern (garantiert)
        localStorage.setItem('quiz_history', JSON.stringify(history));
        
        // Zusätzlich versuchen serverseitig zu speichern
        if (HISTORY_CONFIG.mode === 'server' || HISTORY_CONFIG.mode === 'hybrid') {
            if (this.serverAvailable || await this.checkServerAvailability()) {
                await this.saveToServer(history);
            }
        }
    }
    
    async saveToServer(history) {
        try {
            // Nur den neuesten Eintrag an den Server senden
            const latestEntry = history[0];
            if (!latestEntry) return;
            
            const response = await fetch('api/save_history.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: latestEntry.datetime,
                    units: latestEntry.units,
                    mode: latestEntry.mode,
                    score: latestEntry.score
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('✅ History auf Server gespeichert:', result.id);
            } else {
                console.log('⚠️ Server-Speicherung fehlgeschlagen');
            }
        } catch (error) {
            console.log('❌ Server-Fehler bei History-Speicherung:', error.message);
        }
    }
    
    async saveStats() {
        const percent = this.totalQuestions > 0 ? Math.round((this.score / this.totalQuestions) * 100) : 0;
        const now = new Date();
        const dt = now.toLocaleString('de-DE');

        const history = this.getHistory();
        history.unshift({
            datetime: dt,
            units: this.selectedUnits,
            mode: this.quizMode,
            score: this.score,
            total: this.totalQuestions,
            percent
        });

        while (history.length > 200) {
            history.pop();
        }

        await this.saveHistory(history);
    }
}

// Initialisiere die Anwendung
let quiz;
document.addEventListener('DOMContentLoaded', () => {
    quiz = new VerbQuiz();
});
