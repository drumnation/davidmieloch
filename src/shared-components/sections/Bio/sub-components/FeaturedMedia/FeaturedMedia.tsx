import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  BioSection, 
  BioSectionTitle, 
  MediaContainer,
  MediaItem,
  MediaTitle,
  MediaDescription,
  EmbedContainer,
  fadeIn,
  scaleIn
} from '../../Bio.styles';
import { MEDIA_ITEMS } from '../../Bio.constants';
import { FeaturedMediaProps } from './FeaturedMedia.types';
import { MediaItem as MediaItemType } from '../../Bio.types';

// Separate component for media item to reduce serialization overhead
const LazyMediaItem = ({ item, index }: { item: MediaItemType, index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0.1 }
    );

    observer.observe(itemRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <MediaItem 
      key={`media-${index}`}
      as={motion.div}
      variants={scaleIn}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      ref={itemRef}
    >
      <EmbedContainer>
        {isVisible && (
          <>
            {item.type === 'youtube' && (
              <iframe
                src={`${item.url}?mute=0&volume=100`}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            )}
            {item.type === 'soundcloud' && (
              <iframe
                src={item.url}
                title={item.title}
                frameBorder="0"
                allow="autoplay"
                loading="lazy"
              />
            )}
          </>
        )}
      </EmbedContainer>
      <MediaTitle>{item.title}</MediaTitle>
      {item.description && (
        <MediaDescription>{item.description}</MediaDescription>
      )}
    </MediaItem>
  );
};

export const FeaturedMedia: React.FC<FeaturedMediaProps> = ({ className }) => {
  return (
    <BioSection className={className} id="featured-media">
      <BioSectionTitle variants={fadeIn}>Featured Media</BioSectionTitle>
      <MediaContainer>
        {MEDIA_ITEMS.map((item, index) => (
          <LazyMediaItem key={index} item={item} index={index} />
        ))}
      </MediaContainer>
    </BioSection>
  );
};

export default FeaturedMedia; 