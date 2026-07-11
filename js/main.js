document.addEventListener("DOMContentLoaded", () => {

    typeEffect();

    initFilters();

    initNavToggle();

    initTimelineProgress();

    initScrollTopButton();

    initFAQ();

    initContactForm();

    document
        .querySelectorAll(".bento-item, .project-card, .timeline-year")
        .forEach(el => observer.observe(el));

});