(function() {
    // Check for saved theme preference, otherwise use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine the initial theme
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply theme immediately by adding/removing classes on <html>
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }
    };
    
    applyTheme(theme);

    // Function to toggle theme manually
    window.toggleTheme = function() {
        // Correct check – if the document currently has 'dark-mode' class, switch to light
        const currentIsDark = document.documentElement.classList.contains('dark-mode');
        const newTheme = currentIsDark ? 'light' : 'dark';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleButton();
    };

    // Update the toggle button icon and label
    function updateToggleButton() {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;
        
        const isDark = document.documentElement.classList.contains('dark-mode');
        btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        
        // Sun icon (D-path) for Light Mode toggle (when currently in dark)
        // Moon icon (D-path) for Dark Mode toggle (when currently in light)
        const sunPath = "M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm0-13a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1zm0 18a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1zM5.64 6.36a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41L6.34 4.24a1 1 0 1 0-1.41 1.41zM18.36 17.64a1 1 0 0 0-1.41 0 1 1 0 0 0 0 1.41l.71.71a1 1 0 0 0 1.41-1.41zm-1.41-11.28a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l.71-.71a1 1 0 0 0-1.41-1.41zm-11.31 11.3a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l.71-.71a1 1 0 1 0-1.41-1.41zM23 11h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zM4 12a1 1 0 0 0-1-1H2a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1z";
        const moonPath = "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z";
        
        const svgPath = btn.querySelector('path');
        if (svgPath) {
            svgPath.setAttribute('d', isDark ? sunPath : moonPath);
        }
    }

    // Initialize button state once the DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateToggleButton);
    } else {
        updateToggleButton();
    }
})();
