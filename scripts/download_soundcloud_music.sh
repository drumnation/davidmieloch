#!/bin/bash

# Script to download music and artwork from a SoundCloud profile

# --- Configuration ---
PROFILE_URL="https://soundcloud.com/davidmieloch"
TARGET_DIR="public/audio/music"
AUDIO_FORMAT="mp3"
AUDIO_QUALITY="0" # 0 (best VBR) to 9 (worst) for MP3
IMAGE_FORMAT="jpg"

# --- Check Dependencies ---
if ! command -v yt-dlp &>/dev/null; then
    echo "Error: yt-dlp is not installed." >&2
    echo "Please install it (e.g., 'brew install yt-dlp' or 'pip install yt-dlp')." >&2
    exit 1
fi

# --- Create Target Directory ---
echo "Ensuring target directory exists: $TARGET_DIR"
mkdir -p "$TARGET_DIR"

# --- Download ---
echo "Starting download from: $PROFILE_URL"
echo "Saving files to: $TARGET_DIR"

yt-dlp \
    --verbose \
    --ignore-errors \
    -x \
    --audio-format "$AUDIO_FORMAT" \
    --audio-quality "$AUDIO_QUALITY" \
    --write-thumbnail \
    --convert-thumbnails "$IMAGE_FORMAT" \
    -o "$TARGET_DIR/%(title)s.%(ext)s" \
    "$PROFILE_URL"

echo "Download process finished."
echo "Files saved in $TARGET_DIR"
echo "Note: Filenames are based on SoundCloud track titles. Manual cleanup may be desired."

exit 0
