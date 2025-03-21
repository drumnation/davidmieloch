// Language colors based on GitHub's language color scheme
export const getLanguageColor = (language: string): string => {
  const colors: Record<string, string> = {
    typescript: '#3178C6',
    javascript: '#F7DF1E',
    python: '#3776AB',
    java: '#007396',
    go: '#00ADD8',
    ruby: '#CC342D',
    php: '#777BB4',
    css: '#1572B6',
    html: '#E34F26',
    swift: '#DE5D43',
    kotlin: '#7F52FF',
    rust: '#DEA584',
    dart: '#0175C2',
    csharp: '#239120',
    c: '#555555',
    cpp: '#F34B7D',
    shell: '#89E051',
    dockerfile: '#384D54',
    vue: '#4FC08D',
    react: '#61DAFB',
    angular: '#DD0031',
    svelte: '#FF3E00',
    nextjs: '#000000',
    nodejs: '#339933',
    deno: '#000000',
    elixir: '#4B275F',
    haskell: '#5D4F85',
    lua: '#000080',
    perl: '#39457E',
    r: '#276DC3',
    scala: '#DC322F',
    solidity: '#AA6746',
    graphql: '#E10098'
  };

  // Normalize language name to lowercase and remove any spaces or special characters
  const normalizedLanguage = language.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Return specific color or default
  return colors[normalizedLanguage] || '#8D94A1'; // Default gray color
}; 