import type { StorybookConfig } from "@storybook/nextjs";
import path from 'path';

const config: StorybookConfig = {
  "stories": [
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
    "options": {}
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
  }
};

export default config;