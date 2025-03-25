import React from 'react';
import { useSpring, useInView, animated } from '@react-spring/web';
import { 
  BioSection, 
  BioSectionTitle, 
  MediaContainer,
  MediaItem,
  MediaTitle,
  MediaDescription,
  EmbedContainer
} from '../../Bio.styles';
import { MEDIA_ITEMS } from '../../Bio.constants';
import { FeaturedMediaProps } from './FeaturedMedia.types';
import { MediaItem as MediaItemType } from '../../Bio.types';

const AnimatedMediaItem = animated(MediaItem);

// Separate component for media item to reduce serialization overhead
const LazyMediaItem = ({ item, index }: { item: MediaItemType, index: number }) => {
  // Use React Spring's useInView hook for intersection observation
  const [ref, inView] = useInView({
    once: true,
    rootMargin: '0px 0px 100px 0px'
  });
  
  // Define animations with initial opacity 1
  const animations = useSpring({
    opacity: 1, // Always visible
    transform: 'scale(1)', // Always in final position
    config: { tension: 280, friction: 60 },
    delay: index * 150
  });

  return (
    <AnimatedMediaItem 
      ref={ref} 
      style={animations}
    >
      <MediaTitle>{item.title}</MediaTitle>
      <MediaDescription>
        {item.description}
      </MediaDescription>
      <EmbedContainer>
        {item.type === 'youtube' && (
          <iframe
            width="100%"
            height="200"
            src={item.url}
            title={item.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {item.type === 'soundcloud' && (
          <iframe
            width="100%"
            height="200"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={item.url}
          />
        )}
      </EmbedContainer>
    </AnimatedMediaItem>
  );
};

export const FeaturedMedia: React.FC<FeaturedMediaProps> = ({ className }) => {
  // Heading animation
  const [headingRef, headingInView] = useInView({
    once: true,
    rootMargin: '0px 0px -100px 0px'
  });

  const headingAnimation = useSpring({
    opacity: 1, // Always visible
    transform: 'translateY(0)', // Always in final position
    config: { tension: 280, friction: 60 }
  });

  const AnimatedBioSectionTitle = animated(BioSectionTitle);

  return (
    <BioSection className={className} id="featured-media">
      <AnimatedBioSectionTitle ref={headingRef} style={headingAnimation}>
        Featured Media
      </AnimatedBioSectionTitle>
      <MediaContainer>
        {MEDIA_ITEMS.map((item, index) => (
          <LazyMediaItem key={`media-${index}`} item={item} index={index} />
        ))}
      </MediaContainer>
    </BioSection>
  );
};

export default FeaturedMedia; 