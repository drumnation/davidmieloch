import React from 'react';
import { motion } from 'framer-motion';
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

// Framer Motion variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    } 
  }
};

// Separate component for media item to reduce serialization overhead
const LazyMediaItem = ({ item, index }: { item: MediaItemType, index: number }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px 100px 0px" }}
      variants={scaleInVariants}
      transition={{ delay: index * 0.15 }}
    >
      <MediaItem>
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
      </MediaItem>
    </motion.div>
  );
};

export const FeaturedMedia: React.FC<FeaturedMediaProps> = ({ className }) => {
  return (
    <BioSection className={className} id="featured-media">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        variants={fadeInVariants}
      >
        <BioSectionTitle>
          Featured Media
        </BioSectionTitle>
      </motion.div>
      <MediaContainer>
        {MEDIA_ITEMS.map((item, index) => (
          <LazyMediaItem key={`media-${index}`} item={item} index={index} />
        ))}
      </MediaContainer>
    </BioSection>
  );
};

export default FeaturedMedia; 