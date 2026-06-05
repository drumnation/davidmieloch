export function getVoiceTrackIdFromPathname(pathname: string | null | undefined): string | null {
  if (!pathname) {
    return null;
  }

  const normalized = pathname.split('?')[0].replace(/^\/|\/$/g, '');

  if (normalized.length === 0) {
    return 'home';
  }

  if (normalized.startsWith('blog/')) {
    return normalized.slice('blog/'.length);
  }

  return normalized;
}
