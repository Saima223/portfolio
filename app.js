// Typing Animation
const typingTexts = ['Web Development', 'MEAN Stack', 'UI/UX Design', 'Problem Solving'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const dynamicText = document.querySelector('.dynamic-text');
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        dynamicText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        dynamicText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, 2000); // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        setTimeout(typeText, 500); // Pause before
    } else {
      setTimeout(typeText, isDeleting ? 50 : 100);
  }
}

// Start typing animation
typeText();

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Parallax effect for gradient spheres
window.addEventListener('mousemove', (e) => {
  const spheres = document.querySelectorAll('.gradient-sphere, .gradient-sphere-2');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  spheres.forEach(sphere => {
      const speed = sphere.classList.contains('gradient-sphere') ? 30 : -30;
      sphere.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
  });
});

// Project Filtering
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          // Remove active class from all buttons
          filterBtns.forEach(b => b.classList.remove('active'));
          // Add active class to clicked button
          btn.classList.add('active');

          const filterValue = btn.getAttribute('data-filter');

          projectCards.forEach(card => {
              card.style.opacity = '0';
              card.style.transform = 'scale(0.8)';
              
              setTimeout(() => {
                  if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                      card.style.display = 'block';
                      setTimeout(() => {
                          card.style.opacity = '1';
                          card.style.transform = 'scale(1)';
                      }, 50);
                  } else {
                      card.style.display = 'none';
                  }
              }, 300);
          });
      });
  });
});
// Add scrolled class to navbar on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Function to update icon visibility
function updateIcons(isDarkMode) {
  sunIcon.style.display = isDarkMode ? 'none' : 'inline-block';
  moonIcon.style.display = isDarkMode ? 'inline-block' : 'none';
}

// Check for saved user preference
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
  darkModeToggle.checked = true;
  updateIcons(true);
} else {
  updateIcons(false);
}

darkModeToggle.addEventListener('change', () => {
  if (darkModeToggle.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
    updateIcons(true);
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', null);
    updateIcons(false);
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  });
});