// education.js — page-specific enhancements for education.html
// The main script.js already handles theme, mobile nav, reveal animations,
// and smooth scrolling. This file adds education-page-only extras.

document.addEventListener('DOMContentLoaded', () => {

    // Stagger reveal animations for info blocks
    const infoBlocks = document.querySelectorAll('.edu-info-block');
    infoBlocks.forEach((block, i) => {
        block.style.transitionDelay = `${i * 40}ms`;
    });

    // Animate GPA number on scroll into view
    const gpaNumbers = document.querySelectorAll('.edu-gpa-hero__number');

    const animateGPA = (el) => {
        const target = parseFloat(el.textContent);
        const duration = 1200;
        const start = performance.now();

        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = (eased * target).toFixed(2);
            el.textContent = current;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target.toFixed(2);
        };

        requestAnimationFrame(tick);
    };

    const gpaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateGPA(entry.target);
                gpaObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    gpaNumbers.forEach(el => gpaObserver.observe(el));

});
