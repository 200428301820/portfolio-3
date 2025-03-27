/**
 * Pasindu Sandamal - Portfolio Website
 * Main JavaScript
 */

"use strict";

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // -------------------------------------------
    // Preloader
    // -------------------------------------------
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('preloader-hidden');
            
            // Start animations when page is loaded
            startAnimations();
            
            // Initialize AOS animations
            initAOS();
            
            // Initialize skill bars
            initSkillBars();
        }, 1000);
    });
    
    // -------------------------------------------
    // Mobile Navigation
    // -------------------------------------------
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            body.classList.toggle('mobile-menu-active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                body.classList.remove('mobile-menu-active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
    
    // -------------------------------------------
    // Sticky Header
    // -------------------------------------------
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // -------------------------------------------
    // Smooth Scrolling
    // -------------------------------------------
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is not just a "#"
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // -------------------------------------------
    // Active Navigation Link Highlighting
    // -------------------------------------------
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    function setActiveLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding nav links
                document.querySelectorAll(`.nav-link[href="#${sectionId}"]`).forEach(link => {
                    link.classList.add('active');
                });
                
                document.querySelectorAll(`.mobile-nav-link[href="#${sectionId}"]`).forEach(link => {
                    link.classList.add('active');
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('load', setActiveLink);
    
    // -------------------------------------------
    // Project Filtering
    // -------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.style.display = 'block';
                        
                        // Add animation effect
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // -------------------------------------------
    // Initialize Skill Bars
    // -------------------------------------------
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress-bar');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }
    
    // -------------------------------------------
    // Project Modal
    // -------------------------------------------
    const projectLinks = document.querySelectorAll('.project-link');
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (projectLinks.length > 0 && projectModal) {
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                projectModal.classList.add('active');
                body.style.overflow = 'hidden';
            });
        });
        
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                projectModal.classList.remove('active');
                body.style.overflow = '';
            });
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', function() {
                projectModal.classList.remove('active');
                body.style.overflow = '';
            });
        }
    }
    
    // -------------------------------------------
    // Back to Top Button
    // -------------------------------------------
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // -------------------------------------------
    // Form Validation
    // -------------------------------------------
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (subjectInput.value.trim() === '') {
                showError(subjectInput, 'Please enter a subject');
                isValid = false;
            } else {
                removeError(subjectInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
                submitBtn.disabled = true;
                
                // Simulate API call delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = '<span class="btn-text">Message Sent!</span><span class="btn-icon"><i class="fas fa-check"></i></span>';
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                    
                    // Show success message
                    showSuccessMessage('Your message has been sent successfully!');
                }, 1500);
            }
        });
        
        // Validate email function
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Show error function
        function showError(input, message) {
            const formGroup = input.closest('.form-group');
            let errorElement = formGroup.querySelector('.error-message');
            
            input.classList.add('error');
            
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        // Remove error function
        function removeError(input) {
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            
            input.classList.remove('error');
            
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }
        
        // Show success message
        function showSuccessMessage(message) {
            let successElement = document.querySelector('.success-message');
            
            if (!successElement) {
                successElement = document.createElement('div');
                successElement.className = 'success-message';
                contactForm.appendChild(successElement);
            }
            
            successElement.textContent = message;
            successElement.style.display = 'block';
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successElement.style.display = 'none';
            }, 5000);
        }
    }
    
    // -------------------------------------------
    // Newsletter Form
    // -------------------------------------------
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            if (emailInput.value.trim() === '') {
                emailInput.classList.add('error');
                return;
            }
            
            if (!isValidEmail(emailInput.value)) {
                emailInput.classList.add('error');
                return;
            }
            
            emailInput.classList.remove('error');
            
            // Simulate submission
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                newsletterForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                }, 2000);
            }, 1500);
        });
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
    
    // -------------------------------------------
    // AOS Initialization (custom implementation)
    // -------------------------------------------
    function initAOS() {
        const aosElements = document.querySelectorAll('[data-aos]');
        
        function checkIfInView() {
            aosElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('aos-animate');
                }
            });
        }
        
        window.addEventListener('scroll', checkIfInView);
        checkIfInView(); // Check on initial load
    }
    
    // -------------------------------------------
    // Start Animations
    // -------------------------------------------
    function startAnimations() {
        const heroElements = document.querySelectorAll('.hero-section [data-aos]');
        
        // Animate hero section elements sequentially
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('aos-animate');
            }, index * 200);
        });
    }
    
    // -------------------------------------------
    // Prevent FOUC (Flash of Unstyled Content)
    // -------------------------------------------
    document.documentElement.classList.add('js-loaded');
});