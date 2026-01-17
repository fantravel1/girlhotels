/**
 * GirlHotels - Main JavaScript
 * The World's Premier Directory of Female-Friendly Hotels
 */

(function() {
    'use strict';

    // ============================================
    // DOM Ready
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initLanguageSelector();
        initDropdowns();
        initSmoothScroll();
        initAnimations();
        initSearchForm();
        initNewsletterForm();
    });

    // ============================================
    // Mobile Menu
    // ============================================
    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('is-open');

            // Prevent body scroll when menu is open
            document.body.style.overflow = menu.classList.contains('is-open') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('is-open');
                document.body.style.overflow = '';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('is-open')) {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('is-open');
                document.body.style.overflow = '';
                toggle.focus();
            }
        });
    }

    // ============================================
    // Language Selector
    // ============================================
    function initLanguageSelector() {
        const toggle = document.querySelector('.lang-toggle');
        const menu = document.querySelector('.lang-menu');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('is-open');
        });

        // Close on click outside
        document.addEventListener('click', function(e) {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('is-open');
            }
        });

        // Keyboard navigation
        menu.querySelectorAll('a').forEach(function(link, index, links) {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    links[(index + 1) % links.length].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    links[(index - 1 + links.length) % links.length].focus();
                } else if (e.key === 'Escape') {
                    toggle.setAttribute('aria-expanded', 'false');
                    menu.classList.remove('is-open');
                    toggle.focus();
                }
            });
        });
    }

    // ============================================
    // Dropdown Menus (Desktop)
    // ============================================
    function initDropdowns() {
        const dropdowns = document.querySelectorAll('.has-dropdown');

        dropdowns.forEach(function(dropdown) {
            const link = dropdown.querySelector('.nav-link');
            const menu = dropdown.querySelector('.dropdown-menu');

            if (!link || !menu) return;

            // Show/hide on focus for keyboard users
            dropdown.addEventListener('focusin', function() {
                menu.style.display = 'flex';
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            });

            dropdown.addEventListener('focusout', function(e) {
                if (!dropdown.contains(e.relatedTarget)) {
                    menu.style.display = '';
                    menu.style.opacity = '';
                    menu.style.visibility = '';
                    menu.style.transform = '';
                }
            });

            // Mobile: toggle on click
            if (window.innerWidth < 992) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
                });
            }
        });
    }

    // ============================================
    // Smooth Scroll
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update focus for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        });
    }

    // ============================================
    // Scroll Animations
    // ============================================
    function initAnimations() {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) return;

        const animatedElements = document.querySelectorAll(
            '.category-card, .destination-card, .hotel-card, .story-card, .stat'
        );

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(function(el, index) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease ' + (index % 6) * 0.1 + 's, transform 0.6s ease ' + (index % 6) * 0.1 + 's';
            observer.observe(el);
        });

        // Header scroll effect
        const header = document.querySelector('.site-header');
        if (header) {
            let lastScroll = 0;
            window.addEventListener('scroll', function() {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 100) {
                    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    header.style.boxShadow = '';
                }

                lastScroll = currentScroll;
            }, { passive: true });
        }
    }

    // ============================================
    // Search Form
    // ============================================
    function initSearchForm() {
        const searchForm = document.querySelector('.search-form');
        const searchInput = document.querySelector('.search-input');

        if (!searchForm || !searchInput) return;

        // Auto-suggest destinations (placeholder for future implementation)
        const popularDestinations = [
            'Paris, France',
            'Tokyo, Japan',
            'New York, USA',
            'Barcelona, Spain',
            'London, UK',
            'Bali, Indonesia',
            'Rome, Italy',
            'Bangkok, Thailand'
        ];

        searchInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(225, 29, 72, 0.2)';
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = '';
        });

        // Form submission
        searchForm.addEventListener('submit', function(e) {
            const query = searchInput.value.trim();
            if (!query) {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }

    // ============================================
    // Newsletter Form
    // ============================================
    function initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!isValidEmail(email)) {
                showFormMessage(form, 'Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(function() {
                submitBtn.textContent = 'Subscribed!';
                emailInput.value = '';
                showFormMessage(form, 'Thank you for subscribing! Check your inbox soon.', 'success');

                setTimeout(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }

    // ============================================
    // Utility Functions
    // ============================================
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showFormMessage(form, message, type) {
        // Remove existing message
        const existingMsg = form.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();

        // Create new message
        const msgEl = document.createElement('p');
        msgEl.className = 'form-message';
        msgEl.textContent = message;
        msgEl.style.cssText = 'margin-top: 1rem; font-size: 0.875rem; ' +
            (type === 'error' ? 'color: #FCA5A5;' : 'color: #A7F3D0;');

        form.appendChild(msgEl);

        // Remove message after 5 seconds
        setTimeout(function() {
            msgEl.remove();
        }, 5000);
    }

    // ============================================
    // Safety Score Animation
    // ============================================
    function animateSafetyScore() {
        const scoreCircle = document.querySelector('.score-fill');
        if (!scoreCircle) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    scoreCircle.style.transition = 'stroke-dashoffset 1.5s ease-out';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(scoreCircle);
    }

    // Initialize safety score animation after DOM ready
    document.addEventListener('DOMContentLoaded', animateSafetyScore);

    // ============================================
    // Lazy Loading Images (Native + Fallback)
    // ============================================
    function initLazyLoading() {
        // Use native lazy loading if supported
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(function(img) {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback for older browsers
            const lazyImages = document.querySelectorAll('img[data-src]');

            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                lazyImages.forEach(function(img) {
                    imageObserver.observe(img);
                });
            } else {
                // Fallback: load all images
                lazyImages.forEach(function(img) {
                    img.src = img.dataset.src;
                });
            }
        }
    }

    document.addEventListener('DOMContentLoaded', initLazyLoading);

})();
