function initFilters() {

    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card");
    const searchInput = document.getElementById("project-search");

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

                requestAnimationFrame(() => {

                    card.classList.add("show");

                });

            } else {

                card.classList.remove("show");
                card.style.display = "none";

            }

        });

    }

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            if (button.dataset.filter === "bot") return;

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