function initFAQ() {

    document.querySelectorAll(".faq-question").forEach(button => {

        button.addEventListener("click", () => {

            const item = button.parentElement;

            document.querySelectorAll(".faq-item").forEach(faq => {

                if (faq !== item) {

                    faq.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });

}