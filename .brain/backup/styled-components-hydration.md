# Handling Hydration Errors with Next.js and Styled Components

This document provides a comprehensive guide on how to prevent and solve hydration errors when using styled-components with Next.js.

## What are Hydration Errors?

Hydration is the process where React attaches event listeners to server-rendered HTML, transforming static content into a fully interactive application. Hydration errors occur when the DOM structure or content on the client doesn't match what was rendered on the server.

Common hydration error with styled-components in Next.js:
```
Warning: Prop `className` did not match. Server: "sc-dQmhJc bhtCIJ" Client: "sc-dmyDGi hdipVs"
```

## Solutions Implemented in This Project

### 1. Next.js Compiler for Styled Components

We've enabled the built-in styled-components compiler in Next.js by adding the following to `next.config.ts`:

```javascript
const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
};
```

This configuration enables:
- Server-side rendering of styled-components
- Consistent class name generation between server and client
- Automatic vendor prefixing
- Smaller bundle size
- Faster compilation

### 2. Styled Components Registry for App Router

For the App Router, we've implemented a styled-components registry in `src/app/registry.tsx` that:
- Collects styles during server rendering
- Injects them properly before any content that might use them
- Uses `shouldForwardProp` to ensure consistent class names

```javascript
'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

const shouldForwardProp = (prop: string) => {
  return !prop.startsWith('$') && !prop.startsWith('as')
}

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') {
    return (
      <StyleSheetManager shouldForwardProp={shouldForwardProp} enableVendorPrefixes>
        {children}
      </StyleSheetManager>
    )
  }

  return (
    <StyleSheetManager 
      sheet={styledComponentsStyleSheet.instance} 
      shouldForwardProp={shouldForwardProp}
      enableVendorPrefixes
    >
      {children}
    </StyleSheetManager>
  )
}
```

### 3. Custom Document for Pages Router

For the Pages Router, we've created a custom `_document.tsx` file to handle server-side styled-components rendering:

```javascript
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    
    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => 
          sheet.collectStyles(<App {...props} />),
      });
      
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add your global fonts or meta tags here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

### 4. ClientOnly Component for Browser-Only Code

We've created a `ClientOnly` component and HOC in `src/utils/client-only.tsx` to handle browser-only code properly:

```javascript
'use client';

import { useEffect, useState, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? children : fallback;
}

export function withClientOnly<P extends object>(Component: React.ComponentType<P>) {
  return function WithClientOnly(props: P & { fallback?: ReactNode }) {
    const { fallback, ...rest } = props;
    
    return (
      <ClientOnly fallback={fallback}>
        <Component {...rest as P} />
      </ClientOnly>
    );
  };
}
```

Use this component to wrap any component that uses browser-only APIs:

```javascript
<ClientOnly>
  <ComponentThatUsesBrowserAPIs />
</ClientOnly>
```

## Important Note on Babel vs. SWC

Initially, we tried using a custom Babel configuration (`.babelrc`) for styled-components, but we encountered a conflict with Next.js's font system (`next/font`). The font system requires Next.js's SWC compiler, which is disabled when a custom Babel configuration is present.

We resolved this by:
1. Removing the `.babelrc` file
2. Using Next.js's built-in styled-components support via the SWC compiler

This approach provides better performance and compatibility with all Next.js features.

## Best Practices for Preventing Hydration Errors

1. **Avoid Browser APIs in Render Logic**
   - Don't use `window`, `document`, or `localStorage` directly in component rendering
   - Use the `ClientOnly` component for browser-specific code

2. **Ensure Consistent HTML Structure**
   - Avoid invalid HTML nesting that browsers might auto-correct
   - Be careful with conditional rendering that might differ between server and client

3. **Handle Inevitable Differences**
   - For content that will unavoidably differ (like timestamps), use the `suppressHydrationWarning` prop:
   ```jsx
   <span suppressHydrationWarning>
     Current time: {new Date().toLocaleTimeString()}
   </span>
   ```

4. **Use Dynamic Imports for Client-Only Components**
   - For components that should only render on the client:
   ```javascript
   import dynamic from 'next/dynamic'
   
   const ClientOnlyComponent = dynamic(
     () => import('../components/ClientComponent'),
     { ssr: false }
   )
   ```

## Troubleshooting

If you still encounter hydration errors:

1. Check browser console for specific mismatch details
2. Verify that all components using browser APIs are wrapped with `ClientOnly`
3. Ensure that any randomized content or date generation is handled properly
4. Check for external modifications by browser extensions or CDN optimization features
5. Verify that the styled-components registry is properly set up and used

## References

- [Next.js Documentation on Hydration Errors](https://nextjs.org/docs/messages/react-hydration-error)
- [Next.js Documentation on CSS-in-JS](https://nextjs.org/docs/app/building-your-application/styling/css-in-js)
- [Next.js Documentation on SWC](https://nextjs.org/docs/architecture/nextjs-compiler)
- [Next.js Documentation on Font Loader Conflict](https://nextjs.org/docs/messages/babel-font-loader-conflict)
- [Styled Components Documentation](https://styled-components.com/docs/advanced) 