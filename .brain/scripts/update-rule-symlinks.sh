#!/bin/bash
# Update all rule symlinks
# Last Updated: 2025-03-31 10:06:20 AM

# Create the cursor rules directory if it doesn't exist
mkdir -p .cursor/rules

# Loop through all .mdc files in .brain/rules
for rule in .brain/rules/*.mdc; do
  if [ -f "$rule" ]; then
    filename=$(basename "$rule")
    echo "Creating symlink for $filename"
    
    # Remove existing file/symlink if it exists
    rm -f .cursor/rules/$filename
    
    # Create the symlink
    ln -s ../../.brain/rules/$filename .cursor/rules/$filename
  fi
done

# Verify the symlinks
echo -e "\nVerifying symlinks:"
ls -la .cursor/rules/

echo -e "\nAll symlinks created/updated successfully!" 