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
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            darkModeToggle.textContent = '🌙';
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            darkModeToggle.textContent = '☀️';
        }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Initialize skill bars animation
    const skillLevels = document.querySelectorAll('.skill-level');
    
    if (skillLevels.length > 0) {
        skillLevels.forEach(skill => {
            const level = skill.getAttribute('data-level');
            setTimeout(() => {
                skill.style.width = level + '%';
            }, 300);
        });
    }
    
    // Tilt effect for cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Simple hover effect without the complex 3D tilt
            this.classList.add('hovering');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovering');
        });
    });
    
    // Initialize AOS-like scroll animations
    document.addEventListener('scroll', revealOnScroll);
    
    function revealOnScroll() {
        const elementsToReveal = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
        
        elementsToReveal.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial call to reveal elements
    revealOnScroll();
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

// Animation on scroll - Enhanced version
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

function handleScrollAnimation() {
    const animationElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    
    animationElements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('animated');
            
            // Optional: Add slight delay to stagger animations if there are multiple elements in a section
            if (element.dataset.delay) {
                element.style.animationDelay = element.dataset.delay + 's';
            }
        }
    });
}

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    skillBars.forEach(bar => {
        if (isInViewport(bar) && !bar.classList.contains('animated')) {
            const targetWidth = bar.getAttribute('data-level') + '%';
            setTimeout(() => {
                bar.style.width = targetWidth;
                bar.classList.add('animated');
            }, 200);
        }
    });
}

// Portfolio item reveal
function revealPortfolioItems() {
    const portfolioItems = document.querySelectorAll('.portfolio-item, .project-item');
    
    portfolioItems.forEach((item, index) => {
        if (isInViewport(item) && !item.classList.contains('animated')) {
            // Add staggered animation delay
            setTimeout(() => {
                item.classList.add('fade-in-up', 'animated');
            }, index * 150);
        }
    });
}

// Feature cards animation
function animateFeatureCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        if (isInViewport(card) && !card.classList.contains('animated')) {
            setTimeout(() => {
                card.classList.add('animated');
                card.style.transitionDelay = (index * 0.1) + 's';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}

// Run all animations on scroll
function runScrollAnimations() {
    handleScrollAnimation();
    animateSkillBars();
    revealPortfolioItems();
    animateFeatureCards();
}

// Set initial styles for cards
function setupAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (!card.classList.contains('animated')) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
    });
}

// Initialize scroll effects
setupAnimations();
runScrollAnimations(); // Run once on page load
window.addEventListener('scroll', runScrollAnimations);
window.addEventListener('resize', runScrollAnimations);

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
    
    // Smooth scrolling for contact section
    const contactLink = document.querySelector('a[href="#contact-form-section"]');
    
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = document.getElementById('contact-form-section');
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Also initialize FAQ on window load to ensure all resources are loaded
window.addEventListener('load', function() {
    initFaqAccordion();
});

// FAQ Accordion functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
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
            
            // Force browser reflow to ensure animation works
            window.getComputedStyle(item.querySelector('.faq-answer')).getPropertyValue('max-height');
        });
    });
    
    // Ensure first item is open by default if none are active
    let hasActive = false;
    faqItems.forEach(item => {
        if (item.classList.contains('active')) {
            hasActive = true;
        }
    });
    
    if (!hasActive && faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
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
