/**
 * DEVGEO - JavaScript Principal
 * Funcionalidad principal para la landing page de DevGEO
 */

'use strict';

// ============================================
// TOGGLE DEL MENÚ MÓVIL
// ============================================
const MobileMenu = {
    init() {
        this.menuBtn = document.getElementById('mobile-menu-btn');
        this.menu = document.getElementById('mobile-menu');
        this.menuLinks = this.menu?.querySelectorAll('a');

        if (this.menuBtn && this.menu) {
            this.bindEvents();
        }
    },

    bindEvents() {
        // Alternar menú al hacer clic en el botón
        this.menuBtn.addEventListener('click', () => this.toggle());

        // Cerrar menú al hacer clic en un enlace
        this.menuLinks?.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
    },

    toggle() {
        this.menu.classList.toggle('active');
        this.updateAriaExpanded();
    },

    close() {
        this.menu.classList.remove('active');
        this.updateAriaExpanded();
    },

    isOpen() {
        return this.menu.classList.contains('active');
    },

    updateAriaExpanded() {
        this.menuBtn.setAttribute('aria-expanded', this.isOpen());
    }
};

// ============================================
// DESPLAZAMIENTO SUAVE
// ============================================
const SmoothScroll = {
    init() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.bindEvents();
    },

    bindEvents() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    },

    handleClick(e) {
        const href = e.currentTarget.getAttribute('href');

        // Ignorar hash vacío o solo "#"
        if (!href || href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Actualizar URL sin saltar
            history.pushState(null, '', href);
        }
    }
};

// ============================================
// EFECTO DE SCROLL EN NAVBAR
// ============================================
const NavbarScroll = {
    init() {
        this.navbar = document.querySelector('.navbar');
        this.scrollThreshold = 50;

        if (this.navbar) {
            this.bindEvents();
        }
    },

    bindEvents() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });

                ticking = true;
            }
        });
    },

    handleScroll() {
        const scrolled = window.scrollY > this.scrollThreshold;
        this.navbar.classList.toggle('navbar--scrolled', scrolled);
    }
};

// ============================================
// INTERSECTION OBSERVER (Animaciones de aparición)
// ============================================
const AnimateOnScroll = {
    init() {
        this.elements = document.querySelectorAll('.animate-on-scroll');

        if (this.elements.length > 0) {
            this.createObserver();
        }
    },

    createObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.elements.forEach(element => observer.observe(element));
    }
};

// ============================================
// UTILIDADES
// ============================================
const Utils = {
    // Función debounce para rendimiento
    debounce(func, wait) {
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

    // Función throttle para rendimiento
    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// ============================================
// INICIALIZACIÓN GLOBAL
// ============================================
window.DevGEO = {
    MobileMenu,
    SmoothScroll,
    NavbarScroll,
    AnimateOnScroll,
    Utils,

    init() {
        // Init modules if DOM is ready, otherwise wait
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initModules());
        } else {
            this.initModules();
        }
    },

    initModules() {
        console.log('🚀 DevGEO initialized');
        this.MobileMenu.init();
        this.SmoothScroll.init();
        this.NavbarScroll.init();
        this.AnimateOnScroll.init();

        document.body.classList.add('loaded');
    },

    // Method to re-initialize navbar-dependent modules
    reInitNavbar() {
        console.log('🔄 Re-initializing Navbar modules');
        this.MobileMenu.init();
        this.NavbarScroll.init();
        this.SmoothScroll.init();

        // Re-init theme toggle if present (it's inline in index but might need checking)
        if (window.initThemeToggle) window.initThemeToggle();
    }
};

// Start App
window.DevGEO.init();

// Expert for compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.DevGEO;
}
