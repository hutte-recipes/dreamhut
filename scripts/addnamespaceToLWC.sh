#!/bin/bash

# Define the namespace prefix
NAMESPACE="Hutte__"

# Define the directory containing the LWC files
LWC_DIR="force-app/main/default/lwc"

# Find all .js, .html, and .js-meta.xml files in the LWC directory and iterate through them
find "$LWC_DIR" -type f \( -name "*.js" -o -name "*.html" -o -name "*.js-meta.xml" \) | while read -r FILE; do
    # Use sed to add the namespace prefix to words ending with __c or __s
    sed -i.bak -E "s/([a-zA-Z0-9_]+\.)?([a-zA-Z0-9_]+)(__[cs])/\1$NAMESPACE\2\3/g" "$FILE"
    # Remove the backup file created by sed (optional)
    rm "${FILE}.bak"
    echo "Processed: $FILE"
done

echo "Namespace prefixing completed."
