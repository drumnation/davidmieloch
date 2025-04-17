const path = require('path');

/** @type {import('@storybook/nextjs').StorybookConfig} */
const config = {
  "stories": [
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/shared-components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/components/Diagrams/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/utils/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/providers/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/contexts/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {
      "nextConfigPath": path.resolve(__dirname, "../next.config.js"),
      "builder": {
        "useSWC": true
      }
    }
  },
  "staticDirs": [
    "../public"
  ],
  "typescript": {
    "reactDocgen": "react-docgen-typescript",
    "reactDocgenTypescriptOptions": {
      "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true
      }
    }
  },
  "docs": {
    "autodocs": false
  },
  "babel": {
    "plugins": [
      [
        "babel-plugin-styled-components",
        {
          "ssr": true,
          "displayName": true,
          "fileName": false,
          "meaninglessFileNames": ["index", "styles"],
          "minify": false,
          "pure": true,
          "transpileTemplateLiterals": false,
          "namespace": "sc"
        }
      ]
    ]
  },
  "core": {
    "disableTelemetry": true,
  },
  "webpackFinal": async (config) => {
    if (!config.resolve) {
      config.resolve = {};
    }
    
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }
    
    // --------------------------------------------------------------------------
    // Comprehensive Next.js App Router Mocking
    // --------------------------------------------------------------------------
    
    // Mock Next.js modules
    config.resolve.alias = {
      ...config.resolve.alias,
      
      // Next.js navigation module mocks - handle all possible import paths
      'next/navigation': path.resolve(__dirname, './nextjs-mock-module.js'),
      'next/router': path.resolve(__dirname, './nextjs-mock-module.js'),
      
      // Handle direct route imports
      'next/dist/client/router': path.resolve(__dirname, './nextjs-mock-module.js'),
      'next/dist/shared/lib/router/utils/resolve-href': path.resolve(__dirname, './nextjs-mock-module.js'),
      
      // Handle Mantine-specific imports that use Next.js App Router
      '@mantine/next': path.resolve(__dirname, './mantine-mocks.js'),
      
      // Mock router imports used by Mantine
      '@mantine/router': path.resolve(__dirname, './router-mock.js'),
      'react-router': path.resolve(__dirname, './router-mock.js'),
      'react-router-dom': path.resolve(__dirname, './router-mock.js'),
      
      // For Link components
      'next/link': path.resolve(__dirname, './nextjs-mock-module.js'),
      
      // Mock problematic components
      '../app/Header': path.resolve(__dirname, './header-mock.js'),
      '../../app/Header': path.resolve(__dirname, './header-mock.js'),
      '../app/layout': path.resolve(__dirname, './header-mock.js'),
      '../../app/layout': path.resolve(__dirname, './header-mock.js'),
      
      // Path aliases matching your project configuration
      '@components': path.resolve(__dirname, '../src/components'),
      '@shared-components': path.resolve(__dirname, '../src/shared-components'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@types': path.resolve(__dirname, '../src/types'),
      '@store': path.resolve(__dirname, '../src/store'),
      '@providers': path.resolve(__dirname, '../src/providers'),
      '@data': path.resolve(__dirname, '../src/data'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@contexts': path.resolve(__dirname, '../src/contexts'),
      '@analytics': path.resolve(__dirname, '../src/analytics'),
    };
    
    // --------------------------------------------------------------------------
    // Additional Webpack Optimizations
    // --------------------------------------------------------------------------
    
    // Add global definitions to help with conditional imports
    config.plugins = config.plugins || [];
    const { DefinePlugin } = require('webpack');
    config.plugins.push(
      new DefinePlugin({
        'process.env.STORYBOOK': JSON.stringify(true),
        'process.env.NEXT_PUBLIC_IS_STORYBOOK': JSON.stringify(true),
        // Prevent NextJS from complaining about missing process.env
        'process.env.__NEXT_SCROLL_RESTORATION': JSON.stringify(false),
        'process.env.__NEXT_TRAILING_SLASH': JSON.stringify(false),
        'process.env.__NEXT_CROSS_ORIGIN': JSON.stringify(''),
      })
    );
    
    // Check if we need to disable HMR (to prevent infinite reloading)
    const disableHMR = process.env.STORYBOOK_DISABLE_HMR === 'true' || process.env.CI;
    
    // Remove HMR plugin if specified
    if (disableHMR && config.plugins) {
      console.log('⚠️ HMR is disabled to prevent infinite reloading');
      config.plugins = config.plugins.filter(
        plugin => plugin && plugin.constructor && plugin.constructor.name !== 'HotModuleReplacementPlugin'
      );
    }
    
    return config;
  }
};

module.exports = config; 