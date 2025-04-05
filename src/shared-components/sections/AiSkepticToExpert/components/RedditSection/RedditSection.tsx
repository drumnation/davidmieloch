import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../../../atoms/Typography';
import { RedditIcon } from '../../AiSkepticToExpert.logic';
import * as S from './RedditSection.styles';

export interface RedditSectionProps {
  url: string;
  title: string;
  commentCount: number;
  upvoteCount: number;
  subreddit: string;
  className?: string;
}

export const RedditSection: React.FC<RedditSectionProps> = ({
  url,
  title,
  commentCount,
  upvoteCount,
  subreddit = 'ExperiencedDevs',
  className,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <S.RedditLink 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={className}
      >
        <S.RedditLinkContent>
          <S.RedditIconColumn>
            <RedditIcon />
          </S.RedditIconColumn>
          
          <S.RedditContentColumn>
            <div style={{ color: '#000000' }}>
              <Typography variant="caption" weight="bold" className="mb-1">
                🔥 Trending on r/{subreddit}
              </Typography>
            </div>
            <div style={{ color: '#6772e5' }}>
              <Typography variant="body" weight="bold" className="mb-1">
                &ldquo;{title}&rdquo;
              </Typography>
            </div>
            <Typography variant="caption" color="secondary" className="text-gray-600">
              💬 {commentCount} comments &nbsp;&nbsp; ⬆️ {upvoteCount} upvotes
            </Typography>
          </S.RedditContentColumn>
        </S.RedditLinkContent>
      </S.RedditLink>
    </motion.div>
  );
};

export default RedditSection; 