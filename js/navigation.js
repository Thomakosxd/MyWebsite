function initNavToggle() {

    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("nav-links");

    if (!toggle || !nav) return;

    const close = () => {

        nav.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");

    };

    toggle.addEventListener("click", () => {

        const open = nav.classList.toggle("nav-open");

        toggle.setAttribute("aria-expanded", open);

    });

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", close);

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 860) {

            close();

        }

    });

}