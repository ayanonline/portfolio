// script.js

// Initialize theme to always be dark mode
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Always set dark mode
    document.body.classList.add('dark-mode');
    
    // Hide the theme toggle button or change it to another icon
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.style.display = 'none'; // Hide the toggle button
    }
}

// Text Rotation Animation for Hero Section
class TxtRotate {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }
    
    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
        
        let delta = 200 - Math.random() * 100;
        
        if (this.isDeleting) { delta /= 2; }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        
        setTimeout(() => {
            this.tick();
        }, delta);
    }
}

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
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
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form Validation
function validateForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

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

    alert('Thank you for your message! I will get back to you soon.');

    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';

    return false;
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
        filterButtons.forEach(btn => btn.classList.remove('active'));
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
            if (element.dataset.delay) {
                element.style.animationDelay = element.dataset.delay + 's';
            }
        }
    });
}

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

function revealPortfolioItems() {
    const portfolioItems = document.querySelectorAll('.portfolio-item, .project-item');

    portfolioItems.forEach((item, index) => {
        if (isInViewport(item) && !item.classList.contains('animated')) {
            setTimeout(() => {
                item.classList.add('fade-in-up', 'animated');
            }, index * 150);
        }
    });
}

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

function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        if (isInViewport(item) && !item.classList.contains('animated')) {
            setTimeout(() => {
                item.classList.add('animated');
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 200 * index);
        }
    });
}

function runScrollAnimations() {
    handleScrollAnimation();
    animateSkillBars();
    revealPortfolioItems();
    animateFeatureCards();
    animateTimelineItems();
}

function setupAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (!card.classList.contains('animated')) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
    });

    // Animation on scroll
    window.addEventListener('scroll', () => {
        runScrollAnimations();
    });

    // Run initially in case elements are already in view
    setTimeout(runScrollAnimations, 100);

    // Init form animations
    initContactForm();

    // Initialize tilt effect for images
    initTiltEffect();
}

document.addEventListener('DOMContentLoaded', function () {
    // ✅ Apply permanent dark mode
    document.body.classList.add('dark-mode');

    // Skill level animations
    document.querySelectorAll('.skill-level').forEach(skill => {
        skill.style.width = '0';
        setTimeout(() => {
            skill.style.width = skill.getAttribute('style').split(':')[1];
        }, 500);
    });

    // Portfolio filter default
    const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilterBtn) {
        allFilterBtn.click();
    }

    // Initialize FAQ accordion
    initFaqAccordion();

    // Project filters
    initProjectFilters();

    // Smooth scroll to contact
    const contactLink = document.querySelector('a[href="#contact-form-section"]');
    if (contactLink) {
        contactLink.addEventListener('click', function (e) {
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

    setupAnimations();
});

window.addEventListener('scroll', runScrollAnimations);
window.addEventListener('resize', runScrollAnimations);
window.addEventListener('load', initFaqAccordion);

// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faqItem => faqItem.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
            window.getComputedStyle(item.querySelector('.faq-answer')).getPropertyValue('max-height');
        });
    });

    // Ensure at least one open
    let hasActive = false;
    faqItems.forEach(item => {
        if (item.classList.contains('active')) {
            hasActive = true;
        }
    });
    if (!hasActive) {
        faqItems[0].classList.add('active');
    }
}

// Project Filters
function initProjectFilters() {
    const filterContainers = document.querySelectorAll('.project-filters, .portfolio-filters');

    filterContainers.forEach(container => {
        const filterBtns = container.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-card, .portfolio-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
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

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        validateForm();
    });
}

// Initialize Particles.js for hero background
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#4f46e5' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4f46e5',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
    
    if (typeof particlesJS !== 'undefined' && document.getElementById('cta-particles')) {
        particlesJS('cta-particles', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'bubble' },
                    onclick: { enable: true, mode: 'repulse' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// Initialize VanillaTilt for 3D hover effects
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `perspective(1000px) rotateX(${deltaY * -5}deg) rotateY(${deltaX * 5}deg)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

function initTextRotaters() {
    const elements = document.querySelectorAll('.txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
}

// Initialize all components
function initComponents() {
    initTheme();
    initHeaderScroll();
    initTextRotaters();
    initParticles();
    initTiltEffect();
    initProjectFilters();
    setupAnimations();
}

// Run everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', initComponents);

// Contact form enhancements
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const contactMethodItems = document.querySelectorAll('.contact-method-item');
    
    // Add hover animation classes to contact methods
    contactMethodItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
    });
    
    // Form submission animation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            if (!validateForm()) {
                return false;
            }
            
            // Add loading animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.classList.add('btn-success');
                
                // Reset form fields
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-success');
                }, 3000);
            }, 2000);
            
            return false;
        });
    }
}
