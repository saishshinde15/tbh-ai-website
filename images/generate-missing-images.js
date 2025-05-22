// Script to generate professional-looking images for the website
// This script creates SVG files for all pages with unique designs

const fs = require('fs');

// Function to create a professional SVG with enhanced visuals
function createSVG(filename, title, subtitle, bgColor1, bgColor2, designType) {
    const width = 800;
    const height = 400;

    // Create base SVG structure with gradient background
    let svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${bgColor1};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${bgColor2};stop-opacity:1" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:rgba(30, 99, 255, 0.3);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgba(30, 99, 255, 0);stop-opacity:0" />
        </radialGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="4" flood-color="rgba(0, 0, 0, 0.5)" />
        </filter>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#grad)" />

    <!-- Subtle grid pattern -->
    ${generateGridPattern(width, height)}

    <!-- Center glow effect -->
    <circle cx="${width/2}" cy="${height/2}" r="200" fill="url(#centerGlow)" />
`;

    // Add design elements based on the type
    switch(designType) {
        case 'home':
            svg += generateNetworkNodes(width, height, 25, true);
            svg += generateShieldIcon(width/2, height/2, 80);
            break;
        case 'about':
            svg += generateAbstractShapes(width, height);
            svg += generateCompanyIcon(width/2, height/2, 80);
            break;
        case 'secureagents':
            svg += generateHexagonPattern(width, height);
            svg += generateShieldIcon(width/2, height/2, 80);
            break;
        case 'products':
            svg += generateTechPattern(width, height);
            svg += generateProductIcon(width/2, height/2, 80);
            break;
        case 'models':
            svg += generateNeuralNetworkPattern(width, height);
            svg += generateBrainIcon(width/2, height/2, 80);
            break;
        case 'contact':
            svg += generateContactPattern(width, height);
            svg += generateContactIcon(width/2, height/2, 80);
            break;
        case 'blog-secure-agents':
            svg += generateNetworkNodes(width, height, 20, true);
            svg += generateShieldIcon(width/2, height/2, 80);
            break;
        case 'blog-ai-security':
            svg += generateCircuitPattern(width, height);
            svg += generateLockIcon(width/2, height/2, 80);
            break;
        case 'blog-ai-ethics':
            svg += generateEthicsPattern(width, height);
            svg += generateBalanceIcon(width/2, height/2, 80);
            break;
        case 'blog-future-ai':
            svg += generateFuturisticPattern(width, height);
            svg += generateFutureIcon(width/2, height/2, 80);
            break;
        default:
            svg += generateNetworkNodes(width, height, 15, false);
            svg += generateShieldIcon(width/2, height/2, 80);
    }

    // Add title and subtitle with enhanced styling
    svg += `
    <!-- Title with shadow effect -->
    <g filter="url(#shadow)">
        <text x="${width/2}" y="${height-80}" font-family="Arial, sans-serif" font-size="42" font-weight="bold"
              fill="white" text-anchor="middle">${title}</text>
    </g>

    <!-- Decorative underline -->
    <line x1="${width/2 - 150}" y1="${height-70}" x2="${width/2 + 150}" y2="${height-70}"
          stroke="#3b82f6" stroke-width="3" />

    <!-- Subtitle -->
    <text x="${width/2}" y="${height-40}" font-family="Arial, sans-serif" font-size="22"
          fill="rgba(255, 255, 255, 0.9)" text-anchor="middle">${subtitle}</text>
</svg>`;

    fs.writeFileSync(filename, svg);
    console.log(`Created ${filename}`);
}

// Function to generate subtle grid pattern
function generateGridPattern(width, height) {
    let result = `<g stroke="rgba(255, 255, 255, 0.03)" stroke-width="1">`;

    // Horizontal lines
    for (let y = 40; y < height; y += 40) {
        result += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" />`;
    }

    // Vertical lines
    for (let x = 40; x < width; x += 40) {
        result += `<line x1="${x}" y1="0" x2="${x}" y2="${height}" />`;
    }

    result += `</g>`;
    return result;
}

// Function to generate enhanced network nodes and connections
function generateNetworkNodes(width, height, nodeCount = 15, enhanced = false) {
    const nodes = [];
    let result = '';

    // Create primary nodes (larger, more prominent)
    const primaryNodeCount = Math.floor(nodeCount * 0.4);
    for (let i = 0; i < primaryNodeCount; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 6 + Math.random() * 8,
            color: `rgba(59, 130, 246, ${0.7 + Math.random() * 0.3})`,
            isPrimary: true
        });
    }

    // Create secondary nodes (smaller, less prominent)
    for (let i = 0; i < nodeCount - primaryNodeCount; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 2 + Math.random() * 4,
            color: `rgba(96, 165, 250, ${0.4 + Math.random() * 0.3})`,
            isPrimary: false
        });
    }

    // Draw connections between primary nodes
    result += `<g stroke="rgba(59, 130, 246, 0.4)" stroke-width="1.5">`;
    const primaryNodes = nodes.filter(node => node.isPrimary);
    for (let i = 0; i < primaryNodes.length; i++) {
        for (let j = i + 1; j < primaryNodes.length; j++) {
            const distance = Math.sqrt(
                Math.pow(primaryNodes[i].x - primaryNodes[j].x, 2) +
                Math.pow(primaryNodes[i].y - primaryNodes[j].y, 2)
            );

            if (distance < 250) {
                result += `<line x1="${primaryNodes[i].x}" y1="${primaryNodes[i].y}"
                          x2="${primaryNodes[j].x}" y2="${primaryNodes[j].y}" />`;
            }
        }
    }
    result += `</g>`;

    // Draw connections between primary and secondary nodes
    result += `<g stroke="rgba(96, 165, 250, 0.2)" stroke-width="1">`;
    const secondaryNodes = nodes.filter(node => !node.isPrimary);
    for (const primaryNode of primaryNodes) {
        for (const secondaryNode of secondaryNodes) {
            const distance = Math.sqrt(
                Math.pow(primaryNode.x - secondaryNode.x, 2) +
                Math.pow(primaryNode.y - secondaryNode.y, 2)
            );

            if (distance < 120) {
                result += `<line x1="${primaryNode.x}" y1="${primaryNode.y}"
                          x2="${secondaryNode.x}" y2="${secondaryNode.y}" />`;
            }
        }
    }
    result += `</g>`;

    // Draw nodes with enhanced styling
    for (const node of nodes) {
        if (enhanced && node.isPrimary) {
            // Draw glow effect for primary nodes
            result += `<circle cx="${node.x}" cy="${node.y}" r="${node.radius * 2}"
                      fill="rgba(59, 130, 246, 0.2)" />`;
        }

        // Draw the node itself
        result += `<circle cx="${node.x}" cy="${node.y}" r="${node.radius}" fill="${node.color}" />`;

        if (enhanced && node.isPrimary) {
            // Add subtle white border to primary nodes
            result += `<circle cx="${node.x}" cy="${node.y}" r="${node.radius}"
                      stroke="rgba(255, 255, 255, 0.5)" stroke-width="1" fill="none" />`;
        }
    }

    return result;
}

// Function to generate abstract shapes for About page
function generateAbstractShapes(width, height) {
    const shapes = [];
    let result = '';

    // Create random shapes
    for (let i = 0; i < 25; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 20 + Math.random() * 60;

        // Store shape position for connecting lines later
        shapes.push({ x, y, size });

        // Use a variety of blue shades
        const blueShades = [
            'rgba(37, 99, 235, ', // Blue-600
            'rgba(59, 130, 246, ', // Blue-500
            'rgba(96, 165, 250, ', // Blue-400
            'rgba(147, 197, 253, ' // Blue-300
        ];
        const color = blueShades[Math.floor(Math.random() * blueShades.length)];
        const opacity = 0.1 + Math.random() * 0.4;

        // Randomly choose shape type
        const shapeType = Math.floor(Math.random() * 5);

        if (shapeType === 0) {
            // Circle
            result += `<circle cx="${x}" cy="${y}" r="${size/2}" fill="${color}${opacity})" />`;

            // Add subtle border to some circles
            if (Math.random() > 0.7) {
                result += `<circle cx="${x}" cy="${y}" r="${size/2}"
                          stroke="rgba(255, 255, 255, 0.3)" stroke-width="1" fill="none" />`;
            }
        } else if (shapeType === 1) {
            // Square with rounded corners
            const radius = size / 10;
            result += `<rect x="${x - size/2}" y="${y - size/2}" width="${size}" height="${size}"
                      rx="${radius}" ry="${radius}" fill="${color}${opacity})" />`;

            // Add subtle border
            if (Math.random() > 0.7) {
                result += `<rect x="${x - size/2}" y="${y - size/2}" width="${size}" height="${size}"
                          rx="${radius}" ry="${radius}" stroke="rgba(255, 255, 255, 0.2)"
                          stroke-width="1" fill="none" />`;
            }
        } else if (shapeType === 2) {
            // Triangle
            result += `<polygon points="${x},${y - size/2} ${x + size/2},${y + size/2} ${x - size/2},${y + size/2}"
                      fill="${color}${opacity})" />`;

            // Add subtle border
            result += `<polygon points="${x},${y - size/2} ${x + size/2},${y + size/2} ${x - size/2},${y + size/2}"
                      stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none" />`;
        } else if (shapeType === 3) {
            // Hexagon
            result += `<polygon points="`;
            for (let j = 0; j < 6; j++) {
                const angle = (Math.PI / 3) * j;
                const hx = x + (size / 2) * Math.cos(angle);
                const hy = y + (size / 2) * Math.sin(angle);
                result += `${hx},${hy} `;
            }
            result += `" fill="${color}${opacity})" />`;

            // Add subtle border
            result += `<polygon points="`;
            for (let j = 0; j < 6; j++) {
                const angle = (Math.PI / 3) * j;
                const hx = x + (size / 2) * Math.cos(angle);
                const hy = y + (size / 2) * Math.sin(angle);
                result += `${hx},${hy} `;
            }
            result += `" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1" fill="none" />`;
        } else if (shapeType === 4) {
            // Diamond
            result += `<polygon points="${x},${y - size/2} ${x + size/2},${y} ${x},${y + size/2} ${x - size/2},${y}"
                      fill="${color}${opacity})" />`;

            // Add subtle border
            result += `<polygon points="${x},${y - size/2} ${x + size/2},${y} ${x},${y + size/2} ${x - size/2},${y}"
                      stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none" />`;
        }
    }

    // Connect shapes that are close to each other
    result += `<g stroke="rgba(59, 130, 246, 0.2)" stroke-width="1.5">`;
    for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
            const shape1 = shapes[i];
            const shape2 = shapes[j];

            const distance = Math.sqrt(
                Math.pow(shape1.x - shape2.x, 2) +
                Math.pow(shape1.y - shape2.y, 2)
            );

            // Only connect shapes that are reasonably close
            if (distance < 200) {
                if (Math.random() > 0.7) {
                    // Add curved lines for some connections
                    const controlX = (shape1.x + shape2.x) / 2 + (Math.random() - 0.5) * 50;
                    const controlY = (shape1.y + shape2.y) / 2 + (Math.random() - 0.5) * 50;
                    result += `<path d="M${shape1.x},${shape1.y} Q${controlX},${controlY} ${shape2.x},${shape2.y}" />`;
                } else {
                    result += `<line x1="${shape1.x}" y1="${shape1.y}" x2="${shape2.x}" y2="${shape2.y}" />`;
                }
            }
        }
    }
    result += `</g>`;

    return result;
}

// Function to generate hexagon pattern for SecureAgents page
function generateHexagonPattern(width, height) {
    let result = '';
    const hexSize = 40;
    const hexHeight = hexSize * Math.sqrt(3);
    const rows = Math.ceil(height / hexHeight) + 1;
    const cols = Math.ceil(width / (hexSize * 1.5)) + 1;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * hexSize * 1.5;
            const y = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2);

            // Only draw some hexagons for a sparse effect
            if (Math.random() > 0.4) {
                // Determine if this is a "feature" hexagon (more prominent)
                const isFeature = Math.random() > 0.8;

                result += `<polygon points="`;
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    const hx = x + hexSize * Math.cos(angle);
                    const hy = y + hexSize * Math.sin(angle);
                    result += `${hx},${hy} `;
                }

                if (isFeature) {
                    // Feature hexagons have gradient fill and glow
                    result += `" fill="rgba(59, 130, 246, 0.4)" />`;
                    result += `<polygon points="`;
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI / 3) * i;
                        const hx = x + hexSize * Math.cos(angle);
                        const hy = y + hexSize * Math.sin(angle);
                        result += `${hx},${hy} `;
                    }
                    result += `" stroke="rgba(255, 255, 255, 0.5)" stroke-width="1.5" fill="none" />`;
                } else {
                    // Regular hexagons have simpler styling
                    if (Math.random() > 0.7) {
                        // Some hexagons get a subtle fill
                        result += `" fill="rgba(59, 130, 246, 0.1)" />`;
                    } else {
                        result += `" fill="none" />`;
                    }

                    // All hexagons get a border
                    result += `<polygon points="`;
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI / 3) * i;
                        const hx = x + hexSize * Math.cos(angle);
                        const hy = y + hexSize * Math.sin(angle);
                        result += `${hx},${hy} `;
                    }
                    result += `" stroke="rgba(59, 130, 246, 0.3)" stroke-width="1" fill="none" />`;
                }
            }
        }
    }

    return result;
}

// Function to generate tech pattern for Products page
function generateTechPattern(width, height) {
    let result = '';

    // Draw circuit-like lines
    result += `<g stroke="rgba(30, 99, 255, 0.3)" stroke-width="2">`;

    // Horizontal lines with branches
    for (let y = 50; y < height; y += 100) {
        result += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" />`;

        // Add vertical branches
        for (let x = 50; x < width; x += 150) {
            if (Math.random() > 0.5) {
                const branchHeight = 30 + Math.random() * 50;
                const direction = Math.random() > 0.5 ? 1 : -1;

                result += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + branchHeight * direction}" />`;

                // Add connection dots
                result += `<circle cx="${x}" cy="${y}" r="4" fill="rgba(30, 99, 255, 0.7)" />`;

                // Add glow to some dots
                if (Math.random() > 0.7) {
                    result += `<circle cx="${x}" cy="${y}" r="8" fill="rgba(30, 99, 255, 0.3)" />`;
                }
            }
        }
    }

    // Add some diagonal lines
    for (let i = 0; i < 10; i++) {
        const x1 = Math.random() * width;
        const y1 = Math.random() * height;
        const x2 = x1 + (Math.random() - 0.5) * 300;
        const y2 = y1 + (Math.random() - 0.5) * 300;

        result += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`;
    }

    result += `</g>`;
    return result;
}

// Function to generate neural network pattern for Models page
function generateNeuralNetworkPattern(width, height) {
    let result = '';
    const layers = 4;
    const nodesPerLayer = [5, 8, 8, 4];
    const nodes = [];

    // Create nodes for each layer
    for (let layer = 0; layer < layers; layer++) {
        const layerNodes = [];
        const layerX = width * (layer + 1) / (layers + 1);

        for (let i = 0; i < nodesPerLayer[layer]; i++) {
            const nodeY = height * (i + 1) / (nodesPerLayer[layer] + 1);
            layerNodes.push({
                x: layerX,
                y: nodeY,
                layer: layer
            });
            nodes.push({
                x: layerX,
                y: nodeY,
                layer: layer
            });
        }
    }

    // Draw connections between layers
    result += `<g stroke="rgba(30, 99, 255, 0.2)" stroke-width="1">`;
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Connect to next layer
        if (node.layer < layers - 1) {
            for (const nextNode of nodes.filter(n => n.layer === node.layer + 1)) {
                result += `<line x1="${node.x}" y1="${node.y}" x2="${nextNode.x}" y2="${nextNode.y}" />`;
            }
        }
    }
    result += `</g>`;

    // Draw nodes
    for (const node of nodes) {
        // Determine node color based on layer
        let color;
        if (node.layer === 0) {
            color = "rgba(59, 130, 246, 0.8)"; // Input layer
        } else if (node.layer === layers - 1) {
            color = "rgba(16, 185, 129, 0.8)"; // Output layer
        } else {
            color = "rgba(99, 102, 241, 0.8)"; // Hidden layers
        }

        // Draw node glow
        result += `<circle cx="${node.x}" cy="${node.y}" r="12" fill="rgba(30, 99, 255, 0.2)" />`;

        // Draw node
        result += `<circle cx="${node.x}" cy="${node.y}" r="6" fill="${color}" />`;

        // Draw node border
        result += `<circle cx="${node.x}" cy="${node.y}" r="6" stroke="rgba(255, 255, 255, 0.5)" stroke-width="1" fill="none" />`;
    }

    return result;
}

// Function to generate contact pattern
function generateContactPattern(width, height) {
    let result = '';

    // Create a grid of dots
    const gridSize = 50;
    const dotRadius = 3;

    result += `<g>`;
    for (let x = gridSize; x < width; x += gridSize) {
        for (let y = gridSize; y < height; y += gridSize) {
            // Add some randomness to position
            const offsetX = (Math.random() - 0.5) * 10;
            const offsetY = (Math.random() - 0.5) * 10;

            result += `<circle cx="${x + offsetX}" cy="${y + offsetY}" r="${dotRadius}"
                      fill="rgba(30, 99, 255, 0.4)" />`;
        }
    }
    result += `</g>`;

    // Add some connecting lines
    result += `<g stroke="rgba(30, 99, 255, 0.2)" stroke-width="1">`;
    for (let i = 0; i < 30; i++) {
        const x1 = Math.random() * width;
        const y1 = Math.random() * height;
        const x2 = x1 + (Math.random() - 0.5) * 200;
        const y2 = y1 + (Math.random() - 0.5) * 200;

        result += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`;
    }
    result += `</g>`;

    return result;
}

// Function to generate circuit pattern for AI Security blog
function generateCircuitPattern(width, height) {
    let result = '';

    // Draw circuit-like lines with better styling
    result += `<g stroke="rgba(59, 130, 246, 0.4)" stroke-width="2">`;

    // Create a more sophisticated grid
    const gridSize = 80;

    // Horizontal lines with branches
    for (let y = gridSize/2; y < height; y += gridSize) {
        // Add some randomness to the horizontal lines
        const startX = Math.random() * gridSize/2;
        const endX = width - Math.random() * gridSize/2;

        result += `<line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" />`;

        // Add vertical branches with better styling
        for (let x = gridSize; x < width; x += gridSize) {
            if (Math.random() > 0.4) {
                const branchHeight = 30 + Math.random() * 50;
                const direction = Math.random() > 0.5 ? 1 : -1;

                // Some branches are curved
                if (Math.random() > 0.7) {
                    const controlX = x + (Math.random() - 0.5) * 20;
                    const controlY = y + branchHeight * direction * 0.5;
                    result += `<path d="M${x},${y} Q${controlX},${controlY} ${x},${y + branchHeight * direction}" />`;
                } else {
                    result += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + branchHeight * direction}" />`;
                }

                // Add connection dots with gradient
                result += `<circle cx="${x}" cy="${y}" r="4" fill="rgba(59, 130, 246, 0.9)" />`;

                // Add subtle glow to some dots
                if (Math.random() > 0.7) {
                    result += `<circle cx="${x}" cy="${y}" r="8" fill="rgba(59, 130, 246, 0.3)" />`;
                }
            }
        }
    }

    // Vertical lines
    for (let x = gridSize/2; x < width; x += gridSize) {
        // Add some randomness to the vertical lines
        const startY = Math.random() * gridSize/2;
        const endY = height - Math.random() * gridSize/2;

        result += `<line x1="${x}" y1="${startY}" x2="${x}" y2="${endY}" />`;
    }

    result += `</g>`;
    return result;
}

// Function to generate ethics pattern for AI Ethics blog
function generateEthicsPattern(width, height) {
    let result = '';

    // Create a balanced, symmetric pattern
    result += `<g stroke="rgba(59, 130, 246, 0.2)" stroke-width="1.5">`;

    // Draw concentric circles
    const centerX = width / 2;
    const centerY = height / 2;
    for (let radius = 50; radius < Math.max(width, height); radius += 50) {
        result += `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="none" />`;
    }

    // Draw radial lines
    const numLines = 24;
    for (let i = 0; i < numLines; i++) {
        const angle = (Math.PI * 2 * i) / numLines;
        const x2 = centerX + Math.cos(angle) * Math.max(width, height);
        const y2 = centerY + Math.sin(angle) * Math.max(width, height);

        result += `<line x1="${centerX}" y1="${centerY}" x2="${x2}" y2="${y2}" />`;
    }

    // Add some floating elements
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 5 + Math.random() * 15;

        if (Math.random() > 0.5) {
            // Circle
            result += `<circle cx="${x}" cy="${y}" r="${size}"
                      fill="rgba(59, 130, 246, ${0.1 + Math.random() * 0.2})" />`;
        } else {
            // Square with rounded corners
            result += `<rect x="${x - size}" y="${y - size}" width="${size * 2}" height="${size * 2}"
                      rx="${size/4}" ry="${size/4}" fill="rgba(59, 130, 246, ${0.1 + Math.random() * 0.2})" />`;
        }
    }

    result += `</g>`;
    return result;
}

// Function to generate futuristic pattern for Future of AI blog
function generateFuturisticPattern(width, height) {
    let result = '';

    // Create a futuristic grid with perspective
    result += `<g stroke="rgba(59, 130, 246, 0.2)" stroke-width="1">`;

    // Perspective grid
    const vanishingPointX = width / 2;
    const vanishingPointY = height / 2;
    const numLines = 20;

    // Radial lines from vanishing point
    for (let i = 0; i < numLines; i++) {
        const angle = (Math.PI * 2 * i) / numLines;
        const x2 = vanishingPointX + Math.cos(angle) * Math.max(width, height);
        const y2 = vanishingPointY + Math.sin(angle) * Math.max(width, height);

        result += `<line x1="${vanishingPointX}" y1="${vanishingPointY}" x2="${x2}" y2="${y2}" />`;
    }

    // Concentric circles
    for (let radius = 50; radius < 300; radius += 50) {
        result += `<circle cx="${vanishingPointX}" cy="${vanishingPointY}" r="${radius}"
                  fill="none" stroke="rgba(59, 130, 246, ${0.3 - radius/1000})" />`;
    }

    // Add some floating tech elements
    for (let i = 0; i < 15; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 10 + Math.random() * 20;

        // Random tech shapes
        const shapeType = Math.floor(Math.random() * 3);

        if (shapeType === 0) {
            // Hexagon
            result += `<polygon points="`;
            for (let j = 0; j < 6; j++) {
                const angle = (Math.PI / 3) * j;
                const hx = x + size * Math.cos(angle);
                const hy = y + size * Math.sin(angle);
                result += `${hx},${hy} `;
            }
            result += `" fill="rgba(59, 130, 246, 0.15)" stroke="rgba(59, 130, 246, 0.4)" stroke-width="1" />`;
        } else if (shapeType === 1) {
            // Circle with inner circle
            result += `<circle cx="${x}" cy="${y}" r="${size}" fill="rgba(59, 130, 246, 0.1)" />`;
            result += `<circle cx="${x}" cy="${y}" r="${size/2}" fill="none"
                      stroke="rgba(59, 130, 246, 0.4)" stroke-width="1" />`;
        } else {
            // Diamond
            result += `<polygon points="${x},${y-size} ${x+size},${y} ${x},${y+size} ${x-size},${y}"
                      fill="rgba(59, 130, 246, 0.15)" stroke="rgba(59, 130, 246, 0.4)" stroke-width="1" />`;
        }
    }

    result += `</g>`;
    return result;
}

// Function to generate shield icon
function generateShieldIcon(x, y, size) {
    return `
    <!-- Shield icon with glow effect -->
    <g transform="translate(${x}, ${y})">
        <!-- Glow effect -->
        <path d="M0,-${size} L${size*0.7},-${size*0.7} L${size*0.7},${size*0.5} L0,${size} L-${size*0.7},${size*0.5} L-${size*0.7},-${size*0.7} Z"
              fill="rgba(30, 99, 255, 0.2)" />

        <!-- Shield body -->
        <path d="M0,-${size*0.9} L${size*0.6},-${size*0.6} L${size*0.6},${size*0.4} L0,${size*0.9} L-${size*0.6},${size*0.4} L-${size*0.6},-${size*0.6} Z"
              fill="rgba(30, 99, 255, 0.7)" stroke="rgba(255, 255, 255, 0.7)" stroke-width="3" />

        <!-- Checkmark -->
        <path d="M-${size*0.3},0 L-${size*0.1},${size*0.3} L${size*0.3},-${size*0.3}"
              stroke="white" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    `;
}

// Function to generate company icon
function generateCompanyIcon(x, y, size) {
    return `
    <!-- Company icon with buildings -->
    <g transform="translate(${x}, ${y})">
        <!-- Glow effect -->
        <circle cx="0" cy="0" r="${size*1.2}" fill="rgba(30, 99, 255, 0.2)" />

        <!-- Main building -->
        <rect x="-${size*0.5}" y="-${size*0.7}" width="${size*0.4}" height="${size*1.4}"
              fill="rgba(30, 99, 255, 0.8)" stroke="rgba(255, 255, 255, 0.7)" stroke-width="2" rx="2" ry="2" />

        <!-- Secondary building -->
        <rect x="-${size*0.05}" y="-${size*0.5}" width="${size*0.4}" height="${size*1.2}"
              fill="rgba(59, 130, 246, 0.7)" stroke="rgba(255, 255, 255, 0.7)" stroke-width="2" rx="2" ry="2" />

        <!-- Third building -->
        <rect x="${size*0.4}" y="-${size*0.3}" width="${size*0.3}" height="${size*1.0}"
              fill="rgba(96, 165, 250, 0.7)" stroke="rgba(255, 255, 255, 0.7)" stroke-width="2" rx="2" ry="2" />

        <!-- Windows -->
        <g fill="rgba(255, 255, 255, 0.9)">
            <rect x="-${size*0.4}" y="-${size*0.6}" width="${size*0.2}" height="${size*0.1}" rx="1" ry="1" />
            <rect x="-${size*0.4}" y="-${size*0.4}" width="${size*0.2}" height="${size*0.1}" rx="1" ry="1" />
            <rect x="-${size*0.4}" y="-${size*0.2}" width="${size*0.2}" height="${size*0.1}" rx="1" ry="1" />
            <rect x="-${size*0.4}" y="${size*0.0}" width="${size*0.2}" height="${size*0.1}" rx="1" ry="1" />
            <rect x="-${size*0.4}" y="${size*0.2}" width="${size*0.2}" height="${size*0.1}" rx="1" ry="1" />
            <rect x="-${size*0.4}" y="${size*0.4}" width="${size*0.2}" height="${size*0.1}" rx="1" ry="1" />

            <rect x="${size*0.05}" y="-${size*0.4}" width="${size*0.2}" height="${size*0.1}" rx="1" ry="1" />
            <rect x="${size*0.05}" y="-${size*0.2}" width="${size*0.2}" height="${size*0.1}" rx="1" ry="1" />
            <rect x="${size*0.05}" y="${size*0.0}" width="${size*0.2}" height="${size*0.1}" rx="1" ry="1" />
            <rect x="${size*0.05}" y="${size*0.2}" width="${size*0.2}" height="${size*0.1}" rx="1" ry="1" />
            <rect x="${size*0.05}" y="${size*0.4}" width="${size*0.2}" height="${size*0.1}" rx="1" ry="1" />

            <rect x="${size*0.45}" y="-${size*0.2}" width="${size*0.15}" height="${size*0.1}" rx="1" ry="1" />
            <rect x="${size*0.45}" y="${size*0.0}" width="${size*0.15}" height="${size*0.1}" rx="1" ry="1" />
            <rect x="${size*0.45}" y="${size*0.2}" width="${size*0.15}" height="${size*0.1}" rx="1" ry="1" />
            <rect x="${size*0.45}" y="${size*0.4}" width="${size*0.15}" height="${size*0.1}" rx="1" ry="1" />
        </g>
    </g>
    `;
}

// Function to generate product icon
function generateProductIcon(x, y, size) {
    return `
    <!-- Product icon with gear and tools -->
    <g transform="translate(${x}, ${y})">
        <!-- Glow effect -->
        <circle cx="0" cy="0" r="${size*1.2}" fill="rgba(30, 99, 255, 0.2)" />

        <!-- Main gear -->
        <path d="M0,-${size*0.8} L${size*0.2},-${size*0.75} L${size*0.4},-${size*0.65} L${size*0.6},-${size*0.5}
                 L${size*0.75},-${size*0.3} L${size*0.8},0 L${size*0.75},${size*0.3} L${size*0.6},${size*0.5}
                 L${size*0.4},${size*0.65} L${size*0.2},${size*0.75} L0,${size*0.8} L-${size*0.2},${size*0.75}
                 L-${size*0.4},${size*0.65} L-${size*0.6},${size*0.5} L-${size*0.75},${size*0.3} L-${size*0.8},0
                 L-${size*0.75},-${size*0.3} L-${size*0.6},-${size*0.5} L-${size*0.4},-${size*0.65} L-${size*0.2},-${size*0.75} Z"
              fill="rgba(30, 99, 255, 0.7)" stroke="rgba(255, 255, 255, 0.7)" stroke-width="2" />

        <!-- Inner gear -->
        <circle cx="0" cy="0" r="${size*0.5}" fill="rgba(59, 130, 246, 0.8)"
                stroke="rgba(255, 255, 255, 0.7)" stroke-width="2" />

        <!-- Center hole -->
        <circle cx="0" cy="0" r="${size*0.2}" fill="rgba(10, 25, 41, 0.8)"
                stroke="rgba(255, 255, 255, 0.5)" stroke-width="1" />

        <!-- Gear teeth -->
        <g stroke="rgba(255, 255, 255, 0.7)" stroke-width="2" fill="rgba(30, 99, 255, 0.7)">
            <rect x="-${size*0.1}" y="-${size*0.9}" width="${size*0.2}" height="${size*0.2}" rx="2" ry="2" />
            <rect x="${size*0.6}" y="-${size*0.6}" width="${size*0.2}" height="${size*0.2}" rx="2" ry="2" transform="rotate(45 ${size*0.7} -${size*0.5})" />
            <rect x="${size*0.7}" y="-${size*0.1}" width="${size*0.2}" height="${size*0.2}" rx="2" ry="2" />
            <rect x="${size*0.6}" y="${size*0.4}" width="${size*0.2}" height="${size*0.2}" rx="2" ry="2" transform="rotate(45 ${size*0.7} ${size*0.5})" />
            <rect x="-${size*0.1}" y="${size*0.7}" width="${size*0.2}" height="${size*0.2}" rx="2" ry="2" />
            <rect x="-${size*0.8}" y="${size*0.4}" width="${size*0.2}" height="${size*0.2}" rx="2" ry="2" transform="rotate(45 -${size*0.7} ${size*0.5})" />
            <rect x="-${size*0.9}" y="-${size*0.1}" width="${size*0.2}" height="${size*0.2}" rx="2" ry="2" />
            <rect x="-${size*0.8}" y="-${size*0.6}" width="${size*0.2}" height="${size*0.2}" rx="2" ry="2" transform="rotate(45 -${size*0.7} -${size*0.5})" />
        </g>
    </g>
    `;
}

// Function to generate brain icon
function generateBrainIcon(x, y, size) {
    return `
    <!-- Brain icon for AI models -->
    <g transform="translate(${x}, ${y})">
        <!-- Glow effect -->
        <circle cx="0" cy="0" r="${size*1.2}" fill="rgba(30, 99, 255, 0.2)" />

        <!-- Brain outline -->
        <path d="M0,-${size*0.7} C${size*0.4},-${size*0.7} ${size*0.7},-${size*0.4} ${size*0.7},0
                 C${size*0.7},${size*0.4} ${size*0.4},${size*0.7} 0,${size*0.7}
                 C-${size*0.4},${size*0.7} -${size*0.7},${size*0.4} -${size*0.7},0
                 C-${size*0.7},-${size*0.4} -${size*0.4},-${size*0.7} 0,-${size*0.7} Z"
              fill="rgba(30, 99, 255, 0.7)" stroke="rgba(255, 255, 255, 0.7)" stroke-width="3" />

        <!-- Brain details - left hemisphere -->
        <path d="M-${size*0.35},-${size*0.4} C-${size*0.5},-${size*0.3} -${size*0.6},-${size*0.1} -${size*0.5},${size*0.1}
                 C-${size*0.4},${size*0.3} -${size*0.2},${size*0.4} -${size*0.1},${size*0.5}"
              fill="none" stroke="rgba(255, 255, 255, 0.8)" stroke-width="2" />

        <!-- Brain details - right hemisphere -->
        <path d="M${size*0.35},-${size*0.4} C${size*0.5},-${size*0.3} ${size*0.6},-${size*0.1} ${size*0.5},${size*0.1}
                 C${size*0.4},${size*0.3} ${size*0.2},${size*0.4} ${size*0.1},${size*0.5}"
              fill="none" stroke="rgba(255, 255, 255, 0.8)" stroke-width="2" />

        <!-- Brain center connection -->
        <path d="M-${size*0.1},${size*0.1} C-${size*0.05},${size*0.2} ${size*0.05},${size*0.2} ${size*0.1},${size*0.1}"
              fill="none" stroke="rgba(255, 255, 255, 0.8)" stroke-width="2" />

        <!-- Neural connections -->
        <g stroke="rgba(255, 255, 255, 0.6)" stroke-width="1.5">
            <path d="M-${size*0.3},-${size*0.2} C-${size*0.1},-${size*0.3} ${size*0.1},-${size*0.3} ${size*0.3},-${size*0.2}" />
            <path d="M-${size*0.4},${size*0.0} C-${size*0.2},${size*0.1} ${size*0.2},${size*0.1} ${size*0.4},${size*0.0}" />
            <path d="M-${size*0.3},${size*0.3} C-${size*0.1},${size*0.2} ${size*0.1},${size*0.2} ${size*0.3},${size*0.3}" />
        </g>

        <!-- Neural nodes -->
        <g fill="rgba(255, 255, 255, 0.9)">
            <circle cx="-${size*0.3}" cy="-${size*0.2}" r="3" />
            <circle cx="${size*0.3}" cy="-${size*0.2}" r="3" />
            <circle cx="-${size*0.4}" cy="${size*0.0}" r="3" />
            <circle cx="${size*0.4}" cy="${size*0.0}" r="3" />
            <circle cx="-${size*0.3}" cy="${size*0.3}" r="3" />
            <circle cx="${size*0.3}" cy="${size*0.3}" r="3" />
        </g>
    </g>
    `;
}

// Function to generate contact icon
function generateContactIcon(x, y, size) {
    return `
    <!-- Contact icon with envelope -->
    <g transform="translate(${x}, ${y})">
        <!-- Glow effect -->
        <circle cx="0" cy="0" r="${size*1.2}" fill="rgba(30, 99, 255, 0.2)" />

        <!-- Envelope body -->
        <rect x="-${size*0.7}" y="-${size*0.5}" width="${size*1.4}" height="${size}" rx="5" ry="5"
              fill="rgba(30, 99, 255, 0.7)" stroke="rgba(255, 255, 255, 0.7)" stroke-width="3" />

        <!-- Envelope flap -->
        <path d="M-${size*0.7},-${size*0.5} L0,-${size*0.1} L${size*0.7},-${size*0.5}"
              fill="none" stroke="rgba(255, 255, 255, 0.8)" stroke-width="3" />

        <!-- Envelope content lines -->
        <g stroke="rgba(255, 255, 255, 0.8)" stroke-width="2">
            <line x1="-${size*0.5}" y1="${size*0.1}" x2="${size*0.5}" y2="${size*0.1}" />
            <line x1="-${size*0.5}" y1="${size*0.25}" x2="${size*0.3}" y2="${size*0.25}" />
        </g>
    </g>
    `;
}

// Function to generate lock icon
function generateLockIcon(x, y, size) {
    return `
    <!-- Lock icon for security -->
    <g transform="translate(${x}, ${y})">
        <!-- Glow effect -->
        <circle cx="0" cy="0" r="${size*1.2}" fill="rgba(30, 99, 255, 0.2)" />

        <!-- Lock body -->
        <rect x="-${size*0.6}" y="-${size*0.1}" width="${size*1.2}" height="${size*0.9}" rx="10" ry="10"
              fill="rgba(30, 99, 255, 0.7)" stroke="rgba(255, 255, 255, 0.7)" stroke-width="3" />

        <!-- Lock shackle -->
        <path d="M-${size*0.3},-${size*0.1} C-${size*0.3},-${size*0.4} -${size*0.2},-${size*0.6} 0,-${size*0.6}
                 C${size*0.2},-${size*0.6} ${size*0.3},-${size*0.4} ${size*0.3},-${size*0.1}"
              fill="none" stroke="rgba(255, 255, 255, 0.8)" stroke-width="3" />

        <!-- Keyhole -->
        <circle cx="0" cy="${size*0.3}" r="${size*0.15}" fill="rgba(10, 25, 41, 0.8)"
                stroke="rgba(255, 255, 255, 0.5)" stroke-width="2" />

        <!-- Keyhole detail -->
        <line x1="0" y1="${size*0.15}" x2="0" y2="${size*0.45}"
              stroke="rgba(255, 255, 255, 0.5)" stroke-width="3" />
    </g>
    `;
}

// Function to generate balance icon
function generateBalanceIcon(x, y, size) {
    return `
    <!-- Balance/scales icon for ethics -->
    <g transform="translate(${x}, ${y})">
        <!-- Glow effect -->
        <circle cx="0" cy="0" r="${size*1.2}" fill="rgba(30, 99, 255, 0.2)" />

        <!-- Balance pole -->
        <line x1="-${size*0.7}" y1="-${size*0.1}" x2="${size*0.7}" y2="-${size*0.1}"
              stroke="rgba(255, 255, 255, 0.8)" stroke-width="3" />

        <!-- Center stand -->
        <line x1="0" y1="-${size*0.1}" x2="0" y2="${size*0.7}"
              stroke="rgba(255, 255, 255, 0.8)" stroke-width="3" />

        <!-- Base -->
        <rect x="-${size*0.4}" y="${size*0.7}" width="${size*0.8}" height="${size*0.1}" rx="5" ry="5"
              fill="rgba(30, 99, 255, 0.7)" stroke="rgba(255, 255, 255, 0.7)" stroke-width="2" />

        <!-- Left scale -->
        <g>
            <line x1="-${size*0.7}" y1="-${size*0.1}" x2="-${size*0.7}" y2="${size*0.2}"
                  stroke="rgba(255, 255, 255, 0.8)" stroke-width="2" />
            <circle cx="-${size*0.7}" cy="${size*0.4}" r="${size*0.25}"
                    fill="rgba(30, 99, 255, 0.7)" stroke="rgba(255, 255, 255, 0.7)" stroke-width="2" />
        </g>

        <!-- Right scale -->
        <g>
            <line x1="${size*0.7}" y1="-${size*0.1}" x2="${size*0.7}" y2="${size*0.2}"
                  stroke="rgba(255, 255, 255, 0.8)" stroke-width="2" />
            <circle cx="${size*0.7}" cy="${size*0.4}" r="${size*0.25}"
                    fill="rgba(30, 99, 255, 0.7)" stroke="rgba(255, 255, 255, 0.7)" stroke-width="2" />
        </g>
    </g>
    `;
}

// Function to generate future icon
function generateFutureIcon(x, y, size) {
    return `
    <!-- Future technology icon -->
    <g transform="translate(${x}, ${y})">
        <!-- Glow effect -->
        <circle cx="0" cy="0" r="${size*1.2}" fill="rgba(30, 99, 255, 0.2)" />

        <!-- Outer ring -->
        <circle cx="0" cy="0" r="${size*0.8}" fill="none"
                stroke="rgba(30, 99, 255, 0.7)" stroke-width="3" />

        <!-- Inner ring -->
        <circle cx="0" cy="0" r="${size*0.5}" fill="none"
                stroke="rgba(255, 255, 255, 0.7)" stroke-width="2" />

        <!-- Center point -->
        <circle cx="0" cy="0" r="${size*0.1}"
                fill="rgba(255, 255, 255, 0.9)" />

        <!-- Connecting lines -->
        <g stroke="rgba(255, 255, 255, 0.8)" stroke-width="2">
            <line x1="0" y1="-${size*0.5}" x2="0" y2="-${size*0.8}" />
            <line x1="${size*0.35}" y1="-${size*0.35}" x2="${size*0.57}" y2="-${size*0.57}" />
            <line x1="${size*0.5}" y1="0" x2="${size*0.8}" y2="0" />
            <line x1="${size*0.35}" y1="${size*0.35}" x2="${size*0.57}" y2="${size*0.57}" />
            <line x1="0" y1="${size*0.5}" x2="0" y2="${size*0.8}" />
            <line x1="-${size*0.35}" y1="${size*0.35}" x2="-${size*0.57}" y2="${size*0.57}" />
            <line x1="-${size*0.5}" y1="0" x2="-${size*0.8}" y2="0" />
            <line x1="-${size*0.35}" y1="-${size*0.35}" x2="-${size*0.57}" y2="-${size*0.57}" />
        </g>

        <!-- Connection points -->
        <g fill="rgba(255, 255, 255, 0.9)">
            <circle cx="0" cy="-${size*0.8}" r="4" />
            <circle cx="${size*0.57}" cy="-${size*0.57}" r="4" />
            <circle cx="${size*0.8}" cy="0" r="4" />
            <circle cx="${size*0.57}" cy="${size*0.57}" r="4" />
            <circle cx="0" cy="${size*0.8}" r="4" />
            <circle cx="-${size*0.57}" cy="${size*0.57}" r="4" />
            <circle cx="-${size*0.8}" cy="0" r="4" />
            <circle cx="-${size*0.57}" cy="-${size*0.57}" r="4" />
        </g>
    </g>
    `;
}

// Create all the images with enhanced designs
createSVG('images/home_hero.svg', 'SecureAgents Framework', 'Building Trustworthy AI Systems', '#0a1929', '#1a2d3d', 'home');
createSVG('images/about_hero.svg', 'About tbh.ai', 'Pioneering Trustworthy AI', '#0d2136', '#1d3045', 'about');
createSVG('images/secureagents_hero.svg', 'SecureAgents Framework', 'Building Secure Multi-Agent Systems', '#0a1929', '#1a2d3d', 'secureagents');
createSVG('images/products_hero.svg', 'Products & Solutions', 'Comprehensive AI Security Tools', '#0f2942', '#1e3a54', 'products');
createSVG('images/models_hero.svg', 'AI Models', 'Advanced Secure AI Models', '#122a3d', '#203c4f', 'models');
createSVG('images/contact_hero.svg', 'Get in Touch', 'We\'re here to help secure your AI systems', '#0e1c38', '#1e2c48', 'contact');

// Create blog post images
createSVG('images/blog-secure-agents.svg', 'SecureAgents Framework', 'Building Secure Multi-Agent Systems', '#0a1929', '#1a2d3d', 'blog-secure-agents');
createSVG('images/blog-ai-security.svg', 'The Future of AI Security', 'Challenges and Solutions', '#1a1a2e', '#16213e', 'blog-ai-security');
createSVG('images/blog-ai-ethics.svg', 'AI Ethics & Responsibility', 'Building AI with Ethical Principles', '#1e2a4a', '#2a3a5a', 'blog-ai-ethics');
createSVG('images/blog-future-ai.svg', 'The Future of AI', 'Trends and Predictions', '#0e1c38', '#1e2c48', 'blog-future-ai');

console.log('All images have been created with professional designs.');