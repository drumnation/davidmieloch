export const viewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '360px',
      height: '640px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '800px',
    },
  },
  wide: {
    name: 'Wide Desktop',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
} as const;

export type ViewportKey = keyof typeof viewports; 