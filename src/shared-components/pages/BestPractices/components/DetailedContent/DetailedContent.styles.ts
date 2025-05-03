import { MantineTheme, rem, useMantineTheme } from '@mantine/core';
import { useMemo } from 'react';

// Utility to create a simple styles class naming system
export const useStyles = () => {
  const theme = useMantineTheme();

  // Create a css-in-js classNames object that will work with the component
  return useMemo(() => {
    // Each key in this object will be a className string that can be applied to elements
    const classes = {
      sectionIcon: 'detailed-content-section-icon',
      detailedContentTitle: 'detailed-content-title',
      detailedContentText: 'detailed-content-text',
      detailedContentList: 'detailed-content-list',
      detailedContentSubtitle: 'detailed-content-subtitle',
      codeBlock: 'detailed-content-code-block',
      sectionTitle: 'detailed-content-section-title',
      sectionSubtitle: 'detailed-content-section-subtitle',
      subtitleWrapper: 'detailed-content-subtitle-wrapper',
      textContent: 'detailed-content-text-content',
      listContent: 'detailed-content-list-content',
    };

    // Add global styles for these classes - would normally be in a separate GlobalStyles component
    // but this ensures the styles are applied
    if (typeof document !== 'undefined') {
      const styleId = 'detailed-content-dynamic-styles';
      let styleEl = document.getElementById(styleId) as HTMLStyleElement;

      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }

      const css = `
        .${classes.sectionIcon} {
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${rem(48)};
          height: ${rem(48)};
          border-radius: 50%;
          background-color: ${theme.black};
          padding: ${theme.spacing.xs};
          flex-shrink: 0;
        }
        .${classes.sectionIcon} svg, .${classes.sectionIcon} img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          fill: ${theme.white};
        }
        
        .${classes.detailedContentTitle} {
          font-size: ${theme.headings.sizes.h2.fontSize};
          font-weight: ${theme.headings.sizes.h2.fontWeight};
          line-height: 1.3;
          margin: 0;
          color: ${theme.black};
        }
        
        .${classes.detailedContentText} {
          font-size: ${theme.fontSizes.md};
          line-height: 1.7;
          margin-top: ${theme.spacing.md};
          color: ${theme.colors.gray[7]};
          overflow-wrap: break-word;
          word-break: break-word;
        }
        
        .${classes.detailedContentList} {
          margin-top: ${theme.spacing.md};
          margin-bottom: ${theme.spacing.lg};
        }
        
        .${classes.detailedContentList} ul {
          padding-left: ${theme.spacing.xl};
          margin: 0;
        }
        
        .${classes.detailedContentList} li {
          line-height: 1.7;
          margin-bottom: ${theme.spacing.xs};
          font-size: ${theme.fontSizes.md};
          color: ${theme.colors.gray[7]};
        }
        
        .${classes.codeBlock} {
          background-color: ${theme.colors.gray[0]};
          border-radius: ${theme.radius.md};
          padding: ${theme.spacing.lg};
          overflow-x: auto;
          margin-top: ${theme.spacing.lg};
          margin-bottom: ${theme.spacing.lg};
          font-family: ${theme.fontFamilyMonospace};
          font-size: ${theme.fontSizes.sm};
          line-height: 1.5;
          color: ${theme.black};
          white-space: pre;
        }
      `;

      styleEl.innerHTML = css;
    }

    return {
      classes,
      cx: (...args: string[]) => args.filter(Boolean).join(' ')
    };
  }, [theme]);
};