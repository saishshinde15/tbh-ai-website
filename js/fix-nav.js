// Fix for navigation links not being clickable - Aggressive approach
document.addEventListener('DOMContentLoaded', function() {
    // Create overlay links that will be positioned over the existing navigation
    function createNavigationOverlay() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) return;

        const navItems = navMenu.querySelectorAll('li a');
        const navRect = navMenu.getBoundingClientRect();

        // Create an overlay container
        const overlayContainer = document.createElement('div');
        overlayContainer.style.position = 'absolute';
        overlayContainer.style.top = navRect.top + 'px';
        overlayContainer.style.left = navRect.left + 'px';
        overlayContainer.style.width = navRect.width + 'px';
        overlayContainer.style.height = navRect.height + 'px';
        overlayContainer.style.zIndex = '9999';
        overlayContainer.style.pointerEvents = 'none';

        // Add overlay links for each navigation item
        navItems.forEach(link => {
            const linkRect = link.getBoundingClientRect();
            const overlayLink = document.createElement('a');

            // Position the overlay link
            overlayLink.style.position = 'absolute';
            overlayLink.style.top = (linkRect.top - navRect.top) + 'px';
            overlayLink.style.left = (linkRect.left - navRect.left) + 'px';
            overlayLink.style.width = linkRect.width + 'px';
            overlayLink.style.height = linkRect.height + 'px';
            overlayLink.style.zIndex = '10000';
            overlayLink.style.pointerEvents = 'auto';
            overlayLink.style.cursor = 'pointer';

            // Set the destination URL
            const href = link.getAttribute('href');
            overlayLink.setAttribute('data-href', href);

            // Add click event
            overlayLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = this.getAttribute('data-href');
            });

            overlayContainer.appendChild(overlayLink);
        });

        document.body.appendChild(overlayContainer);
    }

    // Apply direct style changes to navigation elements
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .nav-menu, .nav-menu li, .nav-menu a {
            position: relative !important;
            z-index: 9000 !important;
            pointer-events: auto !important;
        }

        .navbar {
            position: relative !important;
            z-index: 9000 !important;
        }

        .nav-menu a {
            display: inline-block !important;
            padding: 10px !important;
        }
    `;
    document.head.appendChild(styleElement);

    // Add direct click handlers to navigation links
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.style.pointerEvents = 'auto';

        // Add multiple event listeners to ensure clicks are captured
        ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend'].forEach(eventType => {
            link.addEventListener(eventType, function(e) {
                const href = this.getAttribute('href');
                if (!href.startsWith('#')) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = href;
                }
            }, true); // Use capturing phase
        });
    });

    // Create the overlay after a short delay to ensure DOM is fully loaded
    setTimeout(createNavigationOverlay, 500);

    // Add a global click handler as a fallback
    document.addEventListener('click', function(e) {
        // Check if the click is in the navigation area
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) return;

        const navRect = navMenu.getBoundingClientRect();
        if (
            e.clientX >= navRect.left &&
            e.clientX <= navRect.right &&
            e.clientY >= navRect.top &&
            e.clientY <= navRect.bottom
        ) {
            // Find the closest navigation item
            const navItems = navMenu.querySelectorAll('li a');
            let closestLink = null;
            let closestDistance = Infinity;

            navItems.forEach(link => {
                const linkRect = link.getBoundingClientRect();
                const centerX = linkRect.left + linkRect.width / 2;
                const centerY = linkRect.top + linkRect.height / 2;

                const distance = Math.sqrt(
                    Math.pow(e.clientX - centerX, 2) +
                    Math.pow(e.clientY - centerY, 2)
                );

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestLink = link;
                }
            });

            if (closestLink && closestDistance < 50) {
                const href = closestLink.getAttribute('href');
                if (!href.startsWith('#')) {
                    window.location.href = href;
                }
            }
        }
    });
});
