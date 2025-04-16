# Theme Context Flow Diagram

```mermaid
graph TD
    subgraph "ThemeContext Structure"
        ThemeCtx[ThemeContext<br/>colorScheme: 'dark' | 'light'<br/>toggleColorScheme: () => void]
    end

    subgraph "Provider Implementation"
        ThemeProvider[ThemeProvider]
        ThemeProvider --> MantineProvider
        ThemeProvider --> StyledThemeProvider
        ThemeProvider --> ThemeCtxProvider[ThemeContext.Provider]
        MantineProvider --> ClientOnly
    end

    subgraph "App Structure"
        App[App]
        App --> ClientProviders
        ClientProviders --> ReduxProvider
        ReduxProvider --> ThemeProviderInstance[ThemeProvider]
        App --> ClientLayout
        ClientLayout --> ThemeProviderInstance2[ThemeProvider]
    end

    subgraph "Components Using Theme"
        Header[Header Component]
        Footer[Footer Component]
        SystemArch[SystemArchitectureSection]
        
        Footer --> useThemeFooter[useTheme()<br/>from ThemeContext]
        Header --> useThemeHeader[useTheme()<br/>from ThemeProvider]
        SystemArch --> useThemeFromStyled[useTheme()<br/>from styled-components]
    end

    ThemeProvider --> ClientLayout
    ThemeCtxProvider --> useThemeFooter
    ThemeProvider --> useThemeHeader
    StyledThemeProvider --> useThemeFromStyled
```

## Theme Implementation Details

The theme system consists of multiple interconnected parts:

1. **ThemeContext (src/contexts/ThemeContext.tsx)**
   - Simple context with `colorScheme` and `toggleColorScheme`
   - Used by some components via `useTheme` hook

2. **ThemeProvider (src/providers/ThemeProvider.tsx)**
   - Main theme provider component 
   - Manages theme state with useState
   - Wraps children with:
     - StyledThemeProvider (styled-components)
     - MantineProvider (Mantine UI)
     - ThemeContext.Provider (custom context)
   - Provides a `useTheme` hook that uses ThemeContext

3. **MantineProvider (src/providers/MantineProvider.tsx)**
   - Wrapper for Mantine UI's provider
   - Configures Mantine theme settings

4. **ClientOnly**
   - Utility to prevent hydration mismatch
   - Only renders content after client-side mount

## Usage Points

The theme context is used in several places:

1. **Footer**: Uses `useTheme` from ThemeContext to get `colorScheme`
2. **Header**: Uses `useTheme` from ThemeProvider
3. **SystemArchitectureSection**: Uses styled-components' `useTheme`

## Issues and Observations

1. There appears to be overlapping theme implementations:
   - Styled Components theme
   - Mantine theme
   - Custom theme context

2. The ThemeProvider is used twice in the app structure:
   - Once in ClientProviders
   - Once in ClientLayout

3. The theme toggle functionality exists but is only using 'light' mode 