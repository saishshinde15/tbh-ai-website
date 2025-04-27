// Complete navigation replacement script
document.addEventListener('DOMContentLoaded', function() {
    // Get the original navigation
    const originalNav = document.querySelector('.nav-menu');
    if (!originalNav) return;
    
    // Get all the navigation items
    const navItems = Array.from(originalNav.querySelectorAll('li a')).map(link => {
        return {
            text: link.textContent.trim(),
            href: link.getAttribute('href'),
            isActive: link.classList.contains('active'),
            isCta: link.classList.contains('nav-cta')
        };
    });
    
    // Hide the original navigation
    originalNav.style.display = 'none';
    
    // Create a new navigation container
    const newNav = document.createElement('div');
    newNav.className = 'new-nav-menu';
    newNav.style.display = 'flex';
    newNav.style.alignItems = 'center';
    newNav.style.gap = '30px';
    
    // Add the navigation items to the new container
    navItems.forEach(item => {
        const navItem = document.createElement('a');
        navItem.textContent = item.text;
        navItem.href = item.href;
        
        // Style the navigation item
        navItem.style.color = item.isActive ? '#0052CC' : '#333';
        navItem.style.fontWeight = '500';
        navItem.style.textDecoration = 'none';
        navItem.style.padding = '8px 0';
        navItem.style.cursor = 'pointer';
        
        // Add CTA styling if needed
        if (item.isCta) {
            navItem.style.backgroundColor = '#0052CC';
            navItem.style.color = '#fff';
            navItem.style.padding = '8px 16px';
            navItem.style.borderRadius = '4px';
        }
        
        // Add hover effect
        navItem.onmouseover = function() {
            if (!item.isCta) {
                this.style.color = '#0052CC';
            } else {
                this.style.backgroundColor = '#003D99';
            }
        };
        
        navItem.onmouseout = function() {
            if (!item.isCta) {
                this.style.color = item.isActive ? '#0052CC' : '#333';
            } else {
                this.style.backgroundColor = '#0052CC';
            }
        };
        
        // Add click handler
        navItem.onclick = function(e) {
            e.preventDefault();
            window.location.href = item.href;
        };
        
        newNav.appendChild(navItem);
    });
    
    // Insert the new navigation after the original
    originalNav.parentNode.insertBefore(newNav, originalNav.nextSibling);
});
