// Hilltop Babies - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Language switching functionality with persistence
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Function to apply language to the page
    function applyLanguage(lang) {
        // Update all elements with language attributes
        const elementsToTranslate = document.querySelectorAll('[data-fi], [data-en]');
        elementsToTranslate.forEach(element => {
            if (element.hasAttribute(`data-${lang}`)) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = element.getAttribute(`data-${lang}`);
                } else {
                    element.innerHTML = element.getAttribute(`data-${lang}`);
                }
            }
        });
        
        // Update active button
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Save to localStorage
        localStorage.setItem('selectedLanguage', lang);
    }
    
    // Check for saved language preference on page load
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
        applyLanguage(savedLang);
    } else {
        // Default to Finnish if no preference saved
        applyLanguage('fi');
    }
    
    // Add click handlers to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            applyLanguage(lang);
        });
    });
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinksAll = document.querySelectorAll('.nav-list a');
    
    navLinksAll.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Dolls page: simple per-card slideshow (used for Nukke 1)
    const carousels = document.querySelectorAll('.doll-image-carousel');
    carousels.forEach(carousel => {
        const images = Array.from(carousel.querySelectorAll('.doll-image'));
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');

        if (images.length === 0) return;

        let currentIndex = images.findIndex(img => img.classList.contains('active'));
        if (currentIndex < 0) currentIndex = 0;

        function showSlide(nextIndex) {
            const total = images.length;
            currentIndex = ((nextIndex % total) + total) % total;
            images.forEach((img, idx) => img.classList.toggle('active', idx === currentIndex));
        }

        if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

        showSlide(currentIndex);
    });
});
