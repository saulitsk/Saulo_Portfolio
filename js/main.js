// JavaScript — Scroll Reveal + Nav Scroll Effect + Contact Badge

document.addEventListener('DOMContentLoaded', () => {

    // 1. Nav scroll effect — transparent → solid
    const nav = document.getElementById('main-nav');

    const handleNavScroll = () => {
        if (window.scrollY > 60) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // run once on load

    // 2. Contact badge — show after scrolling past hero
    const contactBadge = document.getElementById('contact-badge');
    const heroSection = document.getElementById('hero');

    if (contactBadge && heroSection) {
        const handleBadgeVisibility = () => {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (window.scrollY > heroBottom - 200) {
                contactBadge.classList.add('visible');
            } else {
                contactBadge.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', handleBadgeVisibility, { passive: true });
        handleBadgeVisibility();
    }

    // 3. Scroll Reveal — IntersectionObserver for .reveal-item
    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Only animate once
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    // Observe all reveal items (cards, skill categories)
    const revealItems = document.querySelectorAll('.reveal-item');
    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    // 4. Section fade-in (subtle)
    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.08
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, sectionObserverOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });
});
