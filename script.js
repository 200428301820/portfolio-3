// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const contactForm = document.querySelector('.contact-form');

// Loading Animation - Fixed version
window.addEventListener('load', () => {
    // Remove loading screen safely
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.opacity = '0';
        loading.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            if (loading.parentNode) {
                loading.parentNode.removeChild(loading);
            }
        }, 500);
    }
    
    // Ensure page content is visible
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    
    // Initialize typing animation
    initializeTypingAnimation();
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
const updateActiveNav = () => {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNav);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
        }
    });
}, observerOptions);

// Observe all sections for animations
sections.forEach(section => {
    observer.observe(section);
});

// Observe skill items, tool cards, and project cards
const animateElements = document.querySelectorAll('.skill-item, .tool-card, .project-card, .stat');
animateElements.forEach(element => {
    observer.observe(element);
});

// Typing Animation for Hero Title - Fixed version
const initializeTypingAnimation = () => {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = 'Hello, I\'m Pasindu';
        typingText.textContent = '';
        typingText.style.borderRight = '3px solid #3b82f6';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typingText.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing animation
        typeWriter();
    }
};

// Animated Counter for Stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Start animation when element is in view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px'
        });
        
        counterObserver.observe(counter);
    });
};

// Initialize counter animation
animateCounters();

// Skill Item Hover Effects
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(-3px) scale(1)';
    });
});

// Tool Card Hover Effects
const toolCards = document.querySelectorAll('.tool-card');
toolCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-10px) scale(1)';
    });
});

// Project Card Hover Effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-10px) scale(1)';
    });
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Form Input Animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
    });
});

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Enhanced scroll animations
const revealElements = document.querySelectorAll('.skill-category, .tool-card, .project-card, .contact-item');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.visibility = 'visible';
                entry.target.classList.add('animate-fadeInUp');
            }, index * 100);
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    // Set initial styles for animation
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    element.style.visibility = 'hidden';
    
    revealObserver.observe(element);
});

// Handle About section stats separately to prevent disappearing
const aboutStats = document.querySelectorAll('.about .stat');
if (aboutStats.length > 0) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-fadeInUp');
                }, index * 100);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    aboutStats.forEach(stat => {
        // Don't set opacity to 0 for about stats
        stat.style.transform = 'translateY(30px)';
        stat.style.transition = 'all 0.6s ease';
        
        aboutObserver.observe(stat);
    });
}

// Dynamic Theme Colors (Optional Enhancement)
const themeColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
let currentColorIndex = 0;

const changeAccentColor = () => {
    currentColorIndex = (currentColorIndex + 1) % themeColors.length;
    const newColor = themeColors[currentColorIndex];
    
    document.documentElement.style.setProperty('--accent-color', newColor);
};

// Change theme color every 30 seconds (optional)
// setInterval(changeAccentColor, 30000);

// Add dynamic cursor effect
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

// Add cursor styles
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background: #3b82f6;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    }
    
    .cursor.active {
        opacity: 0.7;
        transform: scale(1.5);
    }
    
    @media (max-width: 768px) {
        .cursor {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyle);

// Cursor movement
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.opacity = '0.7';
});

// Cursor effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .skill-item, .tool-card, .project-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
});

// Hide cursor when mouse leaves window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Scroll to top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Add scroll to top button
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopButton.className = 'scroll-top-btn';
scrollTopButton.addEventListener('click', scrollToTop);
document.body.appendChild(scrollTopButton);

// Add scroll to top button styles
const scrollTopStyle = document.createElement('style');
scrollTopStyle.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
    }
    
    .scroll-top-btn.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-top-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4);
    }
`;
document.head.appendChild(scrollTopStyle);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

// Preloader - Improved version
const createPreloader = () => {
    // Only create preloader if it doesn't exist
    if (!document.querySelector('.loading')) {
        const preloader = document.createElement('div');
        preloader.className = 'loading';
        preloader.innerHTML = '<div class="loading-spinner"></div>';
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0e1a;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 1;
            visibility: visible;
        `;
        
        document.body.appendChild(preloader);
        
        // Auto-remove preloader after 3 seconds if window.load doesn't fire
        setTimeout(() => {
            if (document.querySelector('.loading')) {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    if (preloader.parentNode) {
                        preloader.parentNode.removeChild(preloader);
                    }
                }, 500);
            }
        }, 3000);
    }
};

// Only create preloader if page is actually loading
if (document.readyState === 'loading') {
    createPreloader();
}

// Profile Image Loading Handler - Enhanced for custom images
const profileImage = document.querySelector('.profile-image');
const imageWrapper = document.querySelector('.image-wrapper');

if (profileImage && imageWrapper) {
    // Handle image loading error
    profileImage.addEventListener('error', () => {
        console.log('Profile image failed to load, showing fallback');
        profileImage.style.display = 'none';
        
        // Create fallback content
        const fallbackContent = document.createElement('div');
        fallbackContent.className = 'profile-fallback';
        fallbackContent.innerHTML = 'PS';
        fallbackContent.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #3b82f6;
            font-size: 4rem;
            font-weight: 700;
            z-index: 2;
            text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
        `;
        
        imageWrapper.appendChild(fallbackContent);
    });
    
    // Handle successful image load
    profileImage.addEventListener('load', () => {
        console.log('Profile image loaded successfully');
        profileImage.style.display = 'block';
        
        // Remove any fallback content
        const fallback = imageWrapper.querySelector('.profile-fallback');
        if (fallback) {
            fallback.remove();
        }
        
        // Adjust image positioning for better visibility
        const img = profileImage;
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        
        if (aspectRatio > 1) {
            // Landscape image
            img.style.objectFit = 'cover';
            img.style.objectPosition = 'center center';
        } else {
            // Portrait image
            img.style.objectFit = 'cover';
            img.style.objectPosition = 'center top';
        }
    });
    
    // Force check if image is already loaded or failed
    if (profileImage.complete) {
        if (profileImage.naturalWidth === 0) {
            profileImage.dispatchEvent(new Event('error'));
        } else {
            profileImage.dispatchEvent(new Event('load'));
        }
    }
    
    // Allow users to easily replace the image
    window.updateProfileImage = (newImageUrl) => {
        profileImage.src = newImageUrl;
    };
}

// Enhanced scroll animations
const createScrollAnimations = () => {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fadeInUp';
                
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.visibility = 'visible';
                element.classList.add(`animate-${animationType}`);
                
                // Don't unobserve about section elements to prevent disappearing
                if (!element.closest('.about')) {
                    animationObserver.unobserve(element);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Add animation data attributes and initial styles
    const elementsToAnimate = document.querySelectorAll('.skill-category, .tool-card, .project-card, .contact-item');
    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
        
        animationObserver.observe(element);
    });
    
    // Handle stats separately to prevent disappearing
    const statsElements = document.querySelectorAll('.stat');
    statsElements.forEach((element, index) => {
        // Don't set initial opacity to 0 for stats
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
        
        animationObserver.observe(element);
    });
};

// Initialize scroll animations
createScrollAnimations();

// Enhanced form validation
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        const errorElement = input.parentElement.querySelector('.error-message');
        
        // Remove existing error messages
        if (errorElement) {
            errorElement.remove();
        }
        
        // Remove error styling
        input.classList.remove('error');
        
        // Validate required fields
        if (input.hasAttribute('required') && !value) {
            showError(input, 'This field is required');
            isValid = false;
        }
        
        // Validate email
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Validate minimum length
        if (input.hasAttribute('minlength') && value.length < input.getAttribute('minlength')) {
            showError(input, `Minimum ${input.getAttribute('minlength')} characters required`);
            isValid = false;
        }
    });
    
    return isValid;
};

const showError = (input, message) => {
    input.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.5rem';
    
    input.parentElement.appendChild(errorElement);
};

// Add error styles
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444;
        background: rgba(239, 68, 68, 0.1);
    }
    
    .error-message {
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        opacity: 0;
        animation: fadeIn 0.3s ease forwards;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(errorStyles);

// Enhanced contact form with validation
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateForm(contactForm)) {
            return;
        }
        
        const formData = new FormData(contactForm);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission with realistic delay
        setTimeout(() => {
            // Show success message
            showSuccessMessage();
            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

const showSuccessMessage = () => {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
        </div>
    `;
    
    // Add success message styles
    const successStyles = document.createElement('style');
    successStyles.textContent = `
        .success-message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        }
        
        .success-content {
            background: #0f1629;
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            border: 1px solid #3b82f6;
            max-width: 400px;
            width: 90%;
        }
        
        .success-content i {
            font-size: 3rem;
            color: #10b981;
            margin-bottom: 1rem;
        }
        
        .success-content h3 {
            color: #e2e8f0;
            margin-bottom: 1rem;
        }
        
        .success-content p {
            color: #94a3b8;
        }
    `;
    document.head.appendChild(successStyles);
    
    document.body.appendChild(successMessage);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 3000);
};

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Navigate with arrow keys when focused on nav menu
    if (navMenu.classList.contains('active')) {
        const focusedElement = document.activeElement;
        const navLinksArray = Array.from(navLinks);
        const currentIndex = navLinksArray.indexOf(focusedElement);
        
        if (e.key === 'ArrowDown' && currentIndex < navLinksArray.length - 1) {
            e.preventDefault();
            navLinksArray[currentIndex + 1].focus();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            navLinksArray[currentIndex - 1].focus();
        }
    }
});

// Enhanced accessibility
const addAccessibilityFeatures = () => {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: fixed;
        top: -40px;
        left: 6px;
        background: #3b82f6;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 4px;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.id = 'main-content';
    }
    
    // Improve focus indicators
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        *:focus {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }
        
        .btn:focus,
        .nav-link:focus {
            outline: 2px solid #60a5fa;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(focusStyle);
};

// Initialize accessibility features
addAccessibilityFeatures();

// Performance monitoring - Updated
const performanceMonitor = () => {
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Ensure page is visible after load
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
        
        // Report slow loading
        if (loadTime > 3000) {
            console.warn('Page loading time is slower than optimal');
        }
    });
    
    // Monitor scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', utils.throttle(() => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Scroll ended
        }, 100);
    }, 16)); // ~60fps
};

// Initialize performance monitoring
performanceMonitor();

// Error handling and recovery
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    
    // Remove loading screen if there's an error
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.display = 'none';
    }
    
    // Ensure page is visible
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
});

// Handle page visibility changes (for when user switches tabs/windows)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page is visible again, ensure everything is working
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
        
        // Remove any stuck loading screens
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.style.display = 'none';
        }
    }
});

// Fallback initialization if other events fail
setTimeout(() => {
    // Force remove loading screen after 5 seconds
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.display = 'none';
    }
    
    // Ensure page is visible
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    
    // Initialize page if not already done
    if (!window.portfolioInitialized) {
        initializePage();
        window.portfolioInitialized = true;
    }
}, 5000);

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Prevent white screen on refresh - ensure page loads properly
document.addEventListener('DOMContentLoaded', () => {
    // Remove any existing loading screens
    const existingLoading = document.querySelector('.loading');
    if (existingLoading) {
        existingLoading.remove();
    }
    
    // Ensure body is visible
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    
    // Initialize page after DOM is ready
    initializePage();
});

// Page initialization function
const initializePage = () => {
    console.log('Initializing portfolio page...');
    
    // Ensure all sections are visible
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
    });
    
    // Initialize animations after a short delay
    setTimeout(() => {
        createScrollAnimations();
        animateCounters();
    }, 100);
};

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utils for potential use in other scripts
window.portfolioUtils = utils;

console.log('Portfolio website initialized successfully! 🚀');