function initFilters() {

    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const filter = button.dataset.filter;

            cards.forEach(card => {

                if (filter === "all" || filter === card.dataset.category) {

                    card.style.display = "flex";

                    requestAnimationFrame(() => {

                        card.classList.add("show");

                    });

                } else {

                    card.classList.remove("show");
                    card.style.display = "none";

                }

            });

        });

    });

}