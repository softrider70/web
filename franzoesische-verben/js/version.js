window.__FRANZOESISCHE_VERBEN_DEPLOY_VERSION__ = '20260214-184548';

document.addEventListener('DOMContentLoaded', () => {
    const els = document.querySelectorAll('[data-app-version]');
    els.forEach(el => {
        el.textContent = `Version: ${window.__FRANZOESISCHE_VERBEN_DEPLOY_VERSION__}`;
    });
});
