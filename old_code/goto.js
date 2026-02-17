const texts = [
    "👋🏻Hello",
    "🌐Web Developer",
    "🏫High School Student",
    "📏Still Learning",
  ];
    
    let index = 0;
    let charIndex = 0;
    let currentText = "";
    const speed = 100; //a typing speed
    
    function type() {
      currentText = texts[index];
      document.getElementById("typing-text").textContent =
        currentText.substring(0, charIndex + 1);
    
      charIndex++;
    
      if (charIndex < currentText.length) {
        setTimeout(type, speed);
      } else {
        setTimeout(erase, 1500); // wait before erase
      }
    }
    
    function erase() {
      document.getElementById("typing-text").textContent =
        currentText.substring(0, charIndex - 1);
    
      charIndex--;
    
      if (charIndex > 0) {
        setTimeout(erase, 40);
      } else {
        index = (index + 1) % texts.length;
        setTimeout(type, 500);
      }
    }
    
    type();
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('show');
          }
      });
  });
  
  document.querySelectorAll('.skill-percentage').forEach((el) => observer.observe(el));
function goToTomWarps() {
    window.open("https://modrinth.com/plugin/tomwarps", "_blank");
}

function goToTomExpensive() {
    window.open("https://modrinth.com/plugin/tomexpensive", "_blank");
}

function goToDiscord() {
    window.open("https://discord.gg/4YDMkn5u3y", "_blank");
}

function goToModrinth() {
    window.open("https://modrinth.com/user/Thomakosxd", "_blank");
}

function goToGitHub() {
    window.open("https://github.com/Thomakosxd", "_blank");
}

function goToEmail() {
    window.location.href='mailto:thomasts1801@gmail.com'
}

function goToAutoSlow() {
    window.open("https://github.com/Thomakosxd/AutoSlowModeBot.py", "_blank");
}
