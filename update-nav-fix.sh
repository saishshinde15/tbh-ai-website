#!/bin/bash

# List of HTML files to update
files=("about.html" "careers.html" "contact.html" "models.html" "products.html")

for file in "${files[@]}"; do
  # Check if the file exists
  if [ -f "$file" ]; then
    # Add the nav-fix.css link after the main.css link if it doesn't already exist
    if ! grep -q "nav-fix.css" "$file"; then
      sed -i '' 's|<link rel="stylesheet" href="styles/main.css">|<link rel="stylesheet" href="styles/main.css">\n    <link rel="stylesheet" href="styles/nav-fix.css">|g' "$file"
      echo "Updated $file"
    else
      echo "$file already has nav-fix.css"
    fi
  else
    echo "File $file not found"
  fi
done

echo "All files updated"
