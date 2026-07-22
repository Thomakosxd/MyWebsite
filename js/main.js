document.addEventListener("DOMContentLoaded", () => {

    if (typeof typeEffect === "function") typeEffect();

    if (typeof initFilters === "function") initFilters();

    if (typeof initNavToggle === "function") initNavToggle();

    if (typeof initTimelineProgress === "function") initTimelineProgress();

    if (typeof initScrollTopButton === "function") initScrollTopButton();

    if (typeof initFAQ === "function") initFAQ();

    if (typeof initContactForm === "function") initContactForm();

    document
        .querySelectorAll(".bento-item, .project-card, .timeline-year")
        .forEach(el => observer.observe(el));

});