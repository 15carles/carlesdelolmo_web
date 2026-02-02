/**
 * Theme Toggle Script
 * Manages light/dark mode switching with localStorage persistence
 */

(function () {
    'use strict';

    // Get theme from localStorage or default to 'light'
    function getStoredTheme() {
        return localStorage.getItem('theme') || 'light';
    }

    // Set theme on document
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Apply theme immediately (before page renders to avoid flash)
    const currentTheme = getStoredTheme();
    setTheme(currentTheme);

    // Helper: Update toggle button icons
    function updateToggleIcon(button) {
        if (!button) return;

        const theme = getStoredTheme();
        const sunIcon = button.querySelector('.theme-toggle__icon--sun');
        const moonIcon = button.querySelector('.theme-toggle__icon--moon');

        if (!sunIcon || !moonIcon) return;

        if (theme === 'dark') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }

    // Main Init Function (Exposed Globally)
    window.initThemeToggle = function () {
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');

        // Toggle action
        function toggleTheme() {
            const currentTheme = getStoredTheme();
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);

            // Update all buttons found in DOM
            updateToggleIcon(document.getElementById('theme-toggle'));
            updateToggleIcon(document.getElementById('theme-toggle-mobile'));
        }

        // Initialize state for found buttons
        if (themeToggle) updateToggleIcon(themeToggle);
        if (themeToggleMobile) updateToggleIcon(themeToggleMobile);

        // Attach Listeners (removing old ones not needed as we replace element or it's idempotent enough)
        // A simple way to avoid duplicate listeners is to check a flag, but since we are re-initializing
        // because the element was *replaced* or *newly created*, simply adding listener is fine.

        if (themeToggle) {
            themeToggle.onclick = toggleTheme; // Use onclick property to overwrite previous if any, safer for re-init
        }

        if (themeToggleMobile) {
            themeToggleMobile.onclick = toggleTheme;
        }
    };

    // Initialize on load (in case buttons are static)
    document.addEventListener('DOMContentLoaded', window.initThemeToggle);
})();
