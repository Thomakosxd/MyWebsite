/* --- TYPING EFFECT --- */
const texts = [
  "👋🏻 Hello",
  "🌐 Web Developer",
  "🏫 High School Student",
  "📏 Still Learning",
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
  const target = document.getElementById("typing-text");
  if (!target) return;

  currentText = texts[index];
  
  if (isDeleting) {
    target.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    target.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 40 : 100 + Math.random() * 50;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % texts.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}

/* --- NAVIGATION & LINKS --- */
const openLink = (url) => window.open(url, "_blank", "noopener,noreferrer");

const goToTomWarps = () => openLink("https://modrinth.com/plugin/tomwarps");
const goToTomExpensive = () => openLink("https://modrinth.com/plugin/tomexpensive");
const goToDiscord = () => openLink("https://discord.gg/4YDMkn5u3y");
const goToModrinth = () => openLink("https://modrinth.com/user/Thomakosxd");
const goToGitHub = () => openLink("https://github.com/Thomakosxd");
const goToMcLeader = () => openLink("https://mcleader.thomasts.site");
const goToEmail = () => window.location.href = 'mailto:thomasts1801@gmail.com';

/* --- INTERSECTION OBSERVER --- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });

/* --- INITIALIZATION --- */
document.addEventListener("DOMContentLoaded", () => {
  typeEffect();

  document.querySelectorAll('.skill-percentage, .bento-item, .project-card').forEach((el) => {
    observer.observe(el);
  });

  console.log(
    "%c🚀 THOMAS PORTFOLIO %c\nDeveloped by Thomas. Feel free to explore!",
    "color: #00e5ff; font-size: 24px; font-weight: bold; background: #111; padding: 5px 10px; border-radius: 5px;",
    "color: #b0bec5; font-size: 14px;"
  );
});