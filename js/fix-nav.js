// Fix for navigation links not being clickable
document.addEventListener('DOMContentLoaded', function() {
    // Add pointer-events: auto to all navigation links
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.style.pointerEvents = 'auto';
    });
    
    // Add click event listeners to all navigation links
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the href attribute
            const href = this.getAttribute('href');
            
            // If it's not an anchor link, navigate to the page
            if (!href.startsWith('#')) {
                window.location.href = href;
            }
        });
    });
});
