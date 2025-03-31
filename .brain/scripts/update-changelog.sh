#!/bin/bash
# Script to update the CHANGELOG.md file with today's date
# Last Updated: 2025-03-31 10:20:09 AM

# update-changelog.sh
# Created: 2025-03-31 10:25:30 AM
# Author: David Mieloch
# Version: 0.1.0
# Description: Script to update the project changelog with new entries

# Settings
CHANGELOG_FILE="CHANGELOG.md"
BACKUP_DIR=".brain/backup/changelogs"
DATE_FORMAT="%Y-%m-%d"
TODAY=$(date +$DATE_FORMAT)

# Function to display usage instructions
function show_usage() {
  echo "Usage: $0 [options]"
  echo ""
  echo "Options:"
  echo "  -v, --version VERSION    Specify version number (required)"
  echo "  -t, --type TYPE          Entry type: added, changed, fixed, deprecated, removed, security"
  echo "  -m, --message MESSAGE    Changelog message (required)"
  echo "  -b, --backup             Create a backup of the changelog before modifying"
  echo "  -h, --help               Display this help message"
  echo ""
  echo "Example:"
  echo "  $0 -v 1.2.3 -t added -m \"Added new feature X\""
}

# Check if no arguments provided
if [ $# -eq 0 ]; then
  show_usage
  exit 1
fi

# Parse command line arguments
VERSION=""
TYPE=""
MESSAGE=""
CREATE_BACKUP=false

while [[ $# -gt 0 ]]; do
  case $1 in
    -v|--version)
      VERSION="$2"
      shift 2
      ;;
    -t|--type)
      TYPE="$2"
      shift 2
      ;;
    -m|--message)
      MESSAGE="$2"
      shift 2
      ;;
    -b|--backup)
      CREATE_BACKUP=true
      shift
      ;;
    -h|--help)
      show_usage
      exit 0
      ;;
    *)
      echo "Error: Unknown option $1"
      show_usage
      exit 1
      ;;
  esac
done

# Validate required arguments
if [ -z "$VERSION" ]; then
  echo "Error: Version number is required"
  show_usage
  exit 1
fi

if [ -z "$MESSAGE" ]; then
  echo "Error: Changelog message is required"
  show_usage
  exit 1
fi

# Validate entry type
if [ -n "$TYPE" ]; then
  VALID_TYPES=("added" "changed" "fixed" "deprecated" "removed" "security" "improved")
  VALID_TYPE=false
  
  for i in "${VALID_TYPES[@]}"; do
    if [ "$i" = "$TYPE" ]; then
      VALID_TYPE=true
      break
    fi
  done
  
  if [ "$VALID_TYPE" = false ]; then
    echo "Error: Invalid entry type. Valid types are: ${VALID_TYPES[*]}"
    exit 1
  fi
fi

# Capitalize first letter of type
if [ -n "$TYPE" ]; then
  TYPE="$(tr '[:lower:]' '[:upper:]' <<< ${TYPE:0:1})${TYPE:1}"
fi

# Create backup if requested
if [ "$CREATE_BACKUP" = true ]; then
  BACKUP_FILE="$BACKUP_DIR/changelog_backup_$(date +%Y%m%d_%H%M%S).md"
  mkdir -p "$BACKUP_DIR"
  cp "$CHANGELOG_FILE" "$BACKUP_FILE"
  echo "Backup created: $BACKUP_FILE"
fi

# Check if version section already exists
VERSION_PATTERN="\[${VERSION}\]"
if grep -q "$VERSION_PATTERN" "$CHANGELOG_FILE"; then
  # Version exists, add new entry to that section
  if [ -n "$TYPE" ]; then
    # Find the position to insert the new entry
    TYPE_PATTERN="#### $TYPE"
    if grep -q "$TYPE_PATTERN" "$CHANGELOG_FILE"; then
      # Type section exists for this version, append entry
      sed -i '' "/$TYPE_PATTERN/a\\
- $MESSAGE" "$CHANGELOG_FILE"
    else
      # Type section doesn't exist, create it after version header
      sed -i '' "/$VERSION_PATTERN/a\\
\\
#### $TYPE\\
- $MESSAGE" "$CHANGELOG_FILE"
    fi
  else
    # No type specified, add directly under version
    sed -i '' "/$VERSION_PATTERN/a\\
- $MESSAGE" "$CHANGELOG_FILE"
  fi
else
  # Version doesn't exist, create new version section
  
  # Find Unreleased section
  UNRELEASED_PATTERN="## \[Unreleased\]"
  if grep -q "$UNRELEASED_PATTERN" "$CHANGELOG_FILE"; then
    # Add new version after Unreleased section
    if [ -n "$TYPE" ]; then
      sed -i '' "/$UNRELEASED_PATTERN/a\\
\\
### \[$VERSION\] - $TODAY\\
\\
#### $TYPE\\
- $MESSAGE" "$CHANGELOG_FILE"
    else
      sed -i '' "/$UNRELEASED_PATTERN/a\\
\\
### \[$VERSION\] - $TODAY\\
\\
- $MESSAGE" "$CHANGELOG_FILE"
    fi
  else
    # No Unreleased section, prepend to file after header
    if [ -n "$TYPE" ]; then
      sed -i '' "1,5s/$(head -5 "$CHANGELOG_FILE")/$(head -5 "$CHANGELOG_FILE")\\
\\
## \[Unreleased\]\\
\\
### \[$VERSION\] - $TODAY\\
\\
#### $TYPE\\
- $MESSAGE/" "$CHANGELOG_FILE"
    else
      sed -i '' "1,5s/$(head -5 "$CHANGELOG_FILE")/$(head -5 "$CHANGELOG_FILE")\\
\\
## \[Unreleased\]\\
\\
### \[$VERSION\] - $TODAY\\
\\
- $MESSAGE/" "$CHANGELOG_FILE"
    fi
  fi
fi

echo "Changelog updated successfully!"
exit 0 