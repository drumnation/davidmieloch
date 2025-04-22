import 'styled-components';
import { MantineTheme } from '@mantine/core';

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends MantineTheme { }
} 