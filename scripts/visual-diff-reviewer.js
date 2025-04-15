#!/usr/bin/env node

/**
 * Visual Diff Reviewer Script
 * 
 * This script helps you review visual changes detected by snapshot tests.
 * Run this after a failed commit to get a summary of what components changed.
 * 
 * Usage:
 *   node scripts/visual-diff-reviewer.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Config
const SNAPSHOTS_DIR = '__snapshots__';
const FAILED_TESTS_LOG = '.failed-snapshots.json';

/**
 * Run the visual diff test and capture the output
 */
function runVisualDiffTest() {
  console.log('📸 Running snapshot tests to detect visual changes...\n');
  
  try {
    execSync('pnpm test:visual-diff', { stdio: 'inherit' });
    console.log('✅ All snapshot tests passed! No visual changes detected.');
    return [];
  } catch (error) {
    // If tests fail, that's expected - we're looking for differences
    console.log('\n🔍 Found visual differences in components. Analyzing...\n');
    
    // Parse test output to find which tests failed
    const failedTests = parseFailedTests();
    return failedTests;
  }
}

/**
 * Parse which tests failed from the test output
 */
function parseFailedTests() {
  // This is a simplified version - in reality, we'd parse the test output
  // But for now, we'll run a more detailed test to get component names

  try {
    // Run a more verbose test to get failed component names and save to temp file
    execSync('npx vitest --config vitest.config.snapshot.ts --run --reporter=json > .failed-tests-output.json', { stdio: 'pipe' });
    
    // Read and parse the output
    const testOutput = JSON.parse(fs.readFileSync('.failed-tests-output.json', 'utf8'));
    
    // Clean up temp file
    fs.unlinkSync('.failed-tests-output.json');
    
    // Extract failed tests from the output
    const failedTests = [];
    
    // Process test results to find failed snapshots
    testOutput.testResults.forEach(fileResult => {
      fileResult.assertionResults.forEach(testResult => {
        if (testResult.status === 'failed' && testResult.failureMessages.some(msg => msg.includes('snapshot'))) {
          // Extract component name from test path
          const testPath = fileResult.name;
          const componentMatch = testPath.match(/\/([^\/]+)\.(test|spec|stories)\.(tsx?|jsx?)$/);
          const componentName = componentMatch ? componentMatch[1] : path.basename(testPath);
          
          failedTests.push({
            component: componentName,
            testName: testResult.title,
            testPath: testPath
          });
        }
      });
    });
    
    // Save the failed tests for future reference
    fs.writeFileSync(FAILED_TESTS_LOG, JSON.stringify(failedTests, null, 2));
    
    return failedTests;
  } catch (error) {
    console.error('Error analyzing test failures:', error.message);
    return [];
  }
}

/**
 * Display a summary of visual changes
 */
function displayChangeSummary(failedTests) {
  if (failedTests.length === 0) {
    return;
  }
  
  console.log('📊 Visual Change Summary:');
  console.log('=========================\n');
  
  // Group by component
  const componentGroups = {};
  
  failedTests.forEach(test => {
    if (!componentGroups[test.component]) {
      componentGroups[test.component] = [];
    }
    componentGroups[test.component].push(test);
  });
  
  // Display each component's changes
  Object.keys(componentGroups).forEach(component => {
    console.log(`🔸 ${component}:`);
    componentGroups[component].forEach(test => {
      console.log(`   - ${test.testName}`);
    });
    console.log('');
  });
  
  // Show instructions for updating
  console.log('\n🛠️  What to do next:');
  console.log('1. Review the changes in the components listed above');
  console.log('2. If the changes are intentional, update snapshots:');
  console.log('   pnpm test:update-all');
  console.log('3. If changes are unintentional, fix the issues in the components');
  console.log('4. Commit your changes when ready\n');
}

/**
 * Main function
 */
function main() {
  console.log('🧐 Visual Diff Reviewer');
  console.log('======================\n');
  
  // Check if we have recent failed tests to avoid running tests again
  let failedTests = [];
  
  if (fs.existsSync(FAILED_TESTS_LOG)) {
    try {
      const stats = fs.statSync(FAILED_TESTS_LOG);
      const fileAge = (Date.now() - stats.mtimeMs) / 1000 / 60; // in minutes
      
      // If the failed tests log is less than 5 minutes old, use it
      if (fileAge < 5) {
        failedTests = JSON.parse(fs.readFileSync(FAILED_TESTS_LOG, 'utf8'));
        console.log('📋 Using recent test results...\n');
      } else {
        // Otherwise run the tests again
        failedTests = runVisualDiffTest();
      }
    } catch (error) {
      // If there's an error reading the file, run tests again
      failedTests = runVisualDiffTest();
    }
  } else {
    // No failed tests log, run tests
    failedTests = runVisualDiffTest();
  }
  
  // Display summary of changes
  displayChangeSummary(failedTests);
}

// Run the script
main(); 