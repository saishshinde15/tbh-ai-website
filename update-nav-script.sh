#!/bin/bash

# List of HTML files to update
files=("about.html" "careers.html" "contact.html" "models.html" "products.html")

for file in "${files[@]}"; do
  # Check if the file exists
  if [ -f "$file" ]; then
    # Remove nav-fix.css reference
    sed -i '' 's|<link rel="stylesheet" href="styles/nav-fix.css">||g' "$file"
    
    # Replace fix-nav.js with nav-replacement.js
    sed -i '' 's|<script src="js/fix-nav.js"></script>|<script src="js/nav-replacement.js"></script>|g' "$file"
    
    echo "Updated $file"
  else
    echo "File $file not found"
  fi
done

echo "All files updated"
