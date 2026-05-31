const texts = [
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

  document.querySelectorAll('.bento-item, .project-card').forEach((el) => {
    observer.observe(el);
  });
});