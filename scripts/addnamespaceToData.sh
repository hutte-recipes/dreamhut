#!/bin/bash

# Directory containing JSON files
DATA_DIR="data"

# Define the namespace prefix
NAMESPACE="Hutte__"

# Function to process JSON files
process_json_files() {
    echo "Looking for JSON files in $DATA_DIR"
    
    # List files in the data directory for debugging
    ls -l "$DATA_DIR"
    
    for file in "$DATA_DIR"/*.json; do
        # Check if the file exists
        if [[ -f $file ]]; then
            echo "Processing $file"
            
            # Use jq to transform the JSON
            jq 'walk(
                  if type == "object" then
                    with_entries(
                      if (.key | test("__c$|__s$")) then
                        .key |= "Hutte__" + .
                      elif (.value | type == "string" and test("__c$|__s$")) then
                        .value |= "Hutte__" + .
                      else
                        .
                      end
                    )
                  elif type == "array" then
                    map(
                      if type == "string" and test("__c$|__s$") then
                        "Hutte__" + .
                      else
                        .
                      end
                    )
                  else
                    .
                  end
                )' "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
        else
            echo "No JSON files found in $DATA_DIR"
        fi
    done
}

# Call the function to process JSON files
process_json_files

echo "Processing complete."
