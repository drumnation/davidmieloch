import Clarity from '@microsoft/clarity';

// Define the clarity configuration type
interface ClarityConfig {
  projectId: string;
  upload?: string;
  delay?: number;
  track?: boolean;
  content?: boolean;
  cookies?: boolean;
  lean?: boolean;
  regions?: boolean;
}

// Default configuration
const defaultConfig: ClarityConfig = {
  projectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '',
  upload: 'https://www.clarity.ms/collect',
  delay: 500,
  track: true,
  content: true
};

/**
 * Initialize Microsoft Clarity analytics
 * @param config Optional override configuration
 * @returns boolean indicating if initialization was successful
 */
export const initClarity = (config: Partial<ClarityConfig> = {}): boolean => {
  try {
    // Only initialize in the browser and when projectId is available
    if (typeof window === 'undefined' || !defaultConfig.projectId) {
      return false;
    }
    
    // Merge default config with any overrides
    const finalConfig = { ...defaultConfig, ...config };
    
    // Initialize Clarity
    Clarity.init(finalConfig.projectId);
    
    console.log('Microsoft Clarity initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize Microsoft Clarity:', error);
    return false;
  }
};

/**
 * Set a custom tag in Clarity
 * @param key Tag key
 * @param value Tag value
 */
export const setTag = (key: string, value: string | string[]): void => {
  try {
    if (typeof window !== 'undefined') {
      Clarity.setTag(key, value);
    }
  } catch (error) {
    console.error('Failed to set Clarity tag:', error);
  }
};

/**
 * Track a custom event in Clarity
 * @param eventName Name of the event
 */
export const trackEvent = (eventName: string): void => {
  try {
    if (typeof window !== 'undefined') {
      Clarity.event(eventName);
    }
  } catch (error) {
    console.error('Failed to track Clarity event:', error);
  }
};

/**
 * Set user consent for Clarity tracking
 * @param hasConsent Whether user has given consent
 */
export const setConsent = (hasConsent: boolean = true): void => {
  try {
    if (typeof window !== 'undefined') {
      Clarity.consent(hasConsent);
    }
  } catch (error) {
    console.error('Failed to set Clarity consent:', error);
  }
};

/**
 * Identify a user in Clarity
 * @param customId Unique identifier for the user
 * @param customSessionId Optional custom session ID
 * @param customPageId Optional custom page ID
 * @param friendlyName Optional friendly name for the user
 */
export const identifyUser = (
  customId: string,
  customSessionId?: string,
  customPageId?: string,
  friendlyName?: string
): void => {
  try {
    if (typeof window !== 'undefined') {
      Clarity.identify(customId, customSessionId, customPageId, friendlyName);
    }
  } catch (error) {
    console.error('Failed to identify user in Clarity:', error);
  }
};

/**
 * Upgrade the current session priority in Clarity
 * @param reason Reason for the upgrade
 */
export const upgradeSession = (reason: string): void => {
  try {
    if (typeof window !== 'undefined') {
      Clarity.upgrade(reason);
    }
  } catch (error) {
    console.error('Failed to upgrade Clarity session:', error);
  }
}; 