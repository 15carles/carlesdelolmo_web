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

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function () {
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');

        if (!themeToggle && !themeToggleMobile) {
            console.warn('Theme toggle buttons not found');
            return;
        }

        // Update toggle button icons based on current theme
        function updateToggleIcon(button) {
            if (!button) return;

            const theme = getStoredTheme();
            const sunIcon = button.querySelector('.theme-toggle__icon--sun');
            const moonIcon = button.querySelector('.theme-toggle__icon--moon');

            if (theme === 'dark') {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        }

        // Update all toggle buttons
        function updateAllToggleIcons() {
            updateToggleIcon(themeToggle);
            updateToggleIcon(themeToggleMobile);
        }

        // Toggle theme
        function toggleTheme() {
            const currentTheme = getStoredTheme();
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            updateAllToggleIcons();
        }

        // Initialize toggle buttons
        updateAllToggleIcons();

        // Add click event listeners
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);

            // Add keyboard support
            themeToggle.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        }

        if (themeToggleMobile) {
            themeToggleMobile.addEventListener('click', toggleTheme);

            // Add keyboard support
            themeToggleMobile.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        }
    });
})();
