#!/bin/bash

# Script to normalize filenames in the music directory

# --- Configuration ---
TARGET_DIR="public/audio/music"

# --- Function to normalize filename ---
normalize() {
    local filename=$(basename "$1")
    local extension="${filename##*.}"
    local name_part="${filename%.*}"

    # Convert to lowercase
    name_part=$(echo "$name_part" | tr '[:upper:]' '[:lower:]')
    extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

    # Replace common separators and special characters with a single dash
    name_part=$(echo "$name_part" | sed -E 's/[][():：'"'"'|[:space:]-]+/-/g')

    # Remove leading/trailing dashes
    name_part=$(echo "$name_part" | sed -E 's/^-+|-+$//g')

    # Ensure extension is valid (add more audio/image types if needed)
    if [[ "$extension" != "mp3" && "$extension" != "jpg" && "$extension" != "jpeg" && "$extension" != "png" ]]; then
        echo "Unknown extension: $extension for file $filename" >&2
        echo "" # Return empty string to signal skip
        return
    fi
    # Standardize image extensions to jpg for simplicity here, could use ffmpeg for conversion if needed later
    if [[ "$extension" == "jpeg" || "$extension" == "png" ]]; then
        extension="jpg"
    fi

    echo "${name_part}.${extension}"
}

# --- Main Processing ---
echo "Starting normalization in: $TARGET_DIR"
cd "$TARGET_DIR" || {
    echo "Error: Could not change to target directory $TARGET_DIR" >&2
    exit 1
}

find . -maxdepth 1 -type f | while IFS= read -r file; do
    # Skip hidden files like .DS_Store
    [[ "$(basename "$file")" == .* ]] && continue

    original_name=$(basename "$file")
    normalized_name=$(normalize "$original_name")

    if [[ -z "$normalized_name" ]]; then
        echo "Skipping file with unknown extension: $original_name"
        continue
    fi

    if [[ "$original_name" != "$normalized_name" ]]; then
        # Handle potential collisions (simple counter)
        counter=1
        final_name="$normalized_name"
        while [[ -e "$final_name" ]]; do
            base="${normalized_name%.*}"
            ext="${normalized_name##*.}"
            final_name="${base}_${counter}.${ext}"
            ((counter++))
        done

        if [[ "$original_name" != "$final_name" ]]; then
            echo "Renaming '$original_name' -> '$final_name'"
            mv "$original_name" "$final_name"
        # Optional: Add ffmpeg conversion here if needed, e.g., for non-jpg images
        # Example: Convert PNG to JPG during rename
        # if [[ "${original_name##*.}" == "png" && "${final_name##*.}" == "jpg" ]]; then
        #    echo "Converting PNG to JPG: '$original_name' -> '$final_name'"
        #    ffmpeg -i "$original_name" "$final_name" && rm "$original_name"
        # else
        #    # Just rename if not converting
        #    mv "$original_name" "$final_name"
        # fi

        else
            echo "Skipping already normalized (or collision resolved to same name): $original_name"
        fi
    else
        echo "Skipping already normalized: $original_name"
    fi
done

cd - >/dev/null # Go back to previous directory silently

echo "Normalization finished."

exit 0
