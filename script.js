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

  let typeSpeed = isDeleting ? 30 : 70 + Math.random() * 30;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % texts.length;
    typeSpeed = 400;
  }

  setTimeout(typeEffect, typeSpeed);
}

function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.classList.add('show');
          }, 10);
        } else {
          card.classList.remove('show');
          card.style.display = 'none';
        }
      });
    });
  });
}

// Mobile nav: hamburger button toggles the link list open/closed,
// and picking a link (or resizing back to desktop) closes it again.
function initNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;

  function closeNav() {
    navLinks.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeNav();
  });
}

// Journey timeline: fills the connecting line as you scroll down through it,
// and moves a glowing cursor dot to mark the current position — giving a
// "time passing" feel as you move from the earliest entry towards today.
function initTimelineProgress() {
  const timeline = document.querySelector('.timeline');
  const progressBar = document.querySelector('.timeline-progress');
  const cursor = document.querySelector('.timeline-cursor');
  if (!timeline || !progressBar) return;

  function updateTimelineProgress() {
    const rect = timeline.getBoundingClientRect();
    const viewportPoint = window.innerHeight * 0.5;
    const raw = (viewportPoint - rect.top) / rect.height;
    const progress = Math.min(Math.max(raw, 0), 1);
    progressBar.style.height = (progress * 100) + '%';
    if (cursor) cursor.style.top = (progress * 100) + '%';
  }

  window.addEventListener('scroll', updateTimelineProgress, { passive: true });
  window.addEventListener('resize', updateTimelineProgress);
  updateTimelineProgress();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
  initFilters();
  initNavToggle();
  initTimelineProgress();

  document.querySelectorAll('.bento-item, .project-card, .timeline-year').forEach((el) => {
    observer.observe(el);
  });
});



document.querySelectorAll(".faq-question").forEach(button => {

    button.addEventListener("click", () => {

        const item = button.parentElement;

        document.querySelectorAll(".faq-item").forEach(faq => {
            if(faq !== item){
                faq.classList.remove("active");
            }
        });

        item.classList.toggle("active");

    });

});

emailjs.init({
  publicKey: "jXh3yLZ_VG7rq-xEH"
});

const form = document.getElementById("contact-form");

if (form) {

  const button = form.querySelector(".submit-btn");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    button.disabled = true;
    button.textContent = isGreek ? "Αποστολή..." : "Sending...";
    status.textContent = "";

    try {

      await emailjs.sendForm(
        "service_e92l43b",
        "template_ee8hvgm",
        form
      );

      status.textContent = isGreek
        ? "✅ Το μήνυμα στάλθηκε με επιτυχία!"
        : "✅ Message sent successfully!";

      status.style.color = "#22c55e";

      form.reset();

    } catch (error) {

      console.error(error);

      status.textContent = isGreek
        ? "❌ Κάτι πήγε στραβά. Προσπαθήστε ξανά."
        : "❌ Something went wrong. Please try again.";

      status.style.color = "#ef4444";

    }

    button.disabled = false;
    button.textContent = isGreek
      ? "Αποστολή Μηνύματος"
      : "Send Message";

  });

}