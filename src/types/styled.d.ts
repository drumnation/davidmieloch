import 'styled-components';
import { MantineTheme } from '@mantine/core';

declare module 'styled-components' {
    // Disable the rule here as modifying the interface breaks compatibility
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends MantineTheme { }
} 