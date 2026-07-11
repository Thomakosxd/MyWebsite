const isGreek = document.documentElement.lang === "el";

const texts = isGreek
    ? [
        "Προγραμματιστής",
        "Μαθητής Πληροφορικής"
    ]
    : [
        "Software Developer",
        "IT Student",
        "Backend & Systems Enthusiast"
    ];

let index = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const target = document.getElementById("typing-text");

    if (!target) return;

    const currentText = texts[index];

    target.textContent = isDeleting
        ? currentText.substring(0, --charIndex)
        : currentText.substring(0, ++charIndex);

    let speed = isDeleting ? 30 : 70 + Math.random() * 30;

    if (!isDeleting && charIndex === currentText.length) {

        speed = 2000;
        isDeleting = true;

    } else if (isDeleting && charIndex === 0) {

        isDeleting = false;
        index = (index + 1) % texts.length;
        speed = 400;

    }

    setTimeout(typeEffect, speed);

}