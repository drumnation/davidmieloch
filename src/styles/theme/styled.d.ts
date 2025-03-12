import 'styled-components'
import { baseTokens, lightTheme } from './tokens'

type BaseTokens = typeof baseTokens
type Theme = typeof lightTheme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
} 