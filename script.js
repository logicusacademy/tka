// ===========================================================
// LOGICUS ACADEMY — landing page interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initScrollReveal();
    initHeaderShadow();
    initSmoothAnchors();
    initCtaForm();
});

/* ---------- Mobile nav toggle ---------- */
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ---------- Scroll reveal for [data-reveal] elements ---------- */
function initScrollReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
        observer.observe(el);
    });
}

/* ---------- Header subtle shadow after scroll ---------- */
function initHeaderShadow() {
    const header = document.getElementById('header');
    if (!header) return;

    const onScroll = () => {
        if (window.scrollY > 12) {
            header.style.boxShadow = '0 6px 20px rgba(27, 58, 87, 0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Smooth-scroll for in-page anchors (offset for sticky header) ---------- */
function initSmoothAnchors() {
    const header = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 0;

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/* ---------- CTA / consultation form ---------- */
function initCtaForm() {
    const form = document.querySelector('.cta-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalLabel = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Terkirim, tim kami akan menghubungi Anda';

        setTimeout(() => {
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalLabel;
        }, 3200);
    });
}
