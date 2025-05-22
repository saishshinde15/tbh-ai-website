// Network Animation Script for tbh.ai
document.addEventListener('DOMContentLoaded', function() {
    // Create network animation
    const networkAnimation = document.createElement('div');
    networkAnimation.className = 'network-animation';
    document.body.appendChild(networkAnimation);

    // Create nodes
    const nodeCount = 40; // Increased node count for better visual effect
    const nodes = [];
    const lines = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimeout;

    // Track mouse position for interactive effects
    document.addEventListener('mousemove', function(e) {
        // Get mouse position relative to document
        const docRect = document.documentElement.getBoundingClientRect();
        mouseX = ((e.clientX - docRect.left) / docRect.width) * 100;
        mouseY = ((e.clientY - docRect.top) / docRect.height) * 100;

        // Set flag for mouse movement
        isMouseMoving = true;

        // Clear previous timeout
        clearTimeout(mouseTimeout);

        // Set timeout to reset mouse movement flag
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });

    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'network-node';

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        node.style.left = `${x}%`;
        node.style.top = `${y}%`;

        // Random size (1-3px)
        const size = 1 + Math.random() * 2;
        node.style.width = `${size}px`;
        node.style.height = `${size}px`;

        // Random opacity
        node.style.opacity = 0.3 + Math.random() * 0.7;

        // Add animation
        node.style.animation = `pulse-glow ${3 + Math.random() * 5}s ease-in-out infinite alternate`;

        networkAnimation.appendChild(node);
        nodes.push({
            element: node,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            size: size
        });
    }

    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Connect to 2-3 closest nodes
        const connections = 2 + Math.floor(Math.random() * 2);

        // Find closest nodes
        const distances = [];

        for (let j = 0; j < nodes.length; j++) {
            if (i !== j) {
                const nodeB = nodes[j];
                const distance = Math.sqrt(
                    Math.pow(nodeA.x - nodeB.x, 2) +
                    Math.pow(nodeA.y - nodeB.y, 2)
                );

                distances.push({
                    index: j,
                    distance: distance
                });
            }
        }

        // Sort by distance
        distances.sort((a, b) => a.distance - b.distance);

        // Create connections to closest nodes
        for (let k = 0; k < connections && k < distances.length; k++) {
            const nodeB = nodes[distances[k].index];

            const line = document.createElement('div');
            line.className = 'network-line';

            // Position line at nodeA
            line.style.left = `${nodeA.x}%`;
            line.style.top = `${nodeA.y}%`;

            // Calculate length and angle
            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;

            // Set line properties
            line.style.width = `${length}%`;
            line.style.transform = `rotate(${angle}deg)`;

            // Random opacity
            line.style.opacity = 0.1 + Math.random() * 0.2;

            networkAnimation.appendChild(line);

            // Store line reference and connected nodes
            lines.push({
                element: line,
                nodeA: i,
                nodeB: distances[k].index
            });
        }
    }

    // Animation loop for interactive movement
    function animate() {
        // Update nodes based on mouse position
        nodes.forEach((node, index) => {
            if (isMouseMoving) {
                // Calculate distance from mouse
                const dx = node.x - mouseX;
                const dy = node.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Apply force based on mouse position (repel within 20% distance)
                if (distance < 20) {
                    // Stronger effect for closer nodes
                    const force = (1 - distance / 20) * 0.5;

                    // Calculate direction
                    const dirX = dx / distance || 0;
                    const dirY = dy / distance || 0;

                    // Apply acceleration
                    node.vx += dirX * force;
                    node.vy += dirY * force;

                    // Highlight nodes near cursor
                    node.element.style.boxShadow = `0 0 ${10 + (20 - distance)}px rgba(30, 99, 255, ${0.5 + (1 - distance / 20) * 0.5})`;
                    node.element.style.zIndex = "10";
                } else {
                    // Reset shadow for distant nodes
                    node.element.style.boxShadow = `0 0 10px rgba(30, 99, 255, 0.5)`;
                    node.element.style.zIndex = "1";
                }
            }

            // Apply velocity with damping
            node.x += node.vx;
            node.y += node.vy;
            node.vx *= 0.95;
            node.vy *= 0.95;

            // Add small random movement
            if (Math.random() < 0.05) {
                node.vx += (Math.random() - 0.5) * 0.2;
                node.vy += (Math.random() - 0.5) * 0.2;
            }

            // Keep within bounds
            if (node.x < 0) { node.x = 0; node.vx *= -0.5; }
            if (node.x > 100) { node.x = 100; node.vx *= -0.5; }
            if (node.y < 0) { node.y = 0; node.vy *= -0.5; }
            if (node.y > 100) { node.y = 100; node.vy *= -0.5; }

            // Apply new position
            node.element.style.left = `${node.x}%`;
            node.element.style.top = `${node.y}%`;
        });

        // Update lines
        lines.forEach(line => {
            const nodeA = nodes[line.nodeA];
            const nodeB = nodes[line.nodeB];

            // Position line at nodeA
            line.element.style.left = `${nodeA.x}%`;
            line.element.style.top = `${nodeA.y}%`;

            // Calculate length and angle
            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;

            // Set line properties
            line.element.style.width = `${length}%`;
            line.element.style.transform = `rotate(${angle}deg)`;

            // Adjust opacity based on length
            const baseOpacity = 0.1 + Math.random() * 0.1;
            line.element.style.opacity = Math.max(0.05, baseOpacity * (1 - length / 100));
        });

        // Continue animation loop
        requestAnimationFrame(animate);
    }

    // Start animation loop
    animate();
});
