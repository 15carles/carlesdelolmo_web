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
            const response = await fetch(`components/${componentName}.html`);

            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentName}`);
            }

            const html = await response.text();
            const targetElement = document.querySelector(targetSelector);

            if (targetElement) {
                targetElement.outerHTML = html;
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
        // Load footer component
        const footerPlaceholder = document.querySelector('[data-component="footer"]');
        if (footerPlaceholder) {
            loadComponent('footer', '[data-component="footer"]');
        }
    });
})();
