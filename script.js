// script.js

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Change icon
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            mobileMenu.click();
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check if user has a preference saved
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
} else if (currentTheme === 'light') {
    document.body.classList.remove('dark-mode');
    darkModeToggle.textContent = '🌙';
} else if (prefersDarkScheme.matches) {
    // If no saved preference but system prefers dark
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update local storage and toggle icon
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        darkModeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        darkModeToggle.textContent = '🌙';
    }
});

// Form Validation
function validateForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    // Reset error states
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    messageInput.classList.remove('error');
    
    let isValid = true;
    
    if (name === '') {
        nameInput.classList.add('error');
        isValid = false;
    }
    
    if (email === '' || !isValidEmail(email)) {
        emailInput.classList.add('error');
        isValid = false;
    }
    
    if (message === '') {
        messageInput.classList.add('error');
        isValid = false;
    }
    
    if (!isValid) {
        alert('Please fill all fields correctly.');
        return false;
    }
    
    // Form is valid - normally would submit to server
    alert('Thank you for your message! I will get back to you soon.');
    
    // Clear form
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
    
    return false; // Prevent actual form submission for demo purposes
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animation on scroll
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

function handleScrollAnimation() {
    const elements = document.querySelectorAll('.service, .portfolio-item, .contact-container');
    
    elements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('fade-in', 'animated');
        }
    });
}

// Initial check and add scroll listener
handleScrollAnimation();
window.addEventListener('scroll', handleScrollAnimation);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for portfolio filter
    const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilterBtn) {
        allFilterBtn.click();
    }
    
    // Set skill level animations
    document.querySelectorAll('.skill-level').forEach(skill => {
        skill.style.width = '0';
        setTimeout(() => {
            skill.style.width = skill.getAttribute('style').split(':')[1];
        }, 500);
    });
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize project filters on projects and portfolio pages
    initProjectFilters();
});

// FAQ Accordion functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if current item is already active
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Toggle current item if it wasn't active before
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Project filtering on projects and portfolio pages
function initProjectFilters() {
    const filterContainers = document.querySelectorAll('.project-filters, .portfolio-filters');
    
    filterContainers.forEach(container => {
        const filterBtns = container.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-card, .portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons in this container
                filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    });
}

// Contact form handler for contact page
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateForm();
    });
}
