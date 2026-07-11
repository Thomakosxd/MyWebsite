function initTimelineProgress() {

    const timeline = document.querySelector(".timeline");
    const progress = document.querySelector(".timeline-progress");
    const cursor = document.querySelector(".timeline-cursor");

    if (!timeline || !progress) return;

    function update() {

        const rect = timeline.getBoundingClientRect();

        const value = Math.min(
            Math.max((window.innerHeight * .5 - rect.top) / rect.height, 0),
            1
        );

        progress.style.height = `${value * 100}%`;

        if (cursor) {

            cursor.style.top = `${value * 100}%`;

        }

    }

    window.addEventListener("scroll", update, { passive: true });

    window.addEventListener("resize", update);

    update();

}