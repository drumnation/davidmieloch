// Mock for next/image
import React from 'react';

// Component to mock Next.js Image
const Image = ({
  src,
  alt,
  width,
  height,
  style,
  ...props
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
      {...props}
    />
  );
};

// Export as default to match next/image
export default Image; 