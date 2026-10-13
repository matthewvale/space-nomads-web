// Previous/next arrows and auto-advance for each .carousel. The track itself is
// a native horizontal scroller, so swiping and trackpads work without this script.
(function () {
    const AUTO_ADVANCE_MS = 3000;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('.carousel').forEach((carousel) => {
        const track = carousel.querySelector('.carousel-track');
        let timer = null;

        // To loop without rewinding, a copy of the last slide sits before the first and a
        // copy of the first sits after the last. Scrolling onto a copy looks like carrying
        // on round; once it settles, the track jumps unseen to the real slide it mirrors.
        const slides = [...track.children];
        const copies = [slides[slides.length - 1].cloneNode(true), slides[0].cloneNode(true)];
        copies.forEach((copy) => {
            copy.setAttribute('aria-hidden', 'true');
            copy.tabIndex = -1;
            copy.querySelector('img')?.removeAttribute('loading');
        });
        track.prepend(copies[0]);
        track.append(copies[1]);

        const stride = () => track.children[1].offsetLeft - track.children[0].offsetLeft;
        const index = () => Math.round(track.scrollLeft / stride());
        const jump = (i) => track.scrollTo({ left: i * stride(), behavior: 'instant' });

        const leaveCopy = () => {
            const last = track.children.length - 1;
            if (index() === 0) jump(last - 1);
            else if (index() === last) jump(1);
        };

        const step = (direction) => {
            leaveCopy();
            track.scrollTo({ left: (index() + direction) * stride(), behavior: reducedMotion ? 'auto' : 'smooth' });
        };

        // Swipes and trackpads can land on a copy too. Safari has no scrollend, so there
        // it waits for the scroll events to stop instead.
        if ('onscrollend' in window) {
            track.addEventListener('scrollend', leaveCopy);
        } else {
            let settle = null;
            track.addEventListener('scroll', () => {
                clearTimeout(settle);
                settle = setTimeout(leaveCopy, 150);
            }, { passive: true });
        }

        jump(1);

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
