export * from './Categories';
export * from './LetsWorkTogether';
export * from './Conclusion';
export * from './ReactNativeFeature';

export {
  DetailedContentContainer,
  DetailedContentTitle,
  DetailedContentText,
  DetailedContentList,
  TitleWrapper,
  SectionIcon,
  SectionSubtitle,
  TextContent,
  ListContent,
  ListItem,
  CodeBlock,
  IconWrapper,
  TitleWithIconWrapper
} from './DetailedContent/DetailedContent.styles';

// Export SectionTitle with a different name to avoid conflict
export { SectionTitle as DetailedSectionTitle } from './DetailedContent/DetailedContent.styles'; 