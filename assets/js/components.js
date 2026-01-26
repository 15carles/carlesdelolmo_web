/**
 * Component Loader
 * Loads modular HTML components dynamically
 */

(function () {
    'use strict';

    /**
     * Load a component from the components directory
     * @param {string} componentName - Name of the component file (without .html)
     * @param {string} targetSelector - CSS selector where to inject the component
     */
    async function loadComponent(componentName, targetSelector) {
        try {
            // Determine base path by looking at the script tag that loaded this file
            const scriptTag = document.querySelector('script[src*="components.js"]');
            let basePath = 'components/'; // Default

            if (scriptTag) {
                const src = scriptTag.getAttribute('src');
                if (src.includes('../')) {
                    basePath = '../components/';
                }
            }

            // Fallback: Check if we are in a known subdirectory structure
            let isSubdirectory = window.location.pathname.split('/').length > 2 && !window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/');

            // Sync isSubdirectory with authoritative basePath from script tag
            if (basePath.includes('../')) {
                isSubdirectory = true;
            }
            // Note: The previous logic was simpler but potentially fragile. The script tag check is authoritative.

            const response = await fetch(`${basePath}${componentName}.html`);

            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentName}`);
            }

            const html = await response.text();

            // If loading navbar, process links before injection
            let finalHtml = html;
            if (componentName === 'navbar' && isSubdirectory) {
                // Fix relative links for subdirectories
                finalHtml = finalHtml.replace(/href="index\.html/g, 'href="../index.html');
                finalHtml = finalHtml.replace(/href="blog\//g, 'href="../blog/');
                finalHtml = finalHtml.replace(/href="proyectos\//g, 'href="../proyectos/');
            }

            const targetElement = document.querySelector(targetSelector);

            if (targetElement) {
                targetElement.outerHTML = finalHtml;

                // Post-load actions
                if (componentName === 'navbar') {
                    // Set active link
                    const currentPath = window.location.pathname;
                    const links = document.querySelectorAll('.navbar__link');

                    links.forEach(link => {
                        const href = link.getAttribute('href');
                        // Simple active check - can be improved
                        if (href && currentPath.includes(href.replace('../', '').split('#')[0]) && href !== '../index.html' && href !== 'index.html') {
                            link.classList.add('active');
                        }
                    });

                    // Re-init global modules that depend on navbar
                    if (window.DevGEO && window.DevGEO.reInitNavbar) {
                        window.DevGEO.reInitNavbar();
                    }
                }
            } else {
                console.warn(`Target element not found: ${targetSelector}`);
            }
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
        }
    }

    /**
     * Load all components when DOM is ready
     */
    document.addEventListener('DOMContentLoaded', function () {
        // Load navbar
        if (document.querySelector('[data-component="navbar"]')) {
            loadComponent('navbar', '[data-component="navbar"]');
        }

        // Load footer component
        const footerPlaceholder = document.querySelector('[data-component="footer"]');
        if (footerPlaceholder) {
            loadComponent('footer', '[data-component="footer"]');
        }
    });
})();
