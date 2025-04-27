// Direct navigation replacement
document.addEventListener('DOMContentLoaded', function() {
    // Create a completely new navigation bar
    const createDirectNav = function() {
        // Define the navigation items
        const navItems = [
            { text: 'Home', href: 'index.html', active: window.location.pathname.endsWith('index.html') || window.location.pathname === '/' },
            { text: 'About', href: 'about.html', active: window.location.pathname.endsWith('about.html') },
            { text: 'Products', href: 'products.html', active: window.location.pathname.endsWith('products.html') },
            { text: 'Models', href: 'models.html', active: window.location.pathname.endsWith('models.html') },
            { text: 'Secure Agents', href: 'secure-agents.html', active: window.location.pathname.endsWith('secure-agents.html') },
            { text: 'Careers', href: 'careers.html', active: window.location.pathname.endsWith('careers.html') },
            { text: 'Contact Us', href: 'contact.html', active: window.location.pathname.endsWith('contact.html'), isCta: true }
        ];

        // Create the direct navigation container
        const directNav = document.createElement('div');
        directNav.id = 'direct-nav';
        directNav.style.position = 'fixed';
        directNav.style.top = '0';
        directNav.style.left = '0';
        directNav.style.width = '100%';
        directNav.style.backgroundColor = '#fff';
        directNav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        directNav.style.zIndex = '10000';
        directNav.style.padding = '15px 0';
        directNav.style.display = 'flex';
        directNav.style.justifyContent = 'space-between';
        directNav.style.alignItems = 'center';

        // Create the logo
        const logoContainer = document.createElement('div');
        logoContainer.style.marginLeft = '20px';
        logoContainer.style.display = 'flex';
        logoContainer.style.alignItems = 'center';
        
        const logoLink = document.createElement('a');
        logoLink.href = 'index.html';
        logoLink.style.display = 'flex';
        logoLink.style.alignItems = 'center';
        logoLink.style.textDecoration = 'none';
        
        const logoImg = document.createElement('img');
        logoImg.src = 'public/images/logo.svg';
        logoImg.alt = 'tbh.ai Logo';
        logoImg.style.height = '30px';
        logoImg.style.marginRight = '10px';
        
        const logoText = document.createElement('span');
        logoText.textContent = 'tbh.ai';
        logoText.style.fontSize = '1.5rem';
        logoText.style.fontWeight = '700';
        logoText.style.color = '#333';
        
        logoLink.appendChild(logoImg);
        logoLink.appendChild(logoText);
        logoContainer.appendChild(logoLink);
        
        // Create the navigation links
        const navContainer = document.createElement('div');
        navContainer.style.display = 'flex';
        navContainer.style.alignItems = 'center';
        navContainer.style.marginRight = '20px';
        
        navItems.forEach(item => {
            const navLink = document.createElement('a');
            navLink.textContent = item.text;
            navLink.href = item.href;
            navLink.style.margin = '0 15px';
            navLink.style.textDecoration = 'none';
            navLink.style.fontWeight = '500';
            navLink.style.fontSize = '1rem';
            
            if (item.isCta) {
                navLink.style.backgroundColor = '#0052CC';
                navLink.style.color = '#fff';
                navLink.style.padding = '8px 16px';
                navLink.style.borderRadius = '4px';
            } else {
                navLink.style.color = item.active ? '#0052CC' : '#333';
            }
            
            // Add hover effects
            navLink.addEventListener('mouseover', function() {
                if (!item.isCta) {
                    this.style.color = '#0052CC';
                } else {
                    this.style.backgroundColor = '#003D99';
                }
            });
            
            navLink.addEventListener('mouseout', function() {
                if (!item.isCta) {
                    this.style.color = item.active ? '#0052CC' : '#333';
                } else {
                    this.style.backgroundColor = '#0052CC';
                }
            });
            
            navContainer.appendChild(navLink);
        });
        
        // Add the logo and navigation to the direct nav
        directNav.appendChild(logoContainer);
        directNav.appendChild(navContainer);
        
        // Add the direct nav to the body
        document.body.insertBefore(directNav, document.body.firstChild);
        
        // Add padding to the body to account for the fixed nav
        document.body.style.paddingTop = (directNav.offsetHeight + 20) + 'px';
        
        // Hide the original header
        const originalHeader = document.querySelector('header');
        if (originalHeader) {
            originalHeader.style.display = 'none';
        }
    };
    
    // Call the function to create the direct nav
    createDirectNav();
});
