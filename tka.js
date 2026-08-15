// ===========================================================
// LOGICUS ACADEMY — TKA page interactions (jenjang tabs)
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {
    initJenjangTabs();
});

function initJenjangTabs() {
    const tabs = document.querySelectorAll('.jenjang-tab');
    const panels = document.querySelectorAll('.jenjang-panel');
    if (!tabs.length || !panels.length) return;

    function activate(targetId, updateHash) {
        tabs.forEach((tab) => {
            const isMatch = tab.dataset.target === targetId;
            tab.classList.toggle('is-active', isMatch);
            tab.setAttribute('aria-selected', String(isMatch));
        });
        panels.forEach((panel) => {
            const isMatch = panel.id === targetId;
            panel.classList.toggle('is-active', isMatch);
            if (isMatch) {
                panel.removeAttribute('hidden');
            } else {
                panel.setAttribute('hidden', '');
            }
        });
        if (updateHash && history.replaceState) {
            history.replaceState(null, '', '#' + targetId);
        }
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => activate(tab.dataset.target, true));
    });

    // Deep-link support: #materi-smp in URL opens that tab directly
    const initialHash = window.location.hash.replace('#', '');
    const validTargets = Array.from(panels).map((p) => p.id);
    if (validTargets.includes(initialHash)) {
        activate(initialHash, false);
    }

    // Quick-link chips in hero (#materi-sd etc.) should also switch tabs, not just scroll
    document.querySelectorAll('.jenjang-quicklinks a[href^="#materi-"]').forEach((link) => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href').replace('#', '');
            if (validTargets.includes(targetId)) {
                activate(targetId, false);
            }
        });
    });
}
