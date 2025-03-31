#!/bin/bash
# changelog-search.sh
# Created: 2025-03-31 10:27:18 AM
# Author: David Mieloch
# Version: 0.1.0
# Description: Search the CHANGELOG.md for entries related to specific components or features

# Default settings
CHANGELOG_FILE="CHANGELOG.md"
CONTEXT_LINES=3
MAX_RESULTS=20
SHOW_VERSION_HEADERS=true
COLOR_OUTPUT=true

# Usage information
function show_usage() {
  echo "Usage: $0 [options] <search_term>"
  echo ""
  echo "Options:"
  echo "  -c, --context LINES      Number of context lines to show (default: $CONTEXT_LINES)"
  echo "  -m, --max-results COUNT  Maximum number of results to show (default: $MAX_RESULTS)"
  echo "  -v, --versions           Show version headers for context (default: true)"
  echo "  -n, --no-color           Disable colored output"
  echo "  -h, --help               Show this help message"
  echo ""
  echo "Example:"
  echo "  $0 Navigation            # Search for Navigation-related changes"
  echo "  $0 --context 5 Experience # Show 5 lines of context for Experience changes"
  echo ""
}

# Parse arguments
PARAMS=""
while (( "$#" )); do
  case "$1" in
    -c|--context)
      CONTEXT_LINES="$2"
      shift 2
      ;;
    -m|--max-results)
      MAX_RESULTS="$2"
      shift 2
      ;;
    -v|--versions)
      SHOW_VERSION_HEADERS=true
      shift
      ;;
    --no-versions)
      SHOW_VERSION_HEADERS=false
      shift
      ;;
    -n|--no-color)
      COLOR_OUTPUT=false
      shift
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

# Check if a search term was provided
if [ $# -eq 0 ]; then
  echo "Error: No search term provided" >&2
  show_usage
  exit 1
fi

SEARCH_TERM="$1"

# Check if changelog file exists
if [ ! -f "$CHANGELOG_FILE" ]; then
  echo "Error: Changelog file not found: $CHANGELOG_FILE" >&2
  exit 1
fi

# Configure colors if enabled
if [ "$COLOR_OUTPUT" = true ]; then
  VERSION_COLOR="\033[1;36m" # Bright Cyan
  MATCH_COLOR="\033[1;33m" # Bright Yellow
  CONTENT_COLOR="\033[0;37m" # Light Gray
  RESET_COLOR="\033[0m" # Reset
else
  VERSION_COLOR=""
  MATCH_COLOR=""
  CONTENT_COLOR=""
  RESET_COLOR=""
fi

# Extract version headers for context if requested
VERSION_HEADERS=()
if [ "$SHOW_VERSION_HEADERS" = true ]; then
  while IFS= read -r line; do
    VERSION_HEADERS+=("$line")
  done < <(grep -n "^### \[" "$CHANGELOG_FILE")
fi

# Perform the search
RESULTS=$(grep -n -i "$SEARCH_TERM" "$CHANGELOG_FILE")
RESULT_COUNT=$(echo "$RESULTS" | grep -c .)

if [ -z "$RESULTS" ]; then
  echo "No results found for '$SEARCH_TERM'"
  exit 0
fi

echo "Found $RESULT_COUNT results for '$SEARCH_TERM' in $CHANGELOG_FILE"
echo ""

# Process each result with context
COUNT=0
while IFS=: read -r line_num content; do
  # Skip if we've hit the max results
  if [ $COUNT -ge $MAX_RESULTS ]; then
    echo "Reached maximum results limit ($MAX_RESULTS). Use --max-results to show more."
    break
  fi
  
  # Find the nearest version header above this result
  CURRENT_VERSION=""
  if [ "$SHOW_VERSION_HEADERS" = true ]; then
    for version_header in "${VERSION_HEADERS[@]}"; do
      IFS=: read -r version_line version_content <<< "$version_header"
      if [ "$version_line" -lt "$line_num" ]; then
        CURRENT_VERSION="$version_content"
      else
        break
      fi
    done
  fi
  
  # Print the version context if available
  if [ -n "$CURRENT_VERSION" ]; then
    echo -e "${VERSION_COLOR}$CURRENT_VERSION${RESET_COLOR}"
  fi
  
  # Calculate context line range
  START=$((line_num - CONTEXT_LINES))
  END=$((line_num + CONTEXT_LINES))
  
  # Ensure start is at least 1
  if [ $START -lt 1 ]; then
    START=1
  fi
  
  # Print lines with context
  sed -n "${START},${END}p" "$CHANGELOG_FILE" | while IFS= read -r ctx_line; do
    ctx_line_num=$((START++))
    
    if [ "$ctx_line_num" -eq "$line_num" ]; then
      # This is the matching line
      echo -e "${MATCH_COLOR}$ctx_line${RESET_COLOR}"
    else
      # This is a context line
      echo -e "${CONTENT_COLOR}$ctx_line${RESET_COLOR}"
    fi
  done
  
  echo ""
  COUNT=$((COUNT + 1))
done <<< "$RESULTS"

exit 0 