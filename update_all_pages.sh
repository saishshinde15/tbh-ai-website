#!/bin/bash

# This script updates all HTML files to include the network animation CSS and JS

# List of HTML files to update (excluding index.html, about.html, and contact.html which are already updated)
HTML_FILES=(
  "secureagents.html"
  "products.html"
  "models.html"
  "blog.html"
)

# Add CSS link to all HTML files
for file in "${HTML_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Adding network-animation.css to $file"
    sed -i '' 's/<link rel="stylesheet" href="styles\/main.css">/<link rel="stylesheet" href="styles\/main.css">\n    <link rel="stylesheet" href="styles\/network-animation.css">/' "$file"
  else
    echo "File $file not found"
  fi
done

# Add JS script to all HTML files
for file in "${HTML_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Adding network-animation.js to $file"
    sed -i '' 's/<script src="scripts\/animations.js"><\/script>/<script src="scripts\/animations.js"><\/script>\n    <script src="scripts\/network-animation.js"><\/script>/' "$file"
  else
    echo "File $file not found"
  fi
done

echo "All files updated successfully!"
