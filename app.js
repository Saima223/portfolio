// Typing Animation
const typingTexts = ['Web Development', 'Java', 'Front-End Development', 'Problem Solving'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const dynamicText = document.querySelector('.dynamic-text');
    if (!dynamicText) return;
    
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
        setTimeout(typeText, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        setTimeout(typeText, 500);
    } else {
        setTimeout(typeText, isDeleting ? 50 : 100);
    }
}

// Project Filtering
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const isVisible = filterValue === 'all' || card.getAttribute('data-category') === filterValue;
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    card.style.display = isVisible ? 'block' : 'none';
                    if (isVisible) {
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        });
                    }
                }, 300);
            });
        });
    });
}

// Dark mode functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    function setDarkMode(enabled) {
        body.classList.toggle('dark-mode', enabled);
        localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
    }

    // Initialize dark mode based on user preference
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    setDarkMode(isDarkMode);
    darkModeToggle.checked = isDarkMode;

    darkModeToggle.addEventListener('change', () => setDarkMode(darkModeToggle.checked));
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    typeText();
    initProjectFilters();
    initDarkMode();
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.navbar-collapse')?.classList.remove('show');
        });
    });
});