import React from 'react';

// Function to generate a color based on a string
export const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Generate hues in the range that produces visually pleasant colors
  // Avoiding yellows (which can be hard to read) and focusing on blues, purples, and teals
  const hue = ((hash % 270) + 180) % 360; // Gives us colors in the blue-purple-teal range
  
  return `hsl(${hue}, 70%, 45%)`; // Using HSL with fixed saturation and lightness for consistency
};

// Function to create a letter avatar
export const LetterAvatar = ({ name, bgColor, style = {} }: { name: string; bgColor: string; style?: React.CSSProperties }) => {
  // Get first letter or first 2 letters if a multi-word name
  let initials = name.charAt(0).toUpperCase();
  if (name.includes(' ')) {
    const nameParts = name.split(' ');
    initials = `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
  }

  // Ensure contrast for text with calculated background color
  const textColor = 'white';
  
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      backgroundColor: bgColor, 
      color: textColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      borderRadius: '8px',
      boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
      ...style
    }}>
      {initials}
    </div>
  );
}; 