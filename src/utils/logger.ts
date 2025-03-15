"use client";

/**
 * Custom logger utility for better debugging - CLIENT SIDE ONLY
 */
export const logger = {
  error: (message: string, error?: unknown) => {
    if (typeof window !== 'undefined') {
      console.error('🔴 ERROR:', message);
      
      if (error) {
        console.error('Error details:', {
          name: error instanceof Error ? error.name : 'Unknown',
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          cause: error instanceof Error ? error.cause : undefined,
          ...(error instanceof Error && 'digest' in error ? { digest: (error as unknown as Record<string, unknown>).digest } : {}),
          ...(error instanceof Error && 'code' in error ? { code: (error as unknown as Record<string, unknown>).code } : {}),
          ...(error instanceof Error && 'syscall' in error ? { syscall: (error as unknown as Record<string, unknown>).syscall } : {}),
          ...(error instanceof Error && 'path' in error ? { path: (error as unknown as Record<string, unknown>).path } : {}),
          ...(error instanceof Error && 'page' in error ? { page: (error as unknown as Record<string, unknown>).page } : {})
        });
      }
    }
  },
  
  warn: (message: string, data?: unknown) => {
    if (typeof window !== 'undefined') {
      console.warn('🟠 WARNING:', message);
      if (data) console.warn(data);
    }
  },
  
  info: (message: string, data?: unknown) => {
    if (typeof window !== 'undefined') {
      console.info('🔵 INFO:', message);
      if (data) console.info(data);
    }
  },
  
  debug: (message: string, data?: unknown) => {
    if (typeof window !== 'undefined') {
      console.debug('🟢 DEBUG:', message);
      if (data) console.debug(data);
    }
  }
};

/**
 * Error boundary for catching and logging React errors
 */
export function withErrorLogging<T extends (...args: unknown[]) => ReturnType<T>>(
  fn: T,
  componentName: string
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>) => {
    try {
      return fn(...args);
    } catch (error) {
      logger.error(`Error in ${componentName}:`, error);
      throw error;
    }
  };
} 