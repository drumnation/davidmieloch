import React from 'react';
import { Box, Grid, Group, useMantineTheme } from '@mantine/core';
import { IconRocket, IconMoodSad, IconBulb, IconCheck } from '@tabler/icons-react';
import { Typography } from '@shared-components/atoms/Typography';
import {
  sectionContainerWithoutMarginStyle,
  paragraphContainerStyle,
  paragraphContainerTopMarginStyle,
  SPACING
} from '../../AiAutopilotAnalogy.styles';
import { PageSeparator } from '@shared-components/pages/BestPractices/BestPractices.styles';

interface AiIntegrationJourneySectionProps {
  isVisible?: boolean;
}

const AiIntegrationJourneySection: React.FC<AiIntegrationJourneySectionProps> = ({ isVisible = true }) => {
  const theme = useMantineTheme();
  if (!isVisible) return null;

  const phaseContainerStyleBase: React.CSSProperties = {
    padding: '1.5rem',
    borderRadius: theme.radius.md,
    height: '100%',
    backgroundColor: theme.colors.gray[0],
  };

  const sectionPaddingValue = parseFloat(SPACING.section);
  const quarterSectionPadding = `${sectionPaddingValue / 4}rem`;

  const horizontalPaddingValue = parseFloat(sectionContainerWithoutMarginStyle.paddingLeft as string);
  const halfHorizontalPadding = `${horizontalPaddingValue / 2}rem`;

  const rootBoxStyle: React.CSSProperties = {
    width: sectionContainerWithoutMarginStyle.width,
    maxWidth: sectionContainerWithoutMarginStyle.maxWidth,
    margin: sectionContainerWithoutMarginStyle.margin,
    paddingTop: quarterSectionPadding,
    paddingBottom: quarterSectionPadding,
    paddingLeft: halfHorizontalPadding,
    paddingRight: halfHorizontalPadding,
    backgroundColor: theme.white,
  };

  const mobileIconCircleStyle: React.CSSProperties = {
    backgroundColor: theme.black,
    borderRadius: '50%',
    padding: theme.spacing.xs,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
  };

  const desktopIconCircleStyle: React.CSSProperties = {
    backgroundColor: theme.colors.gray[2],
    borderRadius: '50%',
    padding: theme.spacing.xs,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
  };

  return (
    <Box style={rootBoxStyle}>
      <PageSeparator style={{ marginBottom: quarterSectionPadding }} />

      <div id="ai-integration-journey" style={{ ...paragraphContainerStyle, textAlign: 'left', paddingTop: theme.spacing.xl }} className="typography-align-mobile-center">
        <Typography variant="h2" mb="md">The AI Integration Journey</Typography>
      </div>

      <div style={{ ...paragraphContainerTopMarginStyle, textAlign: 'left' }} className="typography-align-mobile-center">
        <Typography variant="body" mb="lg">
          Organizations typically progress through these phases when integrating AI:
        </Typography>
      </div>

      <style>{`
        @media (max-width: ${theme.breakpoints.sm}) {
          .typography-align-mobile-center {
            text-align: center;
          }
        }
      `}</style>

      <Grid gutter={{ base: "lg", sm: "xl" }}>
        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
          <Box style={{ ...phaseContainerStyleBase }}>
            <Group data-phase-group="true" mb="sm" gap="xs" align="center" justify="center" style={{ justifyContent: 'var(--group-justify, center)' }}>
              <style>{`
                @media (min-width: ${theme.breakpoints.sm}) {
                  [data-phase-group="true"] {
                     --group-justify: flex-start;
                  }
                }
              `}</style>
              <Box style={mobileIconCircleStyle} hiddenFrom="md">
                <IconRocket size={20} color={theme.white} />
              </Box>
              <Box style={desktopIconCircleStyle} visibleFrom="md">
                <IconRocket size={20} color={theme.primaryColor} />
              </Box>
              <Box style={{ fontWeight: 700 }}>
                <Typography variant="h3">Peak of Inflated Expectations</Typography>
              </Box>
            </Group>
            <Box style={{ textAlign: 'left' }}>
              <Typography variant="body">
                Unrealistic expectations about AI capabilities, envisioning immediate, fully autonomous systems with minimal oversight.
              </Typography>
            </Box>
          </Box>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
          <Box style={{ ...phaseContainerStyleBase }}>
            <Group data-phase-group="true" mb="sm" gap="xs" align="center" justify="center" style={{ justifyContent: 'var(--group-justify, center)' }}>
              <style>{`
                @media (min-width: ${theme.breakpoints.sm}) {
                  [data-phase-group="true"] {
                     --group-justify: flex-start;
                  }
                }
              `}</style>
              <Box style={mobileIconCircleStyle} hiddenFrom="md">
                <IconMoodSad size={20} color={theme.white} />
              </Box>
              <Box style={desktopIconCircleStyle} visibleFrom="md">
                <IconMoodSad size={20} color={theme.colors.orange[6]} />
              </Box>
              <Box style={{ fontWeight: 700 }}>
                <Typography variant="h3">Trough of Disillusionment</Typography>
              </Box>
            </Group>
            <Box style={{ textAlign: 'left' }}>
              <Typography variant="body">
                Reality hits: AI requires significant training, data prep, and maintenance. Disappointment follows when results fall short.
              </Typography>
            </Box>
          </Box>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
          <Box style={{ ...phaseContainerStyleBase }}>
            <Group data-phase-group="true" mb="sm" gap="xs" align="center" justify="center" style={{ justifyContent: 'var(--group-justify, center)' }}>
              <style>{`
                @media (min-width: ${theme.breakpoints.sm}) {
                  [data-phase-group="true"] {
                     --group-justify: flex-start;
                  }
                }
              `}</style>
              <Box style={mobileIconCircleStyle} hiddenFrom="md">
                <IconBulb size={20} color={theme.white} />
              </Box>
              <Box style={desktopIconCircleStyle} visibleFrom="md">
                <IconBulb size={20} color={theme.colors.yellow[6]} />
              </Box>
              <Box style={{ fontWeight: 700 }}>
                <Typography variant="h3">Slope of Enlightenment</Typography>
              </Box>
            </Group>
            <Box style={{ textAlign: 'left' }}>
              <Typography variant="body">
                Realistic understanding develops. Focus shifts to practical, high-value use cases and limitations are acknowledged.
              </Typography>
            </Box>
          </Box>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
          <Box style={{ ...phaseContainerStyleBase }}>
            <Group data-phase-group="true" mb="sm" gap="xs" align="center" justify="center" style={{ justifyContent: 'var(--group-justify, center)' }}>
              <style>{`
                @media (min-width: ${theme.breakpoints.sm}) {
                  [data-phase-group="true"] {
                     --group-justify: flex-start;
                  }
                }
              `}</style>
              <Box style={mobileIconCircleStyle} hiddenFrom="md">
                <IconCheck size={20} color={theme.white} />
              </Box>
              <Box style={desktopIconCircleStyle} visibleFrom="md">
                <IconCheck size={20} color={theme.colors.green[6]} />
              </Box>
              <Box style={{ fontWeight: 700 }}>
                <Typography variant="h3">Plateau of Productivity</Typography>
              </Box>
            </Group>
            <Box style={{ textAlign: 'left' }}>
              <Typography variant="body">
                Sustainable AI integration achieved with measurable benefits, balancing automation and human oversight effectively.
              </Typography>
            </Box>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default AiIntegrationJourneySection; 