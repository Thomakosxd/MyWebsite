function initContactForm() {

    emailjs.init({
        publicKey: "jXh3yLZ_VG7rq-xEH"
    });

    const form = document.getElementById("contact-form");

    if (!form) return;

    const button = form.querySelector(".submit-btn");

    form.addEventListener("submit", async e => {

        e.preventDefault();

        button.disabled = true;

        button.textContent = isGreek
            ? "Αποστολή..."
            : "Sending...";

        try {

            await emailjs.sendForm(
                "service_e92l43b",
                "template_ee8hvgm",
                form
            );

            form.reset();

            showToast(
                "success",
                isGreek ? "Το μήνυμα στάλθηκε!" : "Message Sent!",
                isGreek
                    ? "Θα σου απαντήσω συνήθως μέσα σε 24–48 ώρες."
                    : "I'll usually reply within 24–48 hours."
            );

        } catch (error) {

            console.error(error);

            showToast(
                "error",
                isGreek ? "Αποτυχία αποστολής" : "Sending Failed",
                isGreek
                    ? "Κάτι πήγε στραβά."
                    : "Something went wrong."
            );

        }

        button.disabled = false;

        button.textContent = isGreek
            ? "Αποστολή Μηνύματος"
            : "Send Message";

    });

}