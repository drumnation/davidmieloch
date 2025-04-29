// Platform detection utilities for client-side feature gating

export function isIOSMobile(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
    // iPhone/iPod, not iPad or Mac, and must be touch device
    return /iPhone|iPod/.test(navigator.userAgent) && 'ontouchstart' in window;
} 