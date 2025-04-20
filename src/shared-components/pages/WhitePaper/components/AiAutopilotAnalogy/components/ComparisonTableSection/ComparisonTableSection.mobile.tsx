import React from 'react';
import { ComparisonTable } from '@shared-components/molecules/ComparisonTable';
import { Stack, Title, Text, Box, useMantineTheme } from '@mantine/core'; // Added Mantine components
import { comparisonSectionStyle, sectionContainerWithoutMarginStyle, SPACING } from '../../AiAutopilotAnalogy.styles'; // Import SPACING

// Assuming ComparisonTableSectionProps is defined elsewhere or we redefine it
interface ComparisonTableSectionProps {
    leftTitle: string;
    rightTitle: string;
    items: Array<{
        category: string;
        leftContent: string;
        rightContent: string;
    }>;
    className?: string;
}

export const ComparisonTableSectionMobile: React.FC<ComparisonTableSectionProps> = ({
    leftTitle,
    rightTitle,
    items,
    className
}) => {
    const theme = useMantineTheme();
    // Use accent variant colors for the mobile title for consistency
    const headerTextColor = theme.white;
    const headerBackgroundColor = theme.colors.blue[6];

    return (
        // Apply section background and vertical spacing/margin ONLY
        <Stack
            className={className}
            style={{
                width: comparisonSectionStyle.width,
                backgroundColor: comparisonSectionStyle.backgroundColor,
                paddingTop: theme.spacing.xl,
                paddingBottom: theme.spacing.xl,
                marginBottom: SPACING.mobile.section,
                // Horizontal padding will be handled inside the table component
                paddingLeft: 0,
                paddingRight: 0,
            }}
            gap="md"
        >
            {/* Title Box - remove width constraints and padding */}
            <Box
                style={{
                    // No maxWidth or horizontal padding here
                    textAlign: 'center',
                    paddingTop: theme.spacing.md,
                    paddingBottom: theme.spacing.md,
                    backgroundColor: headerBackgroundColor,
                    borderRadius: theme.radius.md,
                }}
            >
                <Title order={4} style={{ color: headerTextColor }}>Human Pilot</Title>
                <Text size="sm" style={{ color: headerTextColor }}>vs.</Text>
                <Title order={4} style={{ color: headerTextColor }}>AI Autopilot</Title>
            </Box>

            {/* Table Wrapper - remove width constraints and padding */}
            <div>
                <ComparisonTable
                    leftTitle={leftTitle}
                    rightTitle={rightTitle}
                    items={items}
                    variant="accent"
                />
            </div>
        </Stack>
    );
}; 