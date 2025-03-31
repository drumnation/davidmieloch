#!/bin/bash
# changelog-summary.sh
# Created: 2025-03-31 10:27:30 AM
# Author: David Mieloch
# Version: 0.1.0
# Description: Generate a summary of changelog entries for specific components

# Default settings
CHANGELOG_FILE="CHANGELOG.md"
MAX_VERSIONS=3
OUTPUT_FORMAT="markdown"
COMPONENT_ONLY=false
MODE="component" # component, tag, or recent

# Usage information
function show_usage() {
  echo "Usage: $0 [options] [component|tag]"
  echo ""
  echo "Options:"
  echo "  -v, --versions COUNT      Number of recent versions to include (default: $MAX_VERSIONS)"
  echo "  -r, --recent              Show only recent changes regardless of component"
  echo "  -c, --component-only      Only include entries directly mentioning the component"
  echo "  -t, --tags                Search for tag instead of component name (e.g. #UI)"
  echo "  -f, --format FORMAT       Output format: markdown or text (default: $OUTPUT_FORMAT)"
  echo "  -h, --help                Show this help message"
  echo ""
  echo "Example:"
  echo "  $0 Navigation             # Summarize changes for Navigation component"
  echo "  $0 --tags #UI             # Summarize changes with the #UI tag"
  echo "  $0 --recent               # Summarize recent changes (last $MAX_VERSIONS versions)"
  echo ""
}

# Parse arguments
PARAMS=""
while (( "$#" )); do
  case "$1" in
    -v|--versions)
      MAX_VERSIONS="$2"
      shift 2
      ;;
    -r|--recent)
      MODE="recent"
      shift
      ;;
    -c|--component-only)
      COMPONENT_ONLY=true
      shift
      ;;
    -t|--tags)
      MODE="tag"
      shift
      ;;
    -f|--format)
      OUTPUT_FORMAT="$2"
      shift 2
      ;;
    -h|--help)
      show_usage
      exit 0
      ;;
    --) # end of options
      shift
      break
      ;;
    -*) # unsupported option
      echo "Error: Unsupported option $1" >&2
      show_usage
      exit 1
      ;;
    *) # preserve positional arguments
      PARAMS="$PARAMS $1"
      shift
      ;;
  esac
done

# Set positional arguments back
eval set -- "$PARAMS"

# Check if a search term was provided for component or tag mode
if [ "$MODE" != "recent" ] && [ $# -eq 0 ]; then
  echo "Error: No search term provided" >&2
  show_usage
  exit 1
fi

# Set search term if provided
if [ $# -gt 0 ]; then
  SEARCH_TERM="$1"
else
  SEARCH_TERM=""
fi

# Check if changelog file exists
if [ ! -f "$CHANGELOG_FILE" ]; then
  echo "Error: Changelog file not found: $CHANGELOG_FILE" >&2
  exit 1
fi

# Validate output format
if [ "$OUTPUT_FORMAT" != "markdown" ] && [ "$OUTPUT_FORMAT" != "text" ]; then
  echo "Error: Invalid output format. Choose 'markdown' or 'text'" >&2
  exit 1
fi

# Function to print markdown header
function print_markdown_header() {
  local level=$1
  local text=$2
  
  if [ "$OUTPUT_FORMAT" = "markdown" ]; then
    printf '%s %s\n\n' "$(printf '#%.0s' $(seq 1 $level))" "$text"
  else
    printf '%s\n%s\n\n' "$text" "$(printf '=%.0s' $(seq 1 ${#text}))"
  fi
}

# Function to print changelog entry
function print_entry() {
  local version=$1
  local date=$2
  local entry_type=$3
  local entry=$4
  
  if [ "$OUTPUT_FORMAT" = "markdown" ]; then
    echo "- **[$version]** ($date): $entry_type - $entry"
  else
    echo "[$version] ($date): $entry_type - $entry"
  fi
}

# Extract recent versions
VERSION_PATTERN="### \[(.*)\] - (.*)"
VERSIONS=()
DATES=()
VERSION_COUNT=0

while IFS= read -r line; do
  if [[ $line =~ $VERSION_PATTERN ]]; then
    version="${BASH_REMATCH[1]}"
    date="${BASH_REMATCH[2]}"
    
    # Skip Unreleased
    if [ "$version" != "Unreleased" ]; then
      VERSIONS+=("$version")
      DATES+=("$date")
      
      VERSION_COUNT=$((VERSION_COUNT + 1))
      
      # Break if we've reached max versions for recent mode
      if [ "$MODE" = "recent" ] && [ $VERSION_COUNT -ge $MAX_VERSIONS ]; then
        break
      fi
    fi
  fi
done < <(grep -E "^### \[" "$CHANGELOG_FILE")

# Create temporary files for complete changelog data
TEMP_FILE=$(mktemp)
trap 'rm -f "$TEMP_FILE"' EXIT

# Initialize summary header
if [ "$MODE" = "component" ]; then
  print_markdown_header 1 "Changelog Summary for Component: $SEARCH_TERM"
elif [ "$MODE" = "tag" ]; then
  print_markdown_header 1 "Changelog Summary for Tag: $SEARCH_TERM"
else
  print_markdown_header 1 "Recent Changelog Summary (Last $MAX_VERSIONS versions)"
fi

echo ""

# Process versions
for i in $(seq 0 $((VERSION_COUNT - 1))); do
  version="${VERSIONS[$i]}"
  date="${DATES[$i]}"
  
  # Flag to track if we should include this version in the summary
  INCLUDE_VERSION=false
  
  # Extract version block
  VERSION_BLOCK=$(sed -n "/### \[$version\]/,/### \[/p" "$CHANGELOG_FILE" | sed '$d')
  
  # For component or tag mode, check if this version has relevant entries
  if [ "$MODE" != "recent" ]; then
    if echo "$VERSION_BLOCK" | grep -q -i "$SEARCH_TERM"; then
      INCLUDE_VERSION=true
    fi
  else
    INCLUDE_VERSION=true
  fi
  
  # If we should include this version
  if [ "$INCLUDE_VERSION" = true ]; then
    print_markdown_header 2 "[$version] - $date"
    
    # Process each entry type section
    while IFS= read -r type_line; do
      # Extract type (e.g., "Added", "Fixed")
      TYPE=$(echo "$type_line" | sed -E 's/^#### (.*)/\1/')
      
      # Extract entries for this type
      ENTRIES_BLOCK=$(echo "$VERSION_BLOCK" | sed -n "/#### $TYPE/,/####/p" | sed '$d' | tail -n +2)
      
      # Process entries
      FOUND_ENTRIES=false
      
      echo "$ENTRIES_BLOCK" | while IFS= read -r entry; do
        # Skip empty lines
        if [ -z "$(echo "$entry" | tr -d '[:space:]')" ]; then
          continue
        fi
        
        # Remove bullet points if present
        entry=$(echo "$entry" | sed -E 's/^- *//')
        
        # For component or tag mode, only include matching entries if --component-only is set
        if [ "$MODE" != "recent" ] && [ "$COMPONENT_ONLY" = true ]; then
          if ! echo "$entry" | grep -q -i "$SEARCH_TERM"; then
            continue
          fi
        fi
        
        # Print the entry
        print_entry "$version" "$date" "$TYPE" "$entry"
        FOUND_ENTRIES=true
      done
      
      # Add a newline if we found entries for this type
      if [ "$FOUND_ENTRIES" = true ]; then
        echo ""
      fi
      
    done < <(echo "$VERSION_BLOCK" | grep -E "^#### ")
  fi
done

# If no entries were found for component or tag
if [ "$MODE" != "recent" ] && ! grep -q "^- \*\*\[" "$TEMP_FILE"; then
  echo "No changelog entries found for $MODE '$SEARCH_TERM'"
fi

exit 0 