'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

// This ensures consistent class names between server and client
const shouldForwardProp = (prop: string) => {
  return !prop.startsWith('$') && !prop.startsWith('as')
}

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  // If we're on the client, render children with StyleSheetManager to ensure consistent class names
  if (typeof window !== 'undefined') {
    return (
      <StyleSheetManager shouldForwardProp={shouldForwardProp} enableVendorPrefixes>
        {children}
      </StyleSheetManager>
    )
  }

  // If we're on the server, use the StyleSheetManager to collect styles
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