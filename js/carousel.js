// Previous/next arrows and auto-advance for each .carousel. The track itself is
// a native horizontal scroller, so swiping and trackpads work without this script.
(function () {
    const AUTO_ADVANCE_MS = 3000;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('.carousel').forEach((carousel) => {
        const track = carousel.querySelector('.carousel-track');
        let timer = null;

        const step = (direction) => {
            const last = track.scrollWidth - track.clientWidth;
            let target = track.scrollLeft + direction * track.clientWidth;
            // Wrap around at either end.
            if (target > last + 1) target = 0;
            if (target < -1) target = last;
            track.scrollTo({ left: target, behavior: reducedMotion ? 'auto' : 'smooth' });
        };

        const stop = () => {
            clearInterval(timer);
            timer = null;
        };

        // Auto-advance is skipped for visitors who ask for reduced motion.
        const start = () => {
            if (reducedMotion || timer) return;
            timer = setInterval(() => {
                // Hold still while the tab is in the background or a screenshot is open in the lightbox.
                if (document.hidden || document.querySelector('dialog[open]')) return;
                step(1);
            }, AUTO_ADVANCE_MS);
        };

        // Arrow clicks restart the countdown, so a slide isn't swapped right after it's chosen.
        const onArrow = (direction) => {
            stop();
            step(direction);
            if (!carousel.matches(':hover')) start();
        };

        carousel.querySelector('.carousel-arrow--prev').addEventListener('click', () => onArrow(-1));
        carousel.querySelector('.carousel-arrow--next').addEventListener('click', () => onArrow(1));

        // Pause while the visitor is pointing at, touching or tabbing through the carousel.
        carousel.addEventListener('mouseenter', stop);
        carousel.addEventListener('mouseleave', start);
        carousel.addEventListener('focusin', stop);
        carousel.addEventListener('focusout', start);
        carousel.addEventListener('touchstart', stop, { passive: true });
        carousel.addEventListener('touchend', start, { passive: true });

        start();
    });
})();
