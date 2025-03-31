import { identifyUser, setConsent, setTag, trackEvent, upgradeSession } from '../analytics';

/**
 * Test utility to demonstrate the different Clarity analytics features
 * This is for development/testing purposes only
 */
export const testClarityFeatures = () => {
  // Only run in development environment
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.log('Testing Microsoft Clarity features...');

  // Set user consent
  setConsent(true);
  console.log('Set user consent: true');

  // Set custom tags
  setTag('page_type', 'home');
  setTag('user_role', 'visitor');
  setTag('features_enabled', ['dark_mode', 'notifications']);
  console.log('Set custom tags: page_type, user_role, features_enabled');

  // Track custom events
  trackEvent('page_viewed');
  console.log('Tracked event: page_viewed');

  // Identify user (using a test ID)
  identifyUser('test-user-123');
  console.log('Identified user: test-user-123');

  // Upgrade session
  upgradeSession('testing clarity features');
  console.log('Upgraded session priority');

  console.log('All Clarity features tested successfully!');
};

export default testClarityFeatures; 