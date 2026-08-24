function showToast(type, title, message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    const icon = document.getElementById("toastIcon");
    const titleEl = document.getElementById("toastTitle");
    const msgEl = document.getElementById("toastMessage");

    if (icon) {
        icon.className = type === "success"
            ? "fa-solid fa-circle-check"
            : "fa-solid fa-circle-xmark";
    }

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;

    toast.className = `toast ${type} show`;

    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 4500);
}

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

function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    if (typeof emailjs !== "undefined") {
        emailjs.init({
            publicKey: "jXh3yLZ_VG7rq-xEH"
        });
    }

    const button = form.querySelector(".submit-btn");

    form.addEventListener("submit", async e => {
        e.preventDefault();

        if (button) {
            button.disabled = true;
            button.textContent = "Sending...";
        }

        try {
            await emailjs.sendForm(
                "service_e92l43b",
                "template_ee8hvgm",
                form
            );

            form.reset();

            showToast(
                "success",
                "Message Sent!",
                "I'll usually reply within 24–48 hours."
            );
        } catch (error) {
            console.error(error);

            showToast(
                "error",
                "Sending Failed",
                "Something went wrong."
            );
        }

        if (button) {
            button.disabled = false;
            button.textContent = "Send Message";
        }
    });
}

function initFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card");
    const searchInput = document.getElementById("project-search");

    if (!buttons.length && !cards.length && !searchInput) return;

    let activeFilter = "all";

    function applyFilters() {
        const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

        cards.forEach(card => {
            const matchesFilter = activeFilter === "all" || activeFilter === card.dataset.category;

            const title = card.querySelector("h3") ? card.querySelector("h3").textContent.toLowerCase() : "";
            const desc = card.querySelector("p") ? card.querySelector("p").textContent.toLowerCase() : "";
            const matchesSearch = query === "" || title.includes(query) || desc.includes(query);

            if (matchesFilter && matchesSearch) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            activeFilter = button.dataset.filter;
            applyFilters();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }
}

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

document.addEventListener("DOMContentLoaded", () => {
    initNavToggle();
    initFilters();
    initScrollTopButton();
    initContactForm();
});