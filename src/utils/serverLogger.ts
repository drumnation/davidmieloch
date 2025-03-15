/**
 * Server-side logger that can be used in both server and client components
 */
export const serverLogger = {
  error: (message: string, error?: unknown) => {
    console.error('🔴 SERVER ERROR:', message);
    if (error) {
      console.error('Error details:', error);
    }
  },
  
  warn: (message: string, data?: unknown) => {
    console.warn('🟠 SERVER WARNING:', message);
    if (data) console.warn(data);
  },
  
  info: (message: string, data?: unknown) => {
    console.info('🔵 SERVER INFO:', message);
    if (data) console.info(data);
  },
  
  debug: (message: string, data?: unknown) => {
    console.debug('🟢 SERVER DEBUG:', message);
    if (data) console.debug(data);
  }
}; 