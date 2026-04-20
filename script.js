// URNAVA Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Dynamic copyright year
    document.querySelectorAll('.current-year').forEach(function(el) {
        el.textContent = new Date().getFullYear();
    });

    // Dropdown navigation (hover only)
    function initDropdown() {
        const navItems = document.querySelectorAll('.nav-item');
        
        // Close dropdown on outside click (desktop only)
        document.addEventListener('click', function(e) {
            if (window.innerWidth > 768) {
                navItems.forEach(navItem => {
                    if (!navItem.contains(e.target)) {
                        navItem.classList.remove('active');
                    }
                });
            }
        });
        
        // Reset state on window resize
        window.addEventListener('resize', function() {
            navItems.forEach(navItem => {
                navItem.classList.remove('mobile-open', 'active');
            });
        });
    }
    
    // Initialize dropdown
    initDropdown();
    
    // Smooth scroll for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Smooth scroll for internal anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            
            // Show/hide navbar based on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Easter egg star click events
    const stars = document.querySelectorAll('.star');
    let clickedStars = new Set();
    
    stars.forEach(star => {
        star.addEventListener('click', function(e) {
            e.preventDefault();
            const starId = this.id;
            
            if (!clickedStars.has(starId)) {
                clickedStars.add(starId);
                this.style.opacity = '1';
                this.style.transform = 'scale(1.5)';
                this.style.transition = 'all 0.3s ease';
                
                // Trigger easter egg when all three stars are clicked (any order)
                if (clickedStars.size === 3) {
                    showEasterEggMessage();
                }
            }
        });
        
        star.style.cursor = 'pointer';
    });
    
    function showEasterEggMessage() {
        const message = document.createElement('div');
        message.className = 'easter-egg-message';
        message.textContent = 'Im Kampf um Gott';
        
        document.body.appendChild(message);
        
        // Fade in
        requestAnimationFrame(() => {
            message.classList.add('show');
        });
        
        // Fade out and remove after 5 seconds
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 5000);
    }
    
    // Section entrance animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll('.question-item, .value-item, .cta-btn');
    animatedElements.forEach(element => {
        sectionObserver.observe(element);
    });
    
    // Initial load animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}); 
