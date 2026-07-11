function initScrollTopButton() {

    const button = document.getElementById("scrollTopBtn");

    if (!button) return;

    function update() {

        button.classList.toggle("show", window.scrollY > 350);

    }

    window.addEventListener("scroll", update, { passive: true });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

    update();

}