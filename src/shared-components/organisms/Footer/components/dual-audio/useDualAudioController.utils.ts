export function fadeAudioVolume(audio: HTMLAudioElement, targetVolume: number, duration: number = 300) {
    const startVolume = audio.volume;
    const startTime = performance.now();
    const delta = targetVolume - startVolume;
    let animationFrame: number;
    function step(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        audio.volume = Math.max(0, Math.min(1, startVolume + delta * progress));
        if (progress < 1) {
            animationFrame = requestAnimationFrame(step);
        }
    }
    animationFrame = requestAnimationFrame(step);
} 