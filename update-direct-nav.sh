#!/bin/bash

# List of HTML files to update
files=("about.html" "careers.html" "contact.html" "models.html" "products.html")

for file in "${files[@]}"; do
  # Check if the file exists
  if [ -f "$file" ]; then
    # Replace nav-replacement.js with direct-nav.js
    sed -i '' 's|<script src="js/nav-replacement.js"></script>|<script src="js/direct-nav.js"></script>|g' "$file"
    
    echo "Updated $file"
  else
    echo "File $file not found"
  fi
done

echo "All files updated"
