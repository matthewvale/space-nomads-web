// Two small visual effects shared by every page. Both only set CSS variables;
// the drawing is done in css/styles.css.
(function () {
    // Cursor glow: tell a hovered button where the pointer is inside it.
    const GLOW_TARGETS = '.button, .banner-button, .carousel-arrow';

    document.addEventListener('pointermove', (event) => {
        const target = event.target.closest && event.target.closest(GLOW_TARGETS);
        if (!target) return;
        const box = target.getBoundingClientRect();
        target.style.setProperty('--glow-x', (event.clientX - box.left) + 'px');
        target.style.setProperty('--glow-y', (event.clientY - box.top) + 'px');
    }, { passive: true });

    // Background parallax: report how far down the page we are, from 0 to 1.
    // Skipped for visitors who ask for reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    let queued = false;

    const update = () => {
        queued = false;
        const scrollable = root.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
        root.style.setProperty('--scroll-progress', progress.toFixed(4));
    };

    const queue = () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(update);
    };

    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
    update();
})();
