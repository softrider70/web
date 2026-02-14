#!/bin/bash

# Deployment-Skript für französische Verben Webanwendung
# Ziel: Synology DS918 mit Apache2.4

# Konfiguration
REMOTE_HOST="192.168.1.10"
REMOTE_USER="ds918admin"
REMOTE_PATH="/volume1/web/franzoesische-verben"
LOCAL_PATH="$(dirname "$0")"
SSH_KEY="$HOME/.ssh/id_ed25519_ds918_new"

DEPLOY_VERSION="$(date +%Y%m%d-%H%M%S)"

cat > "$LOCAL_PATH/js/version.js" << 'EOF'
window.__FRANZOESISCHE_VERBEN_DEPLOY_VERSION__ = '__DEPLOY_VERSION__';

document.addEventListener('DOMContentLoaded', () => {
    const els = document.querySelectorAll('[data-app-version]');
    els.forEach(el => {
        el.textContent = `Version: ${window.__FRANZOESISCHE_VERBEN_DEPLOY_VERSION__}`;
    });
});
EOF

sed -i "s#__DEPLOY_VERSION__#${DEPLOY_VERSION}#g" "$LOCAL_PATH/js/version.js"

sed -i 's#js/version\.js?v=[^" ]*#js/version.js?v='"$DEPLOY_VERSION"'#g' "$LOCAL_PATH/index.html"
sed -i 's#js/quiz\.js?v=[^" ]*#js/quiz.js?v='"$DEPLOY_VERSION"'#g' "$LOCAL_PATH/index.html"

echo "=== Deployment französische Verben ==="
echo "Remote Host: $REMOTE_HOST"
echo "Remote Path: $REMOTE_PATH"
echo "Local Path: $LOCAL_PATH"
echo ""

# Prüfe ob SSH-Verbindung möglich ist
echo "Prüfe SSH-Verbindung..."
if ! ssh -i "$SSH_KEY" -o ConnectTimeout=10 $REMOTE_USER@$REMOTE_HOST "echo 'SSH-Verbindung erfolgreich'" 2>/dev/null; then
    echo "FEHLER: SSH-Verbindung zu $REMOTE_USER@$REMOTE_HOST fehlgeschlagen!"
    echo "Bitte stellen Sie sicher, dass:"
    echo "1. Die Synology DS918 erreichbar ist"
    echo "2. SSH-Dienst aktiviert ist"
    echo "3. SSH-Key unter $SSH_KEY vorhanden ist"
    echo "4. User ds918admin SSH-Zugriff hat"
    exit 1
fi

echo "SSH-Verbindung erfolgreich!"
echo ""

# Erstelle Remote-Verzeichnis falls nicht vorhanden
echo "Bereite Remote-Verzeichnis vor..."
ssh -i "$SSH_KEY" $REMOTE_USER@$REMOTE_HOST "sudo rm -rf $REMOTE_PATH && mkdir -p $REMOTE_PATH"

# Kopiere Dateien zur Synology
echo "Kopiere Dateien zur Synology..."
# Übertrage Dateien mit tar über SSH
tar -czf - -C "$LOCAL_PATH" \
    --exclude='.git*' \
    --exclude='deploy.sh' \
    --exclude='apache-config' \
    --exclude='README.md.bak' \
    . | ssh -i "$SSH_KEY" $REMOTE_USER@$REMOTE_HOST "tar -xzf - -C $REMOTE_PATH"

if [ $? -eq 0 ]; then
    echo "Dateien erfolgreich kopiert!"
else
    echo "FEHLER beim Kopieren der Dateien!"
    exit 1
fi

# Setze Berechtigungen
echo "Setze Berechtigungen..."
ssh -i "$SSH_KEY" $REMOTE_USER@$REMOTE_HOST "sudo chown -R http:http $REMOTE_PATH"

# Deployment abgeschlossen
echo ""
echo "=== Deployment abgeschlossen ==="
echo "Webanwendung sollte unter folgenden URLs erreichbar sein:"
echo "http://192.168.1.10/franzoesische-verben/"
echo "Deploy-Version: $DEPLOY_VERSION"
echo ""
echo "Nächste Schritte:"
echo "1. Web Station auf Synology überprüfen"
echo "2. PHP-Version in Web Station konfigurieren"
echo "3. Browser-Cache leeren und testen"
