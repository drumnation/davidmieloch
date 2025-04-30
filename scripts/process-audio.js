#!/usr/bin/env node
/**
 * Processes all MP3s in /public/audio/music and outputs ducked versions to /public/audio/music-ducked
 * Applies EBU loudness normalization, dynamic range compression, and aggressive volume reduction (-18dB).
 * Prints LUFS of original and ducked for validation.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);

const SOURCE_DIR = path.join(process.cwd(), 'public', 'audio', 'music');
const TARGET_DIR = path.join(process.cwd(), 'public', 'audio', 'music-ducked');

// Ducking config per track
const duckingConfig = {
    'reality-tunnel.mp3': { category: 'electronic', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'frenetic-puzzle-game-gameplay.mp3': { category: 'film', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'lielexlium.mp3': { category: 'electronic', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'organica-for-solo-violin.mp3': { category: 'classical', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'epic-battle-game-opening-credits.mp3': { category: 'film', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'exotic-traveling-game-cut-scene-light.mp3': { category: 'film', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'exotic-traveling-game-cut-scene-dark.mp3': { category: 'film', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'warrior-prepares-for-battle-game-cut-scene.mp3': { category: 'film', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'booty-dance-of-the-sugar-plum-fairy.mp3': { category: 'electronic', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'where-roads-end-mixed-chamber-ensemble.mp3': { category: 'classical', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'hop-trippin-the-bells.mp3': { category: 'electronic', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'casual-zombie-gameplay-iphone.mp3': { category: 'film', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'requiem-in-memory-of-a-dear-friend.mp3': { category: 'classical', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'sci-fi-first-person-shooter-opening-credits.mp3': { category: 'film', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'sonata-no.1-for-string-orchestra.mp3': { category: 'classical', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'aluzion-fields.mp3': { category: 'electronic', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'sci-fi-first-person-shooter-gameplay.mp3': { category: 'film', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'identity-conflict-z-chamber-trio.mp3': { category: 'classical', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'it-s-a-wonderful-life-for-kings.mp3': { category: 'film', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'chill-out-ya-merry-gentleman.mp3': { category: 'electronic', compressionFilter: 'dynaudnorm=f=250:g=8' },
    'scarlet-harvest.mp3': { category: 'film', compressionFilter: 'dynaudnorm=f=250:g=8' },
};

// Check for ffmpeg
try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
} catch (err) {
    console.error('❌ ffmpeg is not installed or not in PATH.');
    process.exit(1);
}

// Measure LUFS using loudnorm in analysis mode
function getLUFS(filePath) {
    try {
        const output = execSync(
            `ffmpeg -hide_banner -i "${filePath}" -af loudnorm=I=-23:LRA=11:TP=-1.5:print_format=summary -f null -`,
            { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
        );
        const match = output.match(/Input Integrated:\s*(-?\d+(\.\d+)?) LUFS/);
        return match ? parseFloat(match[1]) : null;
    } catch {
        return null;
    }
}

async function processAudioFiles() {
    console.log('🎵 Ducking and compressing audio files...');

    await mkdir(TARGET_DIR, { recursive: true });

    let files = await readdir(SOURCE_DIR);
    files = files.filter(f => f.endsWith('.mp3'));

    if (files.length === 0) {
        console.log('⚠️ No MP3 files found.');
        return;
    }

    let success = 0;
    let fail = 0;

    for (const file of files) {
        const sourcePath = path.join(SOURCE_DIR, file);
        const targetPath = path.join(TARGET_DIR, file);
        const config = duckingConfig[file];

        if (!config) {
            console.warn(`⚠️ Skipping ${file} — no config`);
            continue;
        }

        // TESTING: Aggressive ducking to actually hear volume change
        const filter = `loudnorm=I=-24:LRA=7:TP=-2,${config.compressionFilter},volume=-18dB`;

        try {
            console.log(`🎧 Processing: ${file}`);
            execSync(`ffmpeg -y -i "${sourcePath}" -af "${filter}" "${targetPath}"`, { stdio: 'ignore' });

            const originalLUFS = getLUFS(sourcePath);
            const duckedLUFS = getLUFS(targetPath);

            console.log(`   🎚 Original LUFS: ${originalLUFS ?? 'N/A'}  →  Ducked LUFS: ${duckedLUFS ?? 'N/A'}`);
            success++;
        } catch (err) {
            console.error(`❌ Failed: ${file} — ${err.message}`);
            fail++;
        }
    }

    console.log('\n✅ Success:', success);
    console.log('❌ Failures:', fail);
}

processAudioFiles().catch(err => {
    console.error(`❌ Unhandled error: ${err.message}`);
    process.exit(1);
});
