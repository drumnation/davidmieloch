 12:41:19 PM in david-monorepo-stable on  c444036 [$✘»!+?] via ⬢ v23.10.0 took 13.1s ➜ pnpm tsc --noEmit
- [ ] src/components/Cards/CapabilityCard.styles.ts:24:48 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

24   color: ${props => props.theme.colors.primary.main};
                                                  ~~~~

- [ ] src/components/Cards/CapabilityCard.styles.ts:34:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

34   color: ${props => props.theme.colors.text.primary};
                                               ~~~~~~~

- [ ] src/components/Cards/CapabilityCard.styles.ts:40:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

40   color: ${props => props.theme.colors.text.secondary};
                                               ~~~~~~~~~

- [ ] src/components/Diagrams/_wrappers/DiagramClientWrapper/DiagramClientWrapper.styles.ts:22:47 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

22     color: ${({ theme }) => theme.colors.text.primary || '#333'};
                                                 ~~~~~~~

- [ ] src/components/Diagrams/_wrappers/DiagramClientWrapper/DiagramClientWrapper.styles.ts:28:47 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

28     color: ${({ theme }) => theme.colors.text.secondary || '#666'};
                                                 ~~~~~~~~~

- [ ] src/components/Diagrams/AiIntegrationProcessDiagram/AiIntegrationProcessDiagram.styles.ts:13:47 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

13     color: ${({ theme }) => theme.colors.text.primary || '#333'};
                                                 ~~~~~~~

- [ ] src/components/Diagrams/AiIntegrationProcessDiagram/AiIntegrationProcessDiagram.styles.ts:18:47 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

18     color: ${({ theme }) => theme.colors.text.secondary || '#666'};
                                                 ~~~~~~~~~

- [ ] src/shared-components/organisms/ChallengeBreakdown/ChallengeBreakdown.tsx:86:8 - error TS2769: No overload matches this call.
  Overload 1 of 2, '(props: PolymorphicComponentProps<"web", Substitute<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, { $variant: "default" | "primary" | "secondary"; $position?: "center" | ... 3 more ... | undefined; }>, void, void, {}, {}>): Element', gave the following error.
    Property '$variant' is missing in type '{ children: Element; $position: "center" | "left" | "right" | "full-width"; }' but required in type 'FastOmit<Substitute<Substitute<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, { $variant: "default" | "primary" | "secondary"; $position?: "center" | ... 3 more ... | undefined; }>, FastOmit<...>>, keyof ExecutionProps>'.
  Overload 2 of 2, '(props: Substitute<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, { $variant: "default" | "primary" | "secondary"; $position?: "center" | ... 3 more ... | undefined; }>): ReactNode', gave the following error.
    Property '$variant' is missing in type '{ children: Element; $position: "center" | "left" | "right" | "full-width"; }' but required in type '{ $variant: "default" | "primary" | "secondary"; $position?: "center" | "left" | "right" | "full-width" | undefined; }'.

86       <Container $position={position}>
          ~~~~~~~~~

  src/shared-components/organisms/ChallengeBreakdown/ChallengeBreakdown.styles.ts:15:3
    15   $variant: 'primary' | 'secondary' | 'default';
         ~~~~~~~~
    '$variant' is declared here.
  src/shared-components/organisms/ChallengeBreakdown/ChallengeBreakdown.styles.ts:15:3
    15   $variant: 'primary' | 'secondary' | 'default';
         ~~~~~~~~
    '$variant' is declared here.

- [ ] src/shared-components/organisms/ChallengeBreakdown/ChallengeBreakdown.tsx:87:21 - error TS2769: No overload matches this call.
  Overload 1 of 2, '(props: PolymorphicComponentProps<"web", Substitute<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, StyledProps>, void, void, {}, {}>): Element', gave the following error.
    Type '{ children: Element; $styleType: "gradient-card" | "accent-card" | "challenge-cards"; }' is not assignable to type 'IntrinsicAttributes & FastOmit<Substitute<Substitute<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, StyledProps>, FastOmit<...>>, keyof ExecutionProps> & FastOmit<...> & { ...; }'.
      Property '$styleType' does not exist on type 'IntrinsicAttributes & FastOmit<Substitute<Substitute<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, StyledProps>, FastOmit<...>>, keyof ExecutionProps> & FastOmit<...> & { ...; }'. Did you mean 'styleType'?
  Overload 2 of 2, '(props: Substitute<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, StyledProps>): ReactNode', gave the following error.
    Type '{ children: Element; $styleType: "gradient-card" | "accent-card" | "challenge-cards"; }' is not assignable to type 'IntrinsicAttributes & FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof StyledProps> & StyledProps'.
      Property '$styleType' does not exist on type 'IntrinsicAttributes & FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof StyledProps> & StyledProps'. Did you mean 'styleType'?

87         <StyledCard $styleType={style}>
                       ~~~~~~~~~~


src/shared-components/organisms/RepoGrid/RepoGrid.styles.ts:19:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

19   color: ${({ theme }) => theme.colors.text.secondary};
                                               ~~~~~~~~~

src/shared-components/organisms/RepoGrid/RepoGrid.styles.ts:27:48 - error TS2339: Property 'dark' does not exist on type 'MantineColorsTuple'.

27   color: ${({ theme }) => theme.colors.primary.dark};
                                                  ~~~~

src/shared-components/organisms/RepoGrid/RepoGrid.styles.ts:35:53 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

35   background: ${({ theme }) => theme.colors.primary.main};
                                                       ~~~~

src/shared-components/organisms/RepoGrid/RepoGrid.styles.ts:38:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

38   border-radius: ${({ theme }) => theme.borderRadius.md};
                                           ~~~~~~~~~~~~

src/shared-components/organisms/RepoGrid/RepoGrid.styles.ts:44:55 - error TS2339: Property 'dark' does not exist on type 'MantineColorsTuple'.

44     background: ${({ theme }) => theme.colors.primary.dark};
                                                         ~~~~

src/shared-components/organisms/RepoGrid/RepoGrid.styles.ts:64:46 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

64     ${({ theme }) => theme.colors.background.light} 8%,
                                                ~~~~~

src/shared-components/organisms/RepoGrid/RepoGrid.styles.ts:65:46 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

65     ${({ theme }) => theme.colors.background.paper} 18%,
                                                ~~~~~

src/shared-components/organisms/RepoGrid/RepoGrid.styles.ts:66:46 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

66     ${({ theme }) => theme.colors.background.light} 33%
                                                ~~~~~

src/shared-components/organisms/RepoGrid/RepoGrid.styles.ts:68:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

68   border-radius: ${({ theme }) => theme.borderRadius.lg};
                                           ~~~~~~~~~~~~

src/shared-components/organisms/SolutionCards/SolutionCards.tsx:20:58 - error TS2339: Property 'blue' does not exist on type 'MantineColorsTuple'.

20   background-color: ${({ theme }) => theme.colors.accent.blue};
                                                            ~~~~

src/shared-components/organisms/SolutionCards/SolutionCards.tsx:27:54 - error TS2339: Property 'blue' does not exist on type 'MantineColorsTuple'.

27     background: ${({ theme }) => theme.colors.accent.blue};
                                                        ~~~~

src/shared-components/organisms/SolutionCards/SolutionCards.tsx:32:60 - error TS2339: Property 'blue' does not exist on type 'MantineColorsTuple'.

32     background-color: ${({ theme }) => theme.colors.accent.blue};
                                                              ~~~~

src/shared-components/organisms/StatsComparison/StatsComparison.styles.ts:55:52 - error TS2339: Property 'blue' does not exist on type 'MantineColorsTuple'.

55   background: ${({ theme }) => theme.colors.accent.blue};
                                                      ~~~~

src/shared-components/organisms/StatsComparison/StatsComparison.styles.ts:59:39 - error TS2339: Property 'blue' does not exist on type 'MantineColorsTuple'.

59     background: ${theme.colors.accent.blue};
                                         ~~~~

src/shared-components/organisms/StatsComparison/StatsComparison.styles.ts:64:39 - error TS2339: Property 'blue' does not exist on type 'MantineColorsTuple'.

64     background: ${theme.colors.accent.blue};
                                         ~~~~

src/shared-components/organisms/StatsComparison/StatsComparison.styles.ts:69:39 - error TS2339: Property 'blue' does not exist on type 'MantineColorsTuple'.

69     background: ${theme.colors.accent.blue};
                                         ~~~~

src/shared-components/organisms/SuccessStory/SuccessStory.styles.ts:61:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

61   color: ${props => props.theme.colors.text.primary};
                                               ~~~~~~~

src/shared-components/organisms/SuccessStory/SuccessStory.styles.ts:78:50 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

78     color: ${props => props.theme.colors.primary.main};
                                                    ~~~~

src/shared-components/organisms/SuccessStory/SuccessStory.styles.ts:90:28 - error TS2345: Argument of type '(props: ExecutionContext & FastOmit<DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>, never>) => MantineColorsTuple' is not assignable to parameter of type 'Interpolation<FastOmit<DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>, never>>'.
  Type '(props: ExecutionContext & FastOmit<DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>, never>) => MantineColorsTuple' is not assignable to type 'StyleFunction<FastOmit<DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>, never>>'.
    Type 'MantineColorsTuple' is not assignable to type 'Interpolation<FastOmit<DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>, never>>'.
      Type 'readonly [string, string, string, string, string, string, string, string, string, string, ...string[]]' is not assignable to type 'StyledObject<FastOmit<DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>, never>>'.
        Types of property 'filter' are incompatible.
          Type '{ <S extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): S[]; (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[]; }' is not assignable to type 'Filter | undefined'.

90   border-left: 3px solid ${props => props.theme.colors.primary};
                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/organisms/SuccessStory/SuccessStory.styles.ts:91:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

91   color: ${props => props.theme.colors.text.secondary};
                                               ~~~~~~~~~

src/shared-components/pages/BestPractices/BestPractices.styles.ts:281:62 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

281   background-color: ${({ theme }) => theme.colors.background.light};
                                                                 ~~~~~

src/shared-components/pages/BestPractices/BestPractices.styles.ts:295:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

295   color: ${({ theme }) => theme.colors.text.primary};
                                                ~~~~~~~

src/shared-components/pages/BestPractices/BestPractices.styles.ts:300:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

300   color: ${({ theme }) => theme.colors.text.secondary};
                                                ~~~~~~~~~

src/shared-components/pages/BestPractices/BestPractices.styles.ts:319:62 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

319   background-color: ${({ theme }) => theme.colors.background.light};
                                                                 ~~~~~

src/shared-components/pages/BestPractices/BestPractices.styles.ts:323:64 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

323     background-color: ${({ theme }) => theme.colors.background.paper};
                                                                   ~~~~~

src/shared-components/pages/BestPractices/BestPractices.styles.ts:331:17 - error TS2345: Argument of type '({ theme }: ExecutionContext & FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>) => MantineColorsTuple' is not assignable to parameter of type 'Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
  Type '({ theme }: ExecutionContext & FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>) => MantineColorsTuple' is not assignable to type 'StyleFunction<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
    Type 'MantineColorsTuple' is not assignable to type 'Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
      Type 'readonly [string, string, string, string, string, string, string, string, string, string, ...string[]]' is not assignable to type 'StyledObject<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
        Types of property 'filter' are incompatible.
          Type '{ <S extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): S[]; (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[]; }' is not assignable to type 'Filter | undefined'.

331   background: ${({ theme }) => theme.colors.gradient};
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/BestPractices/BestPractices.styles.ts:346:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

346   color: ${({ theme }) => theme.colors.text.primary};
                                                ~~~~~~~

src/shared-components/pages/BestPractices/BestPractices.styles.ts:352:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

352   color: ${({ theme }) => theme.colors.text.secondary};
                                                ~~~~~~~~~

src/shared-components/pages/BestPractices/BestPractices.styles.ts:364:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

364   color: ${({ theme }) => theme.colors.text.primary};
                                                ~~~~~~~

src/shared-components/pages/BestPractices/BestPractices.styles.ts:371:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

371   color: ${({ theme }) => theme.colors.text.secondary};
                                                ~~~~~~~~~

src/shared-components/pages/BestPractices/BestPractices.styles.ts:378:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

378   color: ${({ theme }) => theme.colors.text.secondary};
                                                ~~~~~~~~~

src/shared-components/pages/BestPractices/BestPractices.styles.ts:389:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

389   color: ${({ theme }) => theme.colors.text.primary};
                                                ~~~~~~~

src/shared-components/pages/BestPractices/BestPractices.styles.ts:396:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

396   color: ${({ theme }) => theme.colors.text.secondary};
                                                ~~~~~~~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.styles.ts:10:33 - error TS2339: Property 'colorScheme' does not exist on type 'MantineTheme'.

10   const isDark = theme && theme.colorScheme === 'dark';
                                   ~~~~~~~~~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:54:68 - error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.

54       className={cx(classes.detailedContentContainer, className, { [classes.visible]: isVisible })}
                                                                      ~~~~~~~~~~~~~~~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:56:8 - error TS2322: Type '{ children: Element[]; id: string; style: { scrollMarginTop: string; }; component: string; mb: string; }' is not assignable to type '{ component: ElementType<any, keyof IntrinsicElements>; renderRoot?: ((props: Record<string, any>) => any) | undefined; }'.
  Types of property 'component' are incompatible.
    Type 'string' is not assignable to type 'ElementType<any, keyof IntrinsicElements>'.

56       <Box {...sectionProps('bp-intro-modern')}>
          ~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:57:54 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

57         <Group align="center" gap="md" wrap="nowrap" className={classes.titleWrapper}>
                                                        ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & GroupProps & RefAttributes<HTMLDivElement> & { component?: any; renderRoot?: ((props: Record<string, any>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:58:16 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

58           <Box className={classes.sectionIcon}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:61:28 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

61           <Title order={2} className={classes.detailedContentTitle}>Modern React and React Native Best Practices</Title>
                              ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TitleProps & RefAttributes<HTMLHeadingElement> & { component?: any; renderRoot?: ((props: Record<...>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:63:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

63         <Text className={classes.detailedContentText}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:69:8 - error TS2322: Type '{ children: Element[]; id: string; style: { scrollMarginTop: string; }; component: string; mb: string; }' is not assignable to type '{ component: ElementType<any, keyof IntrinsicElements>; renderRoot?: ((props: Record<string, any>) => any) | undefined; }'.
  Types of property 'component' are incompatible.
    Type 'string' is not assignable to type 'ElementType<any, keyof IntrinsicElements>'.

69       <Box {...sectionProps('bp-intro-enterprise')}>
          ~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:70:54 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

70         <Group align="center" gap="md" wrap="nowrap" className={classes.titleWrapper}>
                                                        ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & GroupProps & RefAttributes<HTMLDivElement> & { component?: any; renderRoot?: ((props: Record<string, any>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:71:16 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

71           <Box className={classes.sectionIcon}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:74:28 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

74           <Title order={2} className={classes.detailedContentTitle}>Accelerating Enterprise Development</Title>
                              ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TitleProps & RefAttributes<HTMLHeadingElement> & { component?: any; renderRoot?: ((props: Record<...>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:76:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

76         <Text className={classes.detailedContentText}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:85:8 - error TS2322: Type '{ children: Element[]; id: string; style: { scrollMarginTop: string; }; component: string; mb: string; }' is not assignable to type '{ component: ElementType<any, keyof IntrinsicElements>; renderRoot?: ((props: Record<string, any>) => any) | undefined; }'.
  Types of property 'component' are incompatible.
    Type 'string' is not assignable to type 'ElementType<any, keyof IntrinsicElements>'.

85       <Box {...sectionProps('bp-intro-components')}>
          ~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:86:54 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

86         <Group align="center" gap="md" wrap="nowrap" className={classes.titleWrapper}>
                                                        ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & GroupProps & RefAttributes<HTMLDivElement> & { component?: any; renderRoot?: ((props: Record<string, any>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:87:16 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

87           <Box className={classes.sectionIcon}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:90:28 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

90           <Title order={2} className={classes.detailedContentTitle}>Component Architecture</Title>
                              ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TitleProps & RefAttributes<HTMLHeadingElement> & { component?: any; renderRoot?: ((props: Record<...>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:92:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

92         <Text className={classes.detailedContentText}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:98:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

98         <Text className={classes.detailedContentText}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:103:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

103         <Text className={classes.detailedContentText}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:111:8 - error TS2322: Type '{ children: Element[]; id: string; style: { scrollMarginTop: string; }; component: string; mb: string; }' is not assignable to type '{ component: ElementType<any, keyof IntrinsicElements>; renderRoot?: ((props: Record<string, any>) => any) | undefined; }'.
  Types of property 'component' are incompatible.
    Type 'string' is not assignable to type 'ElementType<any, keyof IntrinsicElements>'.

111       <Box {...sectionProps('bp-intro-typescript')}>
           ~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:112:54 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

112         <Group align="center" gap="md" wrap="nowrap" className={classes.titleWrapper}>
                                                         ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & GroupProps & RefAttributes<HTMLDivElement> & { component?: any; renderRoot?: ((props: Record<string, any>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:113:16 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

113           <Box className={classes.sectionIcon}>
                   ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:116:28 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

116           <Title order={2} className={classes.detailedContentTitle}>TypeScript Best Practices</Title>
                               ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TitleProps & RefAttributes<HTMLHeadingElement> & { component?: any; renderRoot?: ((props: Record<...>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:118:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

118         <Text className={classes.detailedContentText}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:122:14 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

122         <Box className={classes.detailedContentList}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:134:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

134         <Text className={classes.detailedContentText}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:142:8 - error TS2322: Type '{ children: Element[]; id: string; style: { scrollMarginTop: string; }; component: string; mb: string; }' is not assignable to type '{ component: ElementType<any, keyof IntrinsicElements>; renderRoot?: ((props: Record<string, any>) => any) | undefined; }'.
  Types of property 'component' are incompatible.
    Type 'string' is not assignable to type 'ElementType<any, keyof IntrinsicElements>'.

142       <Box {...sectionProps('bp-intro-testing')}>
           ~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:143:54 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

143         <Group align="center" gap="md" wrap="nowrap" className={classes.titleWrapper}>
                                                         ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & GroupProps & RefAttributes<HTMLDivElement> & { component?: any; renderRoot?: ((props: Record<string, any>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:144:16 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

144           <Box className={classes.sectionIcon}>
                   ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:147:28 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

147           <Title order={2} className={classes.detailedContentTitle}>Testing Strategy</Title>
                               ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TitleProps & RefAttributes<HTMLHeadingElement> & { component?: any; renderRoot?: ((props: Record<...>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:149:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

149         <Text className={classes.detailedContentText}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:153:14 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

153         <Box className={classes.detailedContentList}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:165:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

165         <Text className={classes.detailedContentText}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:172:8 - error TS2322: Type '{ children: Element[]; id: string; style: { scrollMarginTop: string; }; component: string; mb: string; }' is not assignable to type '{ component: ElementType<any, keyof IntrinsicElements>; renderRoot?: ((props: Record<string, any>) => any) | undefined; }'.
  Types of property 'component' are incompatible.
    Type 'string' is not assignable to type 'ElementType<any, keyof IntrinsicElements>'.

172       <Box {...sectionProps('bp-intro-storybook')}>
           ~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:173:54 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

173         <Group align="center" gap="md" wrap="nowrap" className={classes.titleWrapper}>
                                                         ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & GroupProps & RefAttributes<HTMLDivElement> & { component?: any; renderRoot?: ((props: Record<string, any>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:174:16 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

174           <Box className={classes.sectionIcon}>
                   ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:177:28 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

177           <Title order={2} className={classes.detailedContentTitle}>Component Documentation with Storybook</Title>
                               ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TitleProps & RefAttributes<HTMLHeadingElement> & { component?: any; renderRoot?: ((props: Record<...>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:179:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

179         <Text className={classes.detailedContentText}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:183:14 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

183         <Box className={classes.detailedContentList}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:195:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

195         <Text className={classes.detailedContentText}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:201:8 - error TS2322: Type '{ children: Element[]; id: string; style: { scrollMarginTop: string; }; component: string; mb: string; }' is not assignable to type '{ component: ElementType<any, keyof IntrinsicElements>; renderRoot?: ((props: Record<string, any>) => any) | undefined; }'.
  Types of property 'component' are incompatible.
    Type 'string' is not assignable to type 'ElementType<any, keyof IntrinsicElements>'.

201       <Box {...sectionProps('bp-intro-bottleneck')}>
           ~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:202:14 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

202         <Box className={classes.titleWrapper}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:203:16 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

203           <Box className={classes.sectionIcon}>
                   ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:206:28 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

206           <Title order={2} className={classes.detailedContentTitle}>Escaping the 'Shared Library' Bottleneck</Title>
                               ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TitleProps & RefAttributes<HTMLHeadingElement> & { component?: any; renderRoot?: ((props: Record<...>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:208:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

208         <Text className={classes.detailedContentText}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:212:14 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

212         <Box className={classes.detailedContentList}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:224:21 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

224         <Code block className={classes.codeBlock}>
                        ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & CodeProps & RefAttributes<HTMLElement> & { component?: any; renderRoot?: ((props: Record<string, any>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:239:8 - error TS2322: Type '{ children: Element[]; id: string; style: { scrollMarginTop: string; }; component: string; mb: string; }' is not assignable to type '{ component: ElementType<any, keyof IntrinsicElements>; renderRoot?: ((props: Record<string, any>) => any) | undefined; }'.
  Types of property 'component' are incompatible.
    Type 'string' is not assignable to type 'ElementType<any, keyof IntrinsicElements>'.

239       <Box {...sectionProps('bp-intro-quality')}>
           ~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:240:14 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

240         <Box className={classes.titleWrapper}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:241:16 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

241           <Box className={classes.sectionIcon}>
                   ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:244:28 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

244           <Title order={2} className={classes.detailedContentTitle}>Code Quality and Consistency</Title>
                               ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TitleProps & RefAttributes<HTMLHeadingElement> & { component?: any; renderRoot?: ((props: Record<...>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:246:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

246         <Text className={classes.detailedContentText}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:250:14 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

250         <Box className={classes.detailedContentList}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:262:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

262         <Text className={classes.detailedContentText}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:270:8 - error TS2322: Type '{ children: Element[]; id: string; style: { scrollMarginTop: string; }; component: string; mb: string; }' is not assignable to type '{ component: ElementType<any, keyof IntrinsicElements>; renderRoot?: ((props: Record<string, any>) => any) | undefined; }'.
  Types of property 'component' are incompatible.
    Type 'string' is not assignable to type 'ElementType<any, keyof IntrinsicElements>'.

270       <Box {...sectionProps('bp-intro-dev-env')}>
           ~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:271:14 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

271         <Box className={classes.titleWrapper}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:272:16 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

272           <Box className={classes.sectionIcon}>
                   ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:275:28 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

275           <Title order={2} className={classes.detailedContentTitle}>Development Environment Setup</Title>
                               ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TitleProps & RefAttributes<HTMLHeadingElement> & { component?: any; renderRoot?: ((props: Record<...>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:277:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

277         <Text className={classes.detailedContentText}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:281:14 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

281         <Box className={classes.detailedContentList}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:293:21 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

293         <Code block className={classes.codeBlock}>
                        ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & CodeProps & RefAttributes<HTMLElement> & { component?: any; renderRoot?: ((props: Record<string, any>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:305:8 - error TS2322: Type '{ children: Element[]; id: string; style: { scrollMarginTop: string; }; component: string; mb: string; }' is not assignable to type '{ component: ElementType<any, keyof IntrinsicElements>; renderRoot?: ((props: Record<string, any>) => any) | undefined; }'.
  Types of property 'component' are incompatible.
    Type 'string' is not assignable to type 'ElementType<any, keyof IntrinsicElements>'.

305       <Box {...sectionProps('bp-intro-performance')}>
           ~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:306:14 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

306         <Box className={classes.titleWrapper}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:307:16 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

307           <Box className={classes.sectionIcon}>
                   ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:310:28 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

310           <Title order={2} className={classes.detailedContentTitle}>Performance Optimization</Title>
                               ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TitleProps & RefAttributes<HTMLHeadingElement> & { component?: any; renderRoot?: ((props: Record<...>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:312:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

312         <Text className={classes.detailedContentText}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:316:14 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

316         <Box className={classes.detailedContentList}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:328:21 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

328         <Code block className={classes.codeBlock}>
                        ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & CodeProps & RefAttributes<HTMLElement> & { component?: any; renderRoot?: ((props: Record<string, any>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:344:8 - error TS2322: Type '{ children: Element[]; id: string; style: { scrollMarginTop: string; }; component: string; mb: string; }' is not assignable to type '{ component: ElementType<any, keyof IntrinsicElements>; renderRoot?: ((props: Record<string, any>) => any) | undefined; }'.
  Types of property 'component' are incompatible.
    Type 'string' is not assignable to type 'ElementType<any, keyof IntrinsicElements>'.

344       <Box {...sectionProps('bp-intro-deps')}>
           ~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:345:14 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

345         <Box className={classes.titleWrapper}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:346:16 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

346           <Box className={classes.sectionIcon}>
                   ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:349:28 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

349           <Title order={2} className={classes.detailedContentTitle}>Dependency Management</Title>
                               ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TitleProps & RefAttributes<HTMLHeadingElement> & { component?: any; renderRoot?: ((props: Record<...>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:351:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

351         <Text className={classes.detailedContentText}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:355:14 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

355         <Box className={classes.detailedContentList}>
                 ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & BoxComponentProps & ComponentProp<"div"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "component" | keyof BoxComponentProps> & { ...; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:367:21 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

367         <Code block className={classes.codeBlock}>
                        ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & CodeProps & RefAttributes<HTMLElement> & { component?: any; renderRoot?: ((props: Record<string, any>) => ReactNode) | undefined; }'

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:376:8 - error TS2322: Type '{ children: Element; id: string; style: { scrollMarginTop: string; }; component: string; mb: string; }' is not assignable to type '{ component: ElementType<any, keyof IntrinsicElements>; renderRoot?: ((props: Record<string, any>) => any) | undefined; }'.
  Types of property 'component' are incompatible.
    Type 'string' is not assignable to type 'ElementType<any, keyof IntrinsicElements>'.

376       <Box {...sectionProps('bp-intro-summary')}>
           ~~~

src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:377:15 - error TS2322: Type 'CSSProperties & Record<string, any>' is not assignable to type 'string | undefined'.

377         <Text className={classes.detailedContentText}>
                  ~~~~~~~~~

  ../node_modules/.pnpm/@mantine+core@7.17.4_@mantine+hooks@7.17.4_react@18.3.1__@types+react@18.3.20_react-dom_5332d198173501f5b77c1a860c727f5f/node_modules/@mantine/core/lib/core/Box/Box.d.ts:8:5
    8     className?: string;
          ~~~~~~~~~
    The expected type comes from property 'className' which is declared here on type 'IntrinsicAttributes & TextProps & ComponentProp<"p"> & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref">, "component" | keyof TextProps> & { ...; }'

src/shared-components/pages/BestPractices/components/index.ts:7:3 - error TS2305: Module '"./DetailedContent/DetailedContent.styles"' has no exported member 'DetailedContentContainer'.

7   DetailedContentContainer,
    ~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/BestPractices/components/index.ts:8:3 - error TS2305: Module '"./DetailedContent/DetailedContent.styles"' has no exported member 'DetailedContentTitle'.

8   DetailedContentTitle,
    ~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/BestPractices/components/index.ts:9:3 - error TS2305: Module '"./DetailedContent/DetailedContent.styles"' has no exported member 'DetailedContentText'.

9   DetailedContentText,
    ~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/BestPractices/components/index.ts:10:3 - error TS2305: Module '"./DetailedContent/DetailedContent.styles"' has no exported member 'DetailedContentList'.

10   DetailedContentList,
     ~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/BestPractices/components/index.ts:11:3 - error TS2305: Module '"./DetailedContent/DetailedContent.styles"' has no exported member 'TitleWrapper'.

11   TitleWrapper,
     ~~~~~~~~~~~~

src/shared-components/pages/BestPractices/components/index.ts:12:3 - error TS2305: Module '"./DetailedContent/DetailedContent.styles"' has no exported member 'SectionIcon'.

12   SectionIcon,
     ~~~~~~~~~~~

src/shared-components/pages/BestPractices/components/index.ts:13:3 - error TS2305: Module '"./DetailedContent/DetailedContent.styles"' has no exported member 'SectionSubtitle'.

13   SectionSubtitle,
     ~~~~~~~~~~~~~~~

src/shared-components/pages/BestPractices/components/index.ts:14:3 - error TS2305: Module '"./DetailedContent/DetailedContent.styles"' has no exported member 'TextContent'.

14   TextContent,
     ~~~~~~~~~~~

src/shared-components/pages/BestPractices/components/index.ts:15:3 - error TS2305: Module '"./DetailedContent/DetailedContent.styles"' has no exported member 'ListContent'.

15   ListContent,
     ~~~~~~~~~~~

src/shared-components/pages/BestPractices/components/index.ts:16:3 - error TS2305: Module '"./DetailedContent/DetailedContent.styles"' has no exported member 'ListItem'.

16   ListItem,
     ~~~~~~~~

src/shared-components/pages/BestPractices/components/index.ts:17:3 - error TS2305: Module '"./DetailedContent/DetailedContent.styles"' has no exported member 'CodeBlock'.

17   CodeBlock,
     ~~~~~~~~~

src/shared-components/pages/BestPractices/components/index.ts:18:3 - error TS2305: Module '"./DetailedContent/DetailedContent.styles"' has no exported member 'IconWrapper'.

18   IconWrapper,
     ~~~~~~~~~~~

src/shared-components/pages/BestPractices/components/index.ts:19:3 - error TS2305: Module '"./DetailedContent/DetailedContent.styles"' has no exported member 'TitleWithIconWrapper'.

19   TitleWithIconWrapper
     ~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/BestPractices/components/index.ts:23:10 - error TS2305: Module '"./DetailedContent/DetailedContent.styles"' has no exported member 'SectionTitle'.

23 export { SectionTitle as DetailedSectionTitle } from './DetailedContent/DetailedContent.styles';
            ~~~~~~~~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:278:17 - error TS2345: Argument of type '({ theme }: ExecutionContext & FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, never>) => MantineColorsTuple' is not assignable to parameter of type 'Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, never>>'.
  Type '({ theme }: ExecutionContext & FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, never>) => MantineColorsTuple' is not assignable to type 'StyleFunction<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, never>>'.
    Type 'MantineColorsTuple' is not assignable to type 'Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, never>>'.
      Type 'readonly [string, string, string, string, string, string, string, string, string, string, ...string[]]' is not assignable to type 'StyledObject<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, never>>'.
        Types of property 'filter' are incompatible.
          Type '{ <S extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): S[]; (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[]; }' is not assignable to type 'Filter | undefined'.

278   background: ${({ theme }) => theme.colors.gradient};
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:291:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

291   color: ${({ theme }) => theme.colors.text.secondary};
                                                ~~~~~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:306:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

306   color: ${({ theme }) => theme.colors.text.primary};
                                                ~~~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:323:50 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

323     color: ${({ theme }) => theme.colors.primary.main};
                                                     ~~~~

src/shared-components/pages/Bio/Bio.styles.ts:334:48 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

334   color: ${({ theme }) => theme.colors.primary.main};
                                                   ~~~~

src/shared-components/pages/Bio/Bio.styles.ts:356:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

356   border-radius: ${({ theme }) => theme.borderRadius.lg};
                                            ~~~~~~~~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:370:56 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

370   background: ${({ theme }) => theme.colors.background.paper};
                                                           ~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:371:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

371   color: ${({ theme }) => theme.colors.text.primary};
                                                ~~~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:377:56 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

377   background: ${({ theme }) => theme.colors.background.paper};
                                                           ~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:378:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

378   color: ${({ theme }) => theme.colors.text.secondary};
                                                ~~~~~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:400:48 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

400   color: ${({ theme }) => theme.colors.primary.main};
                                                   ~~~~

src/shared-components/pages/Bio/Bio.styles.ts:406:64 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

406   border-left: 4px solid ${({ theme }) => theme.colors.primary.main};
                                                                   ~~~~

src/shared-components/pages/Bio/Bio.styles.ts:409:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

409   color: ${({ theme }) => theme.colors.text.secondary};
                                                ~~~~~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:425:19 - error TS2345: Argument of type '({ theme }: ExecutionContext & FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>) => MantineColorsTuple' is not assignable to parameter of type 'Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
  Type '({ theme }: ExecutionContext & FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>) => MantineColorsTuple' is not assignable to type 'StyleFunction<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
    Type 'MantineColorsTuple' is not assignable to type 'Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
      Type 'readonly [string, string, string, string, string, string, string, string, string, string, ...string[]]' is not assignable to type 'StyledObject<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
        Types of property 'filter' are incompatible.
          Type '{ <S extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): S[]; (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[]; }' is not assignable to type 'Filter | undefined'.

425     background: ${({ theme }) => theme.colors.gradient};
                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:448:56 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

448   background: ${({ theme }) => theme.colors.background.paper};
                                                           ~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:449:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

449   border-radius: ${({ theme }) => theme.borderRadius.md};
                                            ~~~~~~~~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:468:53 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

468   background: ${({ theme }) => theme.colors.primary.main};
                                                        ~~~~

src/shared-components/pages/Bio/Bio.styles.ts:478:48 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

478   color: ${({ theme }) => theme.colors.primary.main};
                                                   ~~~~

src/shared-components/pages/Bio/Bio.styles.ts:491:56 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

491   background: ${({ theme }) => theme.colors.background.paper};
                                                           ~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:492:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

492   color: ${({ theme }) => theme.colors.text.primary};
                                                ~~~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:494:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

494   border-radius: ${({ theme }) => theme.borderRadius.md};
                                            ~~~~~~~~~~~~

src/shared-components/pages/Bio/Bio.styles.ts:503:55 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

503     background: ${({ theme }) => theme.colors.primary.main};
                                                          ~~~~

src/shared-components/pages/Bio/Bio.tsx:182:8 - error TS2322: Type '{ title: string; subtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; pattern: "none"; textColor: "light"; animation: "fade-up"; className: string; onImageLoad: (() => void) | undefined; }' is not assignable to type 'HeroProps'.
  Types of property 'animation' are incompatible.
    Type '"fade-up"' is not assignable to type 'AnimationType | undefined'.

182       <Hero {...heroProps} />
           ~~~~

src/shared-components/pages/Bio/components/BioIntro/BioIntro.styles.ts:8:50 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

8     color: ${({ theme }) => theme.colors.primary.main};
                                                   ~~~~

src/shared-components/pages/Bio/components/BioIntro/BioIntro.styles.ts:14:47 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

14     color: ${({ theme }) => theme.colors.text.secondary};
                                                 ~~~~~~~~~

src/shared-components/pages/Bio/components/BioIntro/BioIntro.styles.ts:21:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

21   color: ${({ theme }) => theme.colors.text.primary};
                                               ~~~~~~~

src/shared-components/pages/Bio/components/BioIntro/BioIntro.styles.ts:27:50 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

27     color: ${({ theme }) => theme.colors.primary.main};
                                                    ~~~~

src/shared-components/pages/Bio/components/TechnicalExpertise/TechnicalExpertise.styles.ts:17:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

17   color: ${({ theme }) => theme.colors.text.secondary};
                                               ~~~~~~~~~

src/shared-components/pages/Bio/components/TechnicalExpertise/TechnicalExpertise.styles.ts:43:56 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

43   background: ${({ theme }) => theme.colors.background.light};
                                                          ~~~~~

src/shared-components/pages/Bio/components/TechnicalExpertise/TechnicalExpertise.styles.ts:44:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

44   color: ${({ theme }) => theme.colors.text.primary};
                                               ~~~~~~~

src/shared-components/pages/Bio/components/TechnicalExpertise/TechnicalExpertise.styles.ts:52:55 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

52     background: ${({ theme }) => theme.colors.primary.main};
                                                         ~~~~

src/shared-components/pages/Bio/components/Testimonials/Testimonials.styles.ts:13:47 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

13     color: ${({ theme }) => theme.colors.text.primary} !important; // Set color to primary text
                                                 ~~~~~~~

src/shared-components/pages/Bio/components/Testimonials/Testimonials.styles.ts:25:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

25   color: ${({ theme }) => theme.colors.text.primary};
                                               ~~~~~~~

src/shared-components/pages/Bio/components/Testimonials/Testimonials.styles.ts:37:66 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

37   border-bottom: 2px solid ${({ theme }) => theme.colors.primary.light};
                                                                    ~~~~~

src/shared-components/pages/Bio/components/Testimonials/Testimonials.styles.ts:49:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

49   color: ${({ theme }) => theme.colors.text.primary}; // Change icon color to primary text (black/dark grey)
                                               ~~~~~~~

src/shared-components/pages/Bio/components/Testimonials/Testimonials.styles.ts:59:48 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

59   color: ${({ theme }) => theme.colors.primary.main}; // Keep category title blue (primary color)
                                                  ~~~~

src/shared-components/pages/Bio/components/Testimonials/Testimonials.styles.ts:73:56 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

73   background: ${({ theme }) => theme.colors.background.light};
                                                          ~~~~~

src/shared-components/pages/Bio/components/Testimonials/Testimonials.styles.ts:104:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

104   color: ${({ theme }) => theme.colors.text.primary};
                                                ~~~~~~~

src/shared-components/pages/Bio/components/Testimonials/Testimonials.styles.ts:107:64 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

107   border-left: 3px solid ${({ theme }) => theme.colors.primary.light};
                                                                   ~~~~~

src/shared-components/pages/Bio/components/Testimonials/Testimonials.styles.ts:121:48 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

121   color: ${({ theme }) => theme.colors.primary.main};
                                                   ~~~~

src/shared-components/pages/Bio/components/Testimonials/Testimonials.styles.ts:128:50 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

128     color: ${({ theme }) => theme.colors.primary.main};
                                                     ~~~~

src/shared-components/pages/Bio/components/Testimonials/Testimonials.styles.ts:135:47 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

135     color: ${({ theme }) => theme.colors.text.secondary};
                                                  ~~~~~~~~~

src/shared-components/pages/CodeExamples/CodeExamples.styles.ts:22:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

22   color: ${({ theme }) => theme.colors.text.primary};
                                               ~~~~~~~

src/shared-components/pages/CodeExamples/CodeExamples.styles.ts:28:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

28   color: ${({ theme }) => theme.colors.text.secondary};
                                               ~~~~~~~~~

src/shared-components/pages/CodeExamples/CodeExamples.styles.ts:41:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

41   color: ${({ theme }) => theme.colors.text.primary};
                                               ~~~~~~~

src/shared-components/pages/CodeExamples/components/GitHubPortfolioTemplate/GitHubPortfolioTemplate.styles.ts:36:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

36   color: ${({ theme }) => theme.colors.text.primary};
                                               ~~~~~~~

src/shared-components/pages/CodeExamples/components/GitHubPortfolioTemplate/GitHubPortfolioTemplate.styles.ts:46:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

46   color: ${({ theme }) => theme.colors.text.secondary};
                                               ~~~~~~~~~

src/shared-components/pages/CodeExamples/components/GitHubPortfolioTemplate/GitHubPortfolioTemplate.styles.ts:110:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

110   color: ${({ theme }) => theme.colors.text.secondary};
                                                ~~~~~~~~~

src/shared-components/pages/CodeExamples/components/GitHubPortfolioTemplate/GitHubPortfolioTemplate.styles.ts:115:59 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

115   background-color: ${({ theme }) => theme.colors.primary.main};
                                                              ~~~~

src/shared-components/pages/CodeExamples/components/GitHubPortfolioTemplate/GitHubPortfolioTemplate.styles.ts:116:45 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

116   color: ${({ theme }) => theme.colors.text.light};
                                                ~~~~~

src/shared-components/pages/CodeExamples/components/GitHubPortfolioTemplate/GitHubPortfolioTemplate.styles.ts:118:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

118   border-radius: ${({ theme }) => theme.borderRadius.md};
                                            ~~~~~~~~~~~~

src/shared-components/pages/CodeExamples/components/GitHubPortfolioTemplate/GitHubPortfolioTemplate.styles.ts:125:61 - error TS2339: Property 'dark' does not exist on type 'MantineColorsTuple'.

125     background-color: ${({ theme }) => theme.colors.primary.dark};
                                                                ~~~~

src/shared-components/pages/CodeExamples/components/GitHubPortfolioTemplate/GitHubPortfolioTemplate.styles.ts:132:62 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

132   background-color: ${({ theme }) => theme.colors.background.light};
                                                                 ~~~~~

src/shared-components/pages/CodeExamples/components/GitHubPortfolioTemplate/GitHubPortfolioTemplate.styles.ts:133:58 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

133   border: 1px solid ${({ theme }) => theme.colors.border.light};
                                                             ~~~~~

src/shared-components/pages/CodeExamples/components/GitHubPortfolioTemplate/GitHubPortfolioTemplate.styles.ts:140:47 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

140     color: ${({ theme }) => theme.colors.text.secondary};
                                                  ~~~~~~~~~

src/shared-components/pages/Experience/components/SkillsSection/SkillsSection.styles.ts:50:62 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

50   background-color: ${({ theme }) => theme.colors.background.paper || '#f5f5f5'};
                                                                ~~~~~

src/shared-components/pages/Experience/Experience.tsx:283:11 - error TS2322: Type '{ onImageLoad: (() => void) | undefined; title?: string | undefined; mobileTitle?: string | undefined; desktopTitle?: string | undefined; subtitle?: string | undefined; mobileSubtitle?: string | undefined; ... 25 more ...; hideBlurSquareDesktop?: boolean | undefined; }' is not assignable to type 'IntrinsicAttributes & HeroProps'.
  Property 'onImageLoad' does not exist on type 'IntrinsicAttributes & HeroProps'.

283           onImageLoad={onReady}
              ~~~~~~~~~~~

src/shared-components/pages/Home/Home.tsx:86:34 - error TS2322: Type '{ onImageLoad: (() => void) | undefined; title: string; desktopSubtitle: string; mobileSubtitle: string; tagline: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; textColor: "light"; animation: "fade-up"; cta: { ...; }; }' is not assignable to type 'IntrinsicAttributes & HeroProps'.
  Property 'onImageLoad' does not exist on type 'IntrinsicAttributes & HeroProps'.

86             <Hero {...heroProps} onImageLoad={onReady} />
                                    ~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiAutopilotAnalogy/AiAutopilotAnalogy.logic.tsx:271:7 - error TS2322: Type '"fade-up"' is not assignable to type 'AnimationType | undefined'.

271   let animation: HeroProps['animation'] = 'fade-up'; // Default
          ~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiAutopilotAnalogy/AiAutopilotAnalogy.logic.tsx:273:5 - error TS2820: Type '"fade-in"' is not assignable to type 'AnimationType | undefined'. Did you mean '"fadeIn"'?

273     'fade-in',
        ~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiAutopilotAnalogy/AiAutopilotAnalogy.logic.tsx:274:5 - error TS2322: Type '"fade-up"' is not assignable to type 'AnimationType | undefined'.

274     'fade-up',
        ~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiAutopilotAnalogy/AiAutopilotAnalogy.logic.tsx:275:5 - error TS2322: Type '"slide-in-left"' is not assignable to type 'AnimationType | undefined'.

275     'slide-in-left',
        ~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiAutopilotAnalogy/AiAutopilotAnalogy.logic.tsx:276:5 - error TS2322: Type '"slide-in-right"' is not assignable to type 'AnimationType | undefined'.

276     'slide-in-right',
        ~~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiAutopilotAnalogy/AiAutopilotAnalogy.logic.tsx:285:5 - error TS2322: Type '"slide-in-left"' is not assignable to type 'AnimationType | undefined'.

285     animation = 'slide-in-left';
        ~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiAutopilotAnalogy/AiAutopilotAnalogy.logic.tsx:296:45 - error TS2339: Property 'pattern' does not exist on type 'HeroProps'.

296     pattern: heroProps.pattern as HeroProps['pattern'],
                                                ~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.logic.tsx:41:36 - error TS2322: Type '{ quotes: ({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]; layout: "3-column"; className: string; }' is not assignable to type 'QuoteGridProps'.
  Types of property 'quotes' are incompatible.
    Type '({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]' is not assignable to type 'Quote[]'.
      Type '{ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; }' is not assignable to type 'Quote'.
        Type '{ text: string; author: string; icon: string; note?: undefined; }' is not assignable to type 'Quote'.
          Types of property 'icon' are incompatible.
            Type 'string' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.

41 export const enhanceQuotesProps = (quotesProps: AiSkepticToExpertProps['quotesProps'] = defaultContent.quotes): QuoteGridProps => {
                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.logic.tsx:45:5 - error TS2322: Type '{ quotes: ({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]; layout: "3-column"; className: string; }' is not assignable to type 'QuoteGridProps'.
  Types of property 'quotes' are incompatible.
    Type '({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]' is not assignable to type 'Quote[]'.
      Type '{ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; }' is not assignable to type 'Quote'.
        Type '{ text: string; author: string; icon: string; note?: undefined; }' is not assignable to type 'Quote'.
          Types of property 'icon' are incompatible.
            Type 'string' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.

45     quotesProps = defaultContent.quotes;
       ~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.logic.tsx:51:21 - error TS18048: 'quotesProps' is possibly 'undefined'.

51       className: `${quotesProps.className || ''} mb-0`, // No margin needed with the new container
                       ~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.logic.tsx:52:15 - error TS18048: 'quotesProps' is possibly 'undefined'.

52       quotes: quotesProps.quotes.map(quote => {
                 ~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.logic.tsx:66:15 - error TS18048: 'quotesProps' is possibly 'undefined'.

66       layout: quotesProps.layout === 'grid' ? '3-column' : quotesProps.layout || '3-column',
                 ~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.logic.tsx:66:15 - error TS2367: This comparison appears to be unintentional because the types '"3-column" | "2-column" | undefined' and '"grid"' have no overlap.

66       layout: quotesProps.layout === 'grid' ? '3-column' : quotesProps.layout || '3-column',
                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.logic.tsx:66:60 - error TS18048: 'quotesProps' is possibly 'undefined'.

66       layout: quotesProps.layout === 'grid' ? '3-column' : quotesProps.layout || '3-column',
                                                              ~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.logic.tsx:98:45 - error TS2322: Type '{ hero: { title: string; subtitle: string; background: "image"; backgroundImage: string; textColor: "light"; className: string; pattern: "none"; backgroundOverlay: boolean; overlayOpacity: number; onImageLoad: () => void; }; quotes: { ...; }; problemSolutions: { ...; }; }' is not assignable to type '{ hero: HeroProps; quotes: QuoteGridProps; servicesCards?: { title: string; description: string; cards: any[]; } | undefined; }'.
  The types of 'quotes.quotes' are incompatible between these types.
    Type '({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]' is not assignable to type 'Quote[]'.
      Type '{ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; }' is not assignable to type 'Quote'.
        Type '{ text: string; author: string; icon: string; note?: undefined; }' is not assignable to type 'Quote'.
          Types of property 'icon' are incompatible.
            Type 'string' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.

98 export const useAiSkepticToExpertLogic = ({ content = defaultContent, onImageLoad }: AiSkepticToExpertProps) => {
                                               ~~~~~~~

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.stories.tsx:36:3 - error TS2322: Type '{ heroProps: { title: string; subtitle: string; background: "image"; backgroundImage: string; textColor: "light"; className: string; pattern: "none"; backgroundOverlay: boolean; overlayOpacity: number; onImageLoad: () => void; }; quotesProps: { ...; }; problemSolutionCardsProps: { ...; }; }' is not assignable to type 'Partial<{ id?: string | undefined; className?: string | undefined; onReady?: (() => void) | undefined; heroProps?: HeroProps | undefined; quotesProps?: QuoteGridProps | undefined; problemSolutionCardsProps?: { ...; } | undefined; content?: { ...; } | undefined; onImageLoad?: (() => void) | undefined; }> & { ...; }'.
  Type '{ heroProps: { title: string; subtitle: string; background: "image"; backgroundImage: string; textColor: "light"; className: string; pattern: "none"; backgroundOverlay: boolean; overlayOpacity: number; onImageLoad: () => void; }; quotesProps: { ...; }; problemSolutionCardsProps: { ...; }; }' is not assignable to type 'Partial<{ id?: string | undefined; className?: string | undefined; onReady?: (() => void) | undefined; heroProps?: HeroProps | undefined; quotesProps?: QuoteGridProps | undefined; problemSolutionCardsProps?: { ...; } | undefined; content?: { ...; } | undefined; onImageLoad?: (() => void) | undefined; }>'.
    The types of 'quotesProps.quotes' are incompatible between these types.
      Type '({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]' is not assignable to type 'Quote[]'.
        Type '{ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; }' is not assignable to type 'Quote'.
          Type '{ text: string; author: string; icon: string; note?: undefined; }' is not assignable to type 'Quote'.
            Types of property 'icon' are incompatible.
              Type 'string' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.

36   args: defaultArgs,
     ~~~~

  ../node_modules/.pnpm/@storybook+core@8.6.12_storybook@8.6.12/node_modules/@storybook/core/dist/csf/index.d.ts:533:5
    533     args?: Partial<TArgs>;
            ~~~~
    The expected type comes from property 'args' which is declared here on type 'StoryAnnotations<ReactRenderer, { id?: string | undefined; className?: string | undefined; onReady?: (() => void) | undefined; heroProps?: HeroProps | undefined; quotesProps?: QuoteGridProps | undefined; problemSolutionCardsProps?: { ...; } | undefined; content?: { ...; } | undefined; onImageLoad?: (() => void) | un...'

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.stories.tsx:44:3 - error TS2322: Type '{ heroProps: { title: string; subtitle: string; background: "image"; backgroundImage: string; textColor: "light"; className: string; pattern: "none"; backgroundOverlay: boolean; overlayOpacity: number; onImageLoad: () => void; }; quotesProps: { ...; }; problemSolutionCardsProps: { ...; }; }' is not assignable to type 'Partial<{ id?: string | undefined; className?: string | undefined; onReady?: (() => void) | undefined; heroProps?: HeroProps | undefined; quotesProps?: QuoteGridProps | undefined; problemSolutionCardsProps?: { ...; } | undefined; content?: { ...; } | undefined; onImageLoad?: (() => void) | undefined; }> & { ...; }'.
  Type '{ heroProps: { title: string; subtitle: string; background: "image"; backgroundImage: string; textColor: "light"; className: string; pattern: "none"; backgroundOverlay: boolean; overlayOpacity: number; onImageLoad: () => void; }; quotesProps: { ...; }; problemSolutionCardsProps: { ...; }; }' is not assignable to type 'Partial<{ id?: string | undefined; className?: string | undefined; onReady?: (() => void) | undefined; heroProps?: HeroProps | undefined; quotesProps?: QuoteGridProps | undefined; problemSolutionCardsProps?: { ...; } | undefined; content?: { ...; } | undefined; onImageLoad?: (() => void) | undefined; }>'.
    The types of 'quotesProps.quotes' are incompatible between these types.
      Type '({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]' is not assignable to type 'Quote[]'.
        Type '{ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; }' is not assignable to type 'Quote'.
          Type '{ text: string; author: string; icon: string; note?: undefined; }' is not assignable to type 'Quote'.
            Types of property 'icon' are incompatible.
              Type 'string' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.

44   args: defaultArgs,
     ~~~~

  ../node_modules/.pnpm/@storybook+core@8.6.12_storybook@8.6.12/node_modules/@storybook/core/dist/csf/index.d.ts:533:5
    533     args?: Partial<TArgs>;
            ~~~~
    The expected type comes from property 'args' which is declared here on type 'StoryAnnotations<ReactRenderer, { id?: string | undefined; className?: string | undefined; onReady?: (() => void) | undefined; heroProps?: HeroProps | undefined; quotesProps?: QuoteGridProps | undefined; problemSolutionCardsProps?: { ...; } | undefined; content?: { ...; } | undefined; onImageLoad?: (() => void) | un...'

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.stories.tsx:58:3 - error TS2322: Type '{ heroProps: { title: string; subtitle: string; background: "image"; backgroundImage: string; textColor: "light"; className: string; pattern: "none"; backgroundOverlay: boolean; overlayOpacity: number; onImageLoad: () => void; }; quotesProps: { ...; }; problemSolutionCardsProps: { ...; }; }' is not assignable to type 'Partial<{ id?: string | undefined; className?: string | undefined; onReady?: (() => void) | undefined; heroProps?: HeroProps | undefined; quotesProps?: QuoteGridProps | undefined; problemSolutionCardsProps?: { ...; } | undefined; content?: { ...; } | undefined; onImageLoad?: (() => void) | undefined; }> & { ...; }'.
  Type '{ heroProps: { title: string; subtitle: string; background: "image"; backgroundImage: string; textColor: "light"; className: string; pattern: "none"; backgroundOverlay: boolean; overlayOpacity: number; onImageLoad: () => void; }; quotesProps: { ...; }; problemSolutionCardsProps: { ...; }; }' is not assignable to type 'Partial<{ id?: string | undefined; className?: string | undefined; onReady?: (() => void) | undefined; heroProps?: HeroProps | undefined; quotesProps?: QuoteGridProps | undefined; problemSolutionCardsProps?: { ...; } | undefined; content?: { ...; } | undefined; onImageLoad?: (() => void) | undefined; }>'.
    The types of 'quotesProps.quotes' are incompatible between these types.
      Type '({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]' is not assignable to type 'Quote[]'.
        Type '{ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; }' is not assignable to type 'Quote'.
          Type '{ text: string; author: string; icon: string; note?: undefined; }' is not assignable to type 'Quote'.
            Types of property 'icon' are incompatible.
              Type 'string' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.

58   args: defaultArgs,
     ~~~~

  ../node_modules/.pnpm/@storybook+core@8.6.12_storybook@8.6.12/node_modules/@storybook/core/dist/csf/index.d.ts:533:5
    533     args?: Partial<TArgs>;
            ~~~~
    The expected type comes from property 'args' which is declared here on type 'StoryAnnotations<ReactRenderer, { id?: string | undefined; className?: string | undefined; onReady?: (() => void) | undefined; heroProps?: HeroProps | undefined; quotesProps?: QuoteGridProps | undefined; problemSolutionCardsProps?: { ...; } | undefined; content?: { ...; } | undefined; onImageLoad?: (() => void) | un...'

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.tsx:38:41 - error TS2345: Argument of type 'QuoteGridProps | { quotes: ({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]; layout: "3-column"; className: string; }' is not assignable to parameter of type 'QuoteGridProps | undefined'.
  Type '{ quotes: ({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]; layout: "3-column"; className: string; }' is not assignable to type 'QuoteGridProps'.
    Types of property 'quotes' are incompatible.
      Type '({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]' is not assignable to type 'Quote[]'.
        Type '{ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; }' is not assignable to type 'Quote'.
          Type '{ text: string; author: string; icon: string; note?: undefined; }' is not assignable to type 'Quote'.
            Types of property 'icon' are incompatible.
              Type 'string' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.

38     const enhanced = enhanceQuotesProps(quotesProps);
                                           ~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.tsx:69:94 - error TS2353: Object literal may only specify known properties, and 'textTransform' does not exist in type '{ uppercase?: boolean | undefined; }'.

69           <ContentSection title="The Reality of AI Tools in Development Teams" titleStyle={{ textTransform: 'uppercase' }}>
                                                                                                ~~~~~~~~~~~~~

  src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/components/ContentSection/ContentSection.tsx:8:3
    8   titleStyle?: {
        ~~~~~~~~~~
    The expected type comes from property 'titleStyle' which is declared here on type 'IntrinsicAttributes & ContentSectionProps'

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.tsx:117:27 - error TS2353: Object literal may only specify known properties, and 'textTransform' does not exist in type '{ uppercase?: boolean | undefined; }'.

117             titleStyle={{ textTransform: 'uppercase' }}
                              ~~~~~~~~~~~~~

  src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/components/ProblemSolutionSection/ProblemSolutionSection.tsx:19:3
    19   titleStyle?: {
         ~~~~~~~~~~
    The expected type comes from property 'titleStyle' which is declared here on type 'IntrinsicAttributes & ProblemSolutionSectionProps'

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/components/QuotesSection/QuotesSection.stories.tsx:13:37 - error TS2345: Argument of type '{ quotes: ({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]; layout: "3-column"; className: string; }' is not assignable to parameter of type 'QuoteGridProps'.
  Types of property 'quotes' are incompatible.
    Type '({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]' is not assignable to type 'Quote[]'.
      Type '{ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; }' is not assignable to type 'Quote'.
        Type '{ text: string; author: string; icon: string; note?: undefined; }' is not assignable to type 'Quote'.
          Types of property 'icon' are incompatible.
            Type 'string' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.

13     quotesProps: enhanceQuotesProps(defaultContent.quotes)
                                       ~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/components/QuotesSection/QuotesSection.stories.tsx:24:37 - error TS2345: Argument of type '{ layout: "2-column"; quotes: ({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]; className: string; }' is not assignable to parameter of type 'QuoteGridProps'.
  Types of property 'quotes' are incompatible.
    Type '({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]' is not assignable to type 'Quote[]'.
      Type '{ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; }' is not assignable to type 'Quote'.
        Type '{ text: string; author: string; icon: string; note?: undefined; }' is not assignable to type 'Quote'.
          Types of property 'icon' are incompatible.
            Type 'string' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.

24     quotesProps: enhanceQuotesProps({
                                       ~
25       ...defaultContent.quotes,
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
26       layout: '2-column'
   ~~~~~~~~~~~~~~~~~~~~~~~~
27     })
   ~~~~~

src/shared-components/pages/WhitePaper/components/BrainGardenOverview/BrainGardenOverview.hook.ts:28:46 - error TS2345: Argument of type '{ desktopTitle: string; mobileTitle: string; desktopSubtitle: string; mobileSubtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; ... 4 more ...; hideBlurSquareDesktop: boolean; } | { ...; }' is not assignable to parameter of type '{ title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; backgroundOverlay?: boolean | undefined; ... 4 more ...; className?: string | undefined; } | undefined'.
  Type '{ desktopTitle: string; mobileTitle: string; desktopSubtitle: string; mobileSubtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; ... 4 more ...; hideBlurSquareDesktop: boolean; }' is missing the following properties from type '{ title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; backgroundOverlay?: boolean | undefined; overlayOpacity?: number | undefined; pattern?: "none" | ... 2 more ... | undefined; textColor?: "light" | ... 1 more ... | undefined; ani...': title, subtitle

28   const enhancedHeroProps = enhanceHeroProps(heroProps);
                                                ~~~~~~~~~

src/shared-components/pages/WhitePaper/components/BrainGardenOverview/BrainGardenOverview.logic.tsx:48:34 - error TS2739: Type '{ desktopTitle: string; mobileTitle: string; desktopSubtitle: string; mobileSubtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; ... 4 more ...; hideBlurSquareDesktop: boolean; }' is missing the following properties from type '{ title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; backgroundOverlay?: boolean | undefined; overlayOpacity?: number | undefined; pattern?: "none" | ... 2 more ... | undefined; textColor?: "light" | ... 1 more ... | undefined; ani...': title, subtitle

48 export const enhanceHeroProps = (heroProps: BrainGardenOverviewProps['heroProps'] = defaultContent.hero): HeroProps => {
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/BrainGardenOverview/BrainGardenOverview.logic.tsx:57:5 - error TS2322: Type '"none" | "fade-up" | "slide-in-left"' is not assignable to type 'AnimationType | undefined'.
  Type '"fade-up"' is not assignable to type 'AnimationType | undefined'.

57     animation: (heroProps.animation as "fade-up" | "slide-in-left" | "none") || 'fade-up',
       ~~~~~~~~~

  src/shared-components/organisms/Hero/Hero.types.ts:51:5
    51     animation?: AnimationType;
           ~~~~~~~~~
    The expected type comes from property 'animation' which is declared here on type 'HeroProps'

src/shared-components/pages/WhitePaper/components/BrainGardenOverview/BrainGardenOverview.stories.tsx:41:3 - error TS2322: Type '{ heroProps: { desktopTitle: string; mobileTitle: string; desktopSubtitle: string; mobileSubtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; ... 4 more ...; hideBlurSquareDesktop: boolean; }; ... 6 more ...; ctaProps: { ...; }; }' is not assignable to type 'Partial<{ className?: string | undefined; heroProps?: { title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; ... 5 more ...; className?: string | undefined; } | undefined; ... 7 more ...; transitionProps?: { ...; } | undefined; }> & ...'.
  Type '{ heroProps: { desktopTitle: string; mobileTitle: string; desktopSubtitle: string; mobileSubtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; ... 4 more ...; hideBlurSquareDesktop: boolean; }; ... 6 more ...; ctaProps: { ...; }; }' is not assignable to type 'Partial<{ className?: string | undefined; heroProps?: { title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; ... 5 more ...; className?: string | undefined; } | undefined; ... 7 more ...; transitionProps?: { ...; } | undefined; }>'.
    Types of property 'heroProps' are incompatible.
      Type '{ desktopTitle: string; mobileTitle: string; desktopSubtitle: string; mobileSubtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; ... 4 more ...; hideBlurSquareDesktop: boolean; }' is missing the following properties from type '{ title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; backgroundOverlay?: boolean | undefined; overlayOpacity?: number | undefined; pattern?: "none" | ... 2 more ... | undefined; textColor?: "light" | ... 1 more ... | undefined; ani...': title, subtitle

41   args: defaultArgs,
     ~~~~

  ../node_modules/.pnpm/@storybook+core@8.6.12_storybook@8.6.12/node_modules/@storybook/core/dist/csf/index.d.ts:533:5
    533     args?: Partial<TArgs>;
            ~~~~
    The expected type comes from property 'args' which is declared here on type 'StoryAnnotations<ReactRenderer, { className?: string | undefined; heroProps?: { title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; ... 5 more ...; className?: string | undefined; } | undefined; ... 7 more ...; transitionProps?: { ....'

src/shared-components/pages/WhitePaper/components/BrainGardenOverview/BrainGardenOverview.stories.tsx:49:3 - error TS2322: Type '{ heroProps: { desktopTitle: string; mobileTitle: string; desktopSubtitle: string; mobileSubtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; ... 4 more ...; hideBlurSquareDesktop: boolean; }; ... 6 more ...; ctaProps: { ...; }; }' is not assignable to type 'Partial<{ className?: string | undefined; heroProps?: { title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; ... 5 more ...; className?: string | undefined; } | undefined; ... 7 more ...; transitionProps?: { ...; } | undefined; }> & ...'.
  Type '{ heroProps: { desktopTitle: string; mobileTitle: string; desktopSubtitle: string; mobileSubtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; ... 4 more ...; hideBlurSquareDesktop: boolean; }; ... 6 more ...; ctaProps: { ...; }; }' is not assignable to type 'Partial<{ className?: string | undefined; heroProps?: { title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; ... 5 more ...; className?: string | undefined; } | undefined; ... 7 more ...; transitionProps?: { ...; } | undefined; }>'.
    Types of property 'heroProps' are incompatible.
      Type '{ desktopTitle: string; mobileTitle: string; desktopSubtitle: string; mobileSubtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; ... 4 more ...; hideBlurSquareDesktop: boolean; }' is missing the following properties from type '{ title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; backgroundOverlay?: boolean | undefined; overlayOpacity?: number | undefined; pattern?: "none" | ... 2 more ... | undefined; textColor?: "light" | ... 1 more ... | undefined; ani...': title, subtitle

49   args: defaultArgs,
     ~~~~

  ../node_modules/.pnpm/@storybook+core@8.6.12_storybook@8.6.12/node_modules/@storybook/core/dist/csf/index.d.ts:533:5
    533     args?: Partial<TArgs>;
            ~~~~
    The expected type comes from property 'args' which is declared here on type 'StoryAnnotations<ReactRenderer, { className?: string | undefined; heroProps?: { title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; ... 5 more ...; className?: string | undefined; } | undefined; ... 7 more ...; transitionProps?: { ....'

src/shared-components/pages/WhitePaper/components/BrainGardenOverview/BrainGardenOverview.stories.tsx:63:3 - error TS2322: Type '{ heroProps: { desktopTitle: string; mobileTitle: string; desktopSubtitle: string; mobileSubtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; ... 4 more ...; hideBlurSquareDesktop: boolean; }; ... 6 more ...; ctaProps: { ...; }; }' is not assignable to type 'Partial<{ className?: string | undefined; heroProps?: { title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; ... 5 more ...; className?: string | undefined; } | undefined; ... 7 more ...; transitionProps?: { ...; } | undefined; }> & ...'.
  Type '{ heroProps: { desktopTitle: string; mobileTitle: string; desktopSubtitle: string; mobileSubtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; ... 4 more ...; hideBlurSquareDesktop: boolean; }; ... 6 more ...; ctaProps: { ...; }; }' is not assignable to type 'Partial<{ className?: string | undefined; heroProps?: { title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; ... 5 more ...; className?: string | undefined; } | undefined; ... 7 more ...; transitionProps?: { ...; } | undefined; }>'.
    Types of property 'heroProps' are incompatible.
      Type '{ desktopTitle: string; mobileTitle: string; desktopSubtitle: string; mobileSubtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; ... 4 more ...; hideBlurSquareDesktop: boolean; }' is missing the following properties from type '{ title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; backgroundOverlay?: boolean | undefined; overlayOpacity?: number | undefined; pattern?: "none" | ... 2 more ... | undefined; textColor?: "light" | ... 1 more ... | undefined; ani...': title, subtitle

63   args: defaultArgs,
     ~~~~

  ../node_modules/.pnpm/@storybook+core@8.6.12_storybook@8.6.12/node_modules/@storybook/core/dist/csf/index.d.ts:533:5
    533     args?: Partial<TArgs>;
            ~~~~
    The expected type comes from property 'args' which is declared here on type 'StoryAnnotations<ReactRenderer, { className?: string | undefined; heroProps?: { title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; ... 5 more ...; className?: string | undefined; } | undefined; ... 7 more ...; transitionProps?: { ....'

src/shared-components/pages/WhitePaper/components/BrainGardenOverview/components/NextEvolutionSection/NextEvolutionSection.styles.ts:215:19 - error TS2345: Argument of type '({ theme }: ExecutionContext & FastOmit<FastOmit<FastOmit<{}, never>, never>, never>) => MantineColorsTuple' is not assignable to parameter of type 'Interpolation<FastOmit<FastOmit<FastOmit<{}, never>, never>, never>>'.
  Type '({ theme }: ExecutionContext & FastOmit<FastOmit<FastOmit<{}, never>, never>, never>) => MantineColorsTuple' is not assignable to type 'StyleFunction<FastOmit<FastOmit<FastOmit<{}, never>, never>, never>>'.
    Type 'MantineColorsTuple' is not assignable to type 'Interpolation<FastOmit<FastOmit<FastOmit<{}, never>, never>, never>>'.
      Type 'readonly [string, string, string, string, string, string, string, string, string, string, ...string[]]' is not assignable to type 'StyledObject<FastOmit<FastOmit<FastOmit<{}, never>, never>, never>>'.
        Types of property 'filter' are incompatible.
          Type '{ <S extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): S[]; (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[]; }' is not assignable to type 'Filter | undefined'.

215   border-color: ${({ theme }) => theme.colors.border || '#e0e0e0'};
                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/BrainGardenOverview/components/NextEvolutionSection/NextEvolutionSection.styles.ts:216:63 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

216   background-color: ${({ theme }) => theme.colors.background?.paper || '#ffffff'}; // Use standard theme structure
                                                                  ~~~~~

src/shared-components/pages/WhitePaper/components/BrainGardenOverview/components/NextEvolutionSection/NextEvolutionSection.styles.ts:224:12 - error TS2345: Argument of type '({ theme }: ExecutionContext & FastOmit<{}, never>) => MantineColorsTuple' is not assignable to parameter of type 'Interpolation<FastOmit<{}, never>>'.
  Type '({ theme }: ExecutionContext & FastOmit<{}, never>) => MantineColorsTuple' is not assignable to type 'StyleFunction<FastOmit<{}, never>>'.
    Type 'MantineColorsTuple' is not assignable to type 'Interpolation<FastOmit<{}, never>>'.
      Type 'readonly [string, string, string, string, string, string, string, string, string, string, ...string[]]' is not assignable to type 'StyledObject<FastOmit<{}, never>>'.
        Types of property 'filter' are incompatible.
          Type '{ <S extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): S[]; (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[]; }' is not assignable to type 'Filter | undefined'.

224   color: ${({ theme }) => theme.colors.primary || '#2563eb'};
               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/BrainGardenOverview/components/NextEvolutionSection/NextEvolutionSection.styles.ts:255:19 - error TS2345: Argument of type '({ theme }: ExecutionContext & FastOmit<FastOmit<FastOmit<{}, never>, never>, never>) => MantineColorsTuple' is not assignable to parameter of type 'Interpolation<FastOmit<FastOmit<FastOmit<{}, never>, never>, never>>'.
  Type '({ theme }: ExecutionContext & FastOmit<FastOmit<FastOmit<{}, never>, never>, never>) => MantineColorsTuple' is not assignable to type 'StyleFunction<FastOmit<FastOmit<FastOmit<{}, never>, never>, never>>'.
    Type 'MantineColorsTuple' is not assignable to type 'Interpolation<FastOmit<FastOmit<FastOmit<{}, never>, never>, never>>'.
      Type 'readonly [string, string, string, string, string, string, string, string, string, string, ...string[]]' is not assignable to type 'StyledObject<FastOmit<FastOmit<FastOmit<{}, never>, never>, never>>'.
        Types of property 'filter' are incompatible.
          Type '{ <S extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): S[]; (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[]; }' is not assignable to type 'Filter | undefined'.

255   border-color: ${({ theme }) => theme.colors.border || '#e0e0e0'};
                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/BrainGardenOverview/components/NextEvolutionSection/NextEvolutionSection.styles.ts:256:63 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

256   background-color: ${({ theme }) => theme.colors.background?.light || '#f8f9fa'}; // Use standard theme structure
                                                                  ~~~~~

src/shared-components/pages/WhitePaper/components/BrainGardenOverview/components/NextEvolutionSection/NextEvolutionSection.styles.ts:280:20 - error TS2345: Argument of type '({ theme }: ExecutionContext & FastOmit<FastOmit<FastOmit<{}, never>, never>, never>) => MantineColorsTuple' is not assignable to parameter of type 'Interpolation<FastOmit<FastOmit<FastOmit<{}, never>, never>, never>>'.
  Type '({ theme }: ExecutionContext & FastOmit<FastOmit<FastOmit<{}, never>, never>, never>) => MantineColorsTuple' is not assignable to type 'StyleFunction<FastOmit<FastOmit<FastOmit<{}, never>, never>, never>>'.
    Type 'MantineColorsTuple' is not assignable to type 'Interpolation<FastOmit<FastOmit<FastOmit<{}, never>, never>, never>>'.
      Type 'readonly [string, string, string, string, string, string, string, string, string, string, ...string[]]' is not assignable to type 'StyledObject<FastOmit<FastOmit<FastOmit<{}, never>, never>, never>>'.
        Types of property 'filter' are incompatible.
          Type '{ <S extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): S[]; (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[]; }' is not assignable to type 'Filter | undefined'.

280    border-color: ${({ theme }) => theme.colors.border || '#e0e0e0'};
                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/BrainGardenOverview/components/NextEvolutionSection/NextEvolutionSection.styles.ts:281:64 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

281    background-color: ${({ theme }) => theme.colors.background?.paper || '#ffffff'}; // Use standard theme structure
                                                                   ~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.logic.tsx:21:30 - error TS2339: Property 'pattern' does not exist on type 'HeroProps'.

21   const pattern = (heroProps.pattern === 'circuit-board' || heroProps.pattern === 'dots' || heroProps.pattern === 'none')
                                ~~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.logic.tsx:21:71 - error TS2339: Property 'pattern' does not exist on type 'HeroProps'.

21   const pattern = (heroProps.pattern === 'circuit-board' || heroProps.pattern === 'dots' || heroProps.pattern === 'none')
                                                                         ~~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.logic.tsx:21:103 - error TS2339: Property 'pattern' does not exist on type 'HeroProps'.

21   const pattern = (heroProps.pattern === 'circuit-board' || heroProps.pattern === 'dots' || heroProps.pattern === 'none')
                                                                                                         ~~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.logic.tsx:22:17 - error TS2339: Property 'pattern' does not exist on type 'HeroProps'.

22     ? heroProps.pattern
                   ~~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.logic.tsx:44:5 - error TS2322: Type '"none" | "fade-up" | "slide-in-left"' is not assignable to type 'AnimationType | undefined'.
  Type '"fade-up"' is not assignable to type 'AnimationType | undefined'.

44     animation: (heroProps.animation as "fade-up" | "slide-in-left" | "none") || 'fade-up'
       ~~~~~~~~~

  src/shared-components/organisms/Hero/Hero.types.ts:51:5
    51     animation?: AnimationType;
           ~~~~~~~~~
    The expected type comes from property 'animation' which is declared here on type 'HeroProps'

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:642:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

642   color: ${props => props.theme.colors.text.secondary};
                                                ~~~~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:654:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

654   color: ${props => props.theme.colors.text.primary};
                                                ~~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:666:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

666   color: ${props => props.theme.colors.text.primary};
                                                ~~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:678:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

678   color: ${props => props.theme.colors.text.primary};
                                                ~~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:737:17 - error TS2345: Argument of type '({ theme }: ExecutionContext & FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>) => MantineColorsTuple' is not assignable to parameter of type 'Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
  Type '({ theme }: ExecutionContext & FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>) => MantineColorsTuple' is not assignable to type 'StyleFunction<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
    Type 'MantineColorsTuple' is not assignable to type 'Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
      Type 'readonly [string, string, string, string, string, string, string, string, string, string, ...string[]]' is not assignable to type 'StyledObject<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
        Types of property 'filter' are incompatible.
          Type '{ <S extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): S[]; (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[]; }' is not assignable to type 'Filter | undefined'.

737   background: ${({ theme }) => theme.colors.gradient};
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:738:45 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

738   color: ${({ theme }) => theme.colors.text.light};
                                                ~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:760:17 - error TS2345: Argument of type '({ theme }: ExecutionContext & FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>) => MantineColorsTuple' is not assignable to parameter of type 'Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
  Type '({ theme }: ExecutionContext & FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>) => MantineColorsTuple' is not assignable to type 'StyleFunction<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
    Type 'MantineColorsTuple' is not assignable to type 'Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
      Type 'readonly [string, string, string, string, string, string, string, string, string, string, ...string[]]' is not assignable to type 'StyledObject<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
        Types of property 'filter' are incompatible.
          Type '{ <S extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): S[]; (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[]; }' is not assignable to type 'Filter | undefined'.

760   background: ${({ theme }) => theme.colors.gradient};
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:761:45 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

761   color: ${({ theme }) => theme.colors.text.light};
                                                ~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:788:64 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

788   border-left: 4px solid ${props => props.theme.colors.primary.main};
                                                                   ~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:791:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

791   color: ${props => props.theme.colors.text.secondary};
                                                ~~~~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:796:56 - error TS2339: Property 'dark' does not exist on type 'MantineColorsTuple'.

796   background: ${({ theme }) => theme.colors.background.dark};
                                                           ~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:835:56 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

835   background: ${({ theme }) => theme.colors.background.light};
                                                           ~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:836:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

836   color: ${({ theme }) => theme.colors.text.primary};
                                                ~~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:841:63 - error TS2339: Property 'yellow' does not exist on type 'MantineColorsTuple'.

841   border-left: 4px solid ${({ theme }) => theme.colors.accent.yellow};
                                                                  ~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:847:47 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

847     color: ${({ theme }) => theme.colors.text.primary};
                                                  ~~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:852:53 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

852   background: ${({ theme }) => theme.colors.primary.main};
                                                        ~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:853:45 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

853   color: ${({ theme }) => theme.colors.text.light};
                                                ~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:873:58 - error TS2339: Property 'yellow' does not exist on type 'MantineColorsTuple'.

873   background-color: ${({ theme }) => theme.colors.accent.yellow};
                                                             ~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:874:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

874   color: ${({ theme }) => theme.colors.text.primary};
                                                ~~~~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:907:55 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

907     background: ${({ theme }) => theme.colors.primary.main};
                                                          ~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:917:82 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

917     background: linear-gradient(to bottom, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.primary.light});
                                                                                     ~~~~

src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:917:127 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

917     background: linear-gradient(to bottom, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.primary.light});
                                                                                                                                  ~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/AgentSystemSection/AgentSystemSection.tsx:12:62 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

12   background-color: ${({ theme }) => theme.colors.background.light};
                                                                ~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/AgentSystemSection/AgentSystemSection.tsx:19:65 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

19   border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
                                                                   ~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/AgentSystemSection/AgentSystemSection.tsx:31:48 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

31   color: ${({ theme }) => theme.colors.primary.main};
                                                  ~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/KnowledgeSystemSection/KnowledgeSystemSection.tsx:20:62 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

20   background-color: ${({ theme }) => theme.colors.background.paper};
                                                                ~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/KnowledgeSystemSection/KnowledgeSystemSection.tsx:21:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

21   border-radius: ${({ theme }) => theme.borderRadius.md};
                                           ~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/KnowledgeSystemSection/KnowledgeSystemSection.tsx:38:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

38   color: ${({ theme }) => theme.colors.text.primary};
                                               ~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/KnowledgeSystemSection/KnowledgeSystemSection.tsx:43:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

43   color: ${({ theme }) => theme.colors.text.secondary};
                                               ~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/KnowledgeSystemSection/KnowledgeSystemSection.tsx:48:62 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

48   background-color: ${({ theme }) => theme.colors.background.light};
                                                                ~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/KnowledgeSystemSection/KnowledgeSystemSection.tsx:49:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

49   border-radius: ${({ theme }) => theme.borderRadius.sm};
                                           ~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/KnowledgeSystemSection/KnowledgeSystemSection.tsx:52:28 - error TS2345: Argument of type '({ theme }: ExecutionContext & FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>) => MantineColorsTuple' is not assignable to parameter of type 'Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
  Type '({ theme }: ExecutionContext & FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>) => MantineColorsTuple' is not assignable to type 'StyleFunction<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
    Type 'MantineColorsTuple' is not assignable to type 'Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
      Type 'readonly [string, string, string, string, string, string, string, string, string, string, ...string[]]' is not assignable to type 'StyledObject<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>'.
        Types of property 'filter' are incompatible.
          Type '{ <S extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): S[]; (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[]; }' is not assignable to type 'Filter | undefined'.

52   border-left: 3px solid ${({ theme }) => theme.colors.primary};
                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/KnowledgeSystemSection/KnowledgeSystemSection.tsx:59:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

59   color: ${({ theme }) => theme.colors.text.primary};
                                               ~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/KnowledgeSystemSection/KnowledgeSystemSection.tsx:71:25 - error TS2345: Argument of type '({ theme }: ExecutionContext & FastOmit<TypographyProps, never>) => MantineColorsTuple' is not assignable to parameter of type 'Interpolation<FastOmit<TypographyProps, never>>'.
  Type '({ theme }: ExecutionContext & FastOmit<TypographyProps, never>) => MantineColorsTuple' is not assignable to type 'StyleFunction<FastOmit<TypographyProps, never>>'.
    Type 'MantineColorsTuple' is not assignable to type 'Interpolation<FastOmit<TypographyProps, never>>'.
      Type 'readonly [string, string, string, string, string, string, string, string, string, string, ...string[]]' is not assignable to type 'StyledObject<FastOmit<TypographyProps, never>>'.
        Types of property 'filter' are incompatible.
          Type '{ <S extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): S[]; (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[]; }' is not assignable to type 'Filter | undefined'.

71     background-color: ${({ theme }) => theme.colors.primary};
                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/KnowledgeSystemSection/KnowledgeSystemSection.tsx:118:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

118   color: ${({ theme }) => theme.colors.text.primary};
                                                ~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/ResultSection/ResultSection.tsx:18:62 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

18   background-color: ${({ theme }) => theme.colors.background.paper};
                                                                ~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/ResultSection/ResultSection.tsx:19:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

19   border-radius: ${({ theme }) => theme.borderRadius.md};
                                           ~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/ResultSection/ResultSection.tsx:28:48 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

28   color: ${({ theme }) => theme.colors.primary.main};
                                                  ~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/ResultSection/ResultSection.tsx:33:62 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

33   background-color: ${({ theme }) => theme.colors.background.light};
                                                                ~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/ResultSection/ResultSection.tsx:34:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

34   border-radius: ${({ theme }) => theme.borderRadius.md};
                                           ~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/ResultSection/ResultSection.tsx:55:30 - error TS2345: Argument of type '({ theme }: ExecutionContext & FastOmit<Omit<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>, "ref"> & { ...; }, never>) => MantineColorsTuple' is not assignable to parameter of type 'Interpolation<FastOmit<Omit<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>, "ref"> & { ...; }, never>>'.
  Type '({ theme }: ExecutionContext & FastOmit<Omit<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>, "ref"> & { ...; }, never>) => MantineColorsTuple' is not assignable to type 'StyleFunction<FastOmit<Omit<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>, "ref"> & { ...; }, never>>'.
    Type 'MantineColorsTuple' is not assignable to type 'Interpolation<FastOmit<Omit<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>, "ref"> & { ...; }, never>>'.
      Type 'readonly [string, string, string, string, string, string, string, string, string, string, ...string[]]' is not assignable to type 'StyledObject<FastOmit<Omit<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>, "ref"> & { ...; }, never>>'.
        Types of property 'filter' are incompatible.
          Type '{ <S extends string>(predicate: (value: string, index: number, array: readonly string[]) => value is S, thisArg?: any): S[]; (predicate: (value: string, index: number, array: readonly string[]) => unknown, thisArg?: any): string[]; }' is not assignable to type 'Filter | undefined'.

55   border-bottom: 1px solid ${({ theme }) => theme.colors.border};
                                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/ResultSection/ResultSection.tsx:65:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

65   color: ${({ theme }) => theme.colors.text.secondary};
                                               ~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/ResultSection/ResultSection.tsx:69:48 - error TS2339: Property 'main' does not exist on type 'MantineColorsTuple'.

69   color: ${({ theme }) => theme.colors.primary.main};
                                                  ~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/SecurityControlSection/SecurityControlSection.tsx:9:62 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

9   background-color: ${({ theme }) => theme.colors.background.paper};
                                                               ~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/SecurityControlSection/SecurityControlSection.tsx:10:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

10   border-radius: ${({ theme }) => theme.borderRadius.md};
                                           ~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/SecurityControlSection/SecurityControlSection.tsx:17:62 - error TS2339: Property 'dark' does not exist on type 'MantineColorsTuple'.

17   background-color: ${({ theme }) => theme.colors.background.dark};
                                                                ~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/SecurityControlSection/SecurityControlSection.tsx:18:45 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

18   color: ${({ theme }) => theme.colors.text.light};
                                               ~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/SecurityControlSection/SecurityControlSection.tsx:19:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

19   border-radius: ${({ theme }) => theme.borderRadius.sm};
                                           ~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/SystemOverview/SystemOverview.tsx:27:62 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

27   background-color: ${({ theme }) => theme.colors.background.paper};
                                                                ~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/SystemOverview/SystemOverview.tsx:28:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

28   border-radius: ${({ theme }) => theme.borderRadius.md};
                                           ~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/SystemOverview/SystemOverview.tsx:35:62 - error TS2339: Property 'dark' does not exist on type 'MantineColorsTuple'.

35   background-color: ${({ theme }) => theme.colors.background.dark};
                                                                ~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/SystemOverview/SystemOverview.tsx:36:45 - error TS2339: Property 'light' does not exist on type 'MantineColorsTuple'.

36   color: ${({ theme }) => theme.colors.text.light};
                                               ~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/SystemOverview/SystemOverview.tsx:37:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

37   border-radius: ${({ theme }) => theme.borderRadius.sm};
                                           ~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/SystemOverview/SystemOverview.tsx:60:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

60   border-radius: ${({ theme }) => theme.borderRadius.md};
                                           ~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/SystemOverview/SystemOverview.tsx:73:45 - error TS2339: Property 'secondary' does not exist on type 'MantineColorsTuple'.

73   color: ${({ theme }) => theme.colors.text.secondary};
                                               ~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/TechnicalImplementation.styles.ts:58:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

58   border-radius: ${({ theme }) => theme.borderRadius.md};
                                           ~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/TechnicalImplementation.styles.ts:59:56 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

59   background: ${({ theme }) => theme.colors.background.paper};
                                                          ~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/TechnicalImplementation.styles.ts:75:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

75   color: ${({ theme }) => theme.colors.text.primary};
                                               ~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/TechnicalImplementation.styles.ts:86:45 - error TS2339: Property 'primary' does not exist on type 'MantineColorsTuple'.

86   color: ${({ theme }) => theme.colors.text.primary};
                                               ~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/TechnicalImplementation.styles.ts:104:56 - error TS2339: Property 'paper' does not exist on type 'MantineColorsTuple'.

104   background: ${({ theme }) => theme.colors.background.paper};
                                                           ~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/TechnicalImplementation.styles.ts:105:41 - error TS2339: Property 'borderRadius' does not exist on type 'DefaultTheme'.

105   border-radius: ${({ theme }) => theme.borderRadius.lg};
                                            ~~~~~~~~~~~~

src/shared-components/pages/WhitePaper/components/TechnicalImplementation/TechnicalImplementation.tsx:89:9 - error TS2322: Type '"fade-up"' is not assignable to type 'AnimationType | undefined'.

89         animation="fade-up"
           ~~~~~~~~~

  src/shared-components/organisms/Hero/Hero.types.ts:51:5
    51     animation?: AnimationType;
           ~~~~~~~~~
    The expected type comes from property 'animation' which is declared here on type 'IntrinsicAttributes & HeroProps'

src/shared-components/pages/WhitePaper/WhitePaper.stories.tsx:101:11 - error TS2322: Type '{ quotes: ({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]; layout: "3-column"; className: string; }' is not assignable to type 'QuoteGridProps'.
  Types of property 'quotes' are incompatible.
    Type '({ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; })[]' is not assignable to type 'Quote[]'.
      Type '{ text: string; author: string; icon: string; note?: undefined; } | { text: string; author: string; note: string; icon: string; }' is not assignable to type 'Quote'.
        Type '{ text: string; author: string; icon: string; note?: undefined; }' is not assignable to type 'Quote'.
          Types of property 'icon' are incompatible.
            Type 'string' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.

101           quotesProps={skepticContent.quotes}
              ~~~~~~~~~~~

  src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.types.ts:10:3
    10   quotesProps?: QuoteGridProps;
         ~~~~~~~~~~~
    The expected type comes from property 'quotesProps' which is declared here on type 'IntrinsicAttributes & AiSkepticToExpertProps'

src/shared-components/pages/WhitePaper/WhitePaper.stories.tsx:112:11 - error TS2739: Type '{ desktopTitle: string; mobileTitle: string; desktopSubtitle: string; mobileSubtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; ... 4 more ...; hideBlurSquareDesktop: boolean; }' is missing the following properties from type '{ title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; backgroundOverlay?: boolean | undefined; overlayOpacity?: number | undefined; pattern?: "none" | ... 2 more ... | undefined; textColor?: "light" | ... 1 more ... | undefined; ani...': title, subtitle

112           heroProps={brainGardenContent.hero}
              ~~~~~~~~~

  src/shared-components/pages/WhitePaper/components/BrainGardenOverview/BrainGardenOverview.types.ts:5:3
    5   heroProps?: {
        ~~~~~~~~~
    The expected type comes from property 'heroProps' which is declared here on type 'IntrinsicAttributes & BrainGardenOverviewProps'

src/shared-components/pages/WhitePaper/WhitePaper.tsx:160:17 - error TS2739: Type '{ desktopTitle: string; mobileTitle: string; desktopSubtitle: string; mobileSubtitle: string; background: "image"; backgroundImage: string; backgroundOverlay: boolean; overlayOpacity: number; ... 4 more ...; hideBlurSquareDesktop: boolean; }' is missing the following properties from type '{ title: string; subtitle: string; background?: "light" | "dark" | "image" | "gradient" | undefined; backgroundImage?: string | undefined; backgroundOverlay?: boolean | undefined; overlayOpacity?: number | undefined; pattern?: "none" | ... 2 more ... | undefined; textColor?: "light" | ... 1 more ... | undefined; ani...': title, subtitle

160                 heroProps={brainGardenContent.hero}
                    ~~~~~~~~~

  src/shared-components/pages/WhitePaper/components/BrainGardenOverview/BrainGardenOverview.types.ts:5:3
    5   heroProps?: {
        ~~~~~~~~~
    The expected type comes from property 'heroProps' which is declared here on type 'IntrinsicAttributes & BrainGardenOverviewProps'


Found 297 errors in 42 files.

Errors  Files
     3  src/components/Cards/CapabilityCard.styles.ts:24
     2  src/components/Diagrams/_wrappers/DiagramClientWrapper/DiagramClientWrapper.styles.ts:22
     2  src/components/Diagrams/AiIntegrationProcessDiagram/AiIntegrationProcessDiagram.styles.ts:13
     2  src/shared-components/organisms/ChallengeBreakdown/ChallengeBreakdown.tsx:86
     9  src/shared-components/organisms/RepoGrid/RepoGrid.styles.ts:19
     3  src/shared-components/organisms/SolutionCards/SolutionCards.tsx:20
     4  src/shared-components/organisms/StatsComparison/StatsComparison.styles.ts:55
     4  src/shared-components/organisms/SuccessStory/SuccessStory.styles.ts:61
    13  src/shared-components/pages/BestPractices/BestPractices.styles.ts:281
     1  src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.styles.ts:10
    76  src/shared-components/pages/BestPractices/components/DetailedContent/DetailedContent.tsx:54
    14  src/shared-components/pages/BestPractices/components/index.ts:7
    22  src/shared-components/pages/Bio/Bio.styles.ts:278
     1  src/shared-components/pages/Bio/Bio.tsx:182
     4  src/shared-components/pages/Bio/components/BioIntro/BioIntro.styles.ts:8
     4  src/shared-components/pages/Bio/components/TechnicalExpertise/TechnicalExpertise.styles.ts:17
    11  src/shared-components/pages/Bio/components/Testimonials/Testimonials.styles.ts:13
     3  src/shared-components/pages/CodeExamples/CodeExamples.styles.ts:22
    10  src/shared-components/pages/CodeExamples/components/GitHubPortfolioTemplate/GitHubPortfolioTemplate.styles.ts:36
     1  src/shared-components/pages/Experience/components/SkillsSection/SkillsSection.styles.ts:50
     1  src/shared-components/pages/Experience/Experience.tsx:283
     1  src/shared-components/pages/Home/Home.tsx:86
     7  src/shared-components/pages/WhitePaper/components/AiAutopilotAnalogy/AiAutopilotAnalogy.logic.tsx:271
     8  src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.logic.tsx:41
     3  src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.stories.tsx:36
     3  src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/AiSkepticToExpert.tsx:38
     2  src/shared-components/pages/WhitePaper/components/AiSkepticToExpert/components/QuotesSection/QuotesSection.stories.tsx:13
     1  src/shared-components/pages/WhitePaper/components/BrainGardenOverview/BrainGardenOverview.hook.ts:28
     2  src/shared-components/pages/WhitePaper/components/BrainGardenOverview/BrainGardenOverview.logic.tsx:48
     3  src/shared-components/pages/WhitePaper/components/BrainGardenOverview/BrainGardenOverview.stories.tsx:41
     7  src/shared-components/pages/WhitePaper/components/BrainGardenOverview/components/NextEvolutionSection/NextEvolutionSection.styles.ts:215
     5  src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.logic.tsx:21
    22  src/shared-components/pages/WhitePaper/components/RealWorldImpact/RealWorldImpact.styles.ts:642
     3  src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/AgentSystemSection/AgentSystemSection.tsx:12
    10  src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/KnowledgeSystemSection/KnowledgeSystemSection.tsx:20
     8  src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/ResultSection/ResultSection.tsx:18
     5  src/shared-components/pages/WhitePaper/components/TechnicalImplementation/components/SecurityControlSection/SecurityControlSection.tsx:9
     7  src/shared-components/pages/WhitePaper/components/TechnicalImplementation/SystemOverview/SystemOverview.tsx:27
     6  src/shared-components/pages/WhitePaper/components/TechnicalImplementation/TechnicalImplementation.styles.ts:58
     1  src/shared-components/pages/WhitePaper/components/TechnicalImplementation/TechnicalImplementation.tsx:89
     2  src/shared-components/pages/WhitePaper/WhitePaper.stories.tsx:101
     1  src/shared-components/pages/WhitePaper/WhitePaper.tsx:160