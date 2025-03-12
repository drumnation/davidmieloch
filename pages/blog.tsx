import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { Typography } from '../src/shared-components/atoms/Typography';
import PageTemplate from '../src/shared-components/templates/PageTemplate';

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  margin-top: 40px;
`;

const BlogCard = styled(motion.div)`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogImage = styled.div<{ image: string }>`
  height: 200px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const BlogContent = styled.div`
  padding: 20px;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #f0f7ff;
  color: #0070f3;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const FilterContainer = styled.div`
  margin-bottom: 32px;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const CenteredText = styled.div`
  text-align: center;
  margin-top: 40px;
`;

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: 'Integrating AI into Your Development Workflow',
    excerpt: 'Learn how to leverage AI tools to boost your productivity as a developer.',
    date: 'May 15, 2023',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    tags: ['AI', 'Development', 'Productivity'],
    category: 'AI'
  },
  {
    id: 2,
    title: 'Building Responsive UIs with Framer Motion',
    excerpt: 'A guide to creating beautiful animations and transitions in React applications.',
    date: 'April 3, 2023',
    image: 'https://images.unsplash.com/photo-1626908013351-800ddd734b8a',
    tags: ['React', 'Animation', 'UI/UX'],
    category: 'Frontend'
  },
  {
    id: 3,
    title: 'State Management in 2023: Beyond Redux',
    excerpt: 'Exploring modern state management solutions for React applications.',
    date: 'March 21, 2023',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    tags: ['React', 'State Management', 'Redux'],
    category: 'Frontend'
  },
  {
    id: 4,
    title: 'Optimizing Next.js Applications for Performance',
    excerpt: 'Tips and tricks to make your Next.js applications lightning fast.',
    date: 'February 10, 2023',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7',
    tags: ['Next.js', 'Performance', 'Web Development'],
    category: 'Performance'
  }
];

export default function Blog() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'AI', 'Frontend', 'Performance'];
  
  const filteredPosts = filter === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === filter);
  
  return (
    <PageTemplate
      title="Blog"
      description="Thoughts, ideas, and insights on development and technology"
    >
      <FilterContainer>
        <Typography variant="h3">
          <span>Filter by Category</span>
        </Typography>
        <FilterButtons>
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category ? "filled" : "light"}
              color="blue"
              onClick={() => setFilter(category)}
            >
              {category}
            </Button>
          ))}
        </FilterButtons>
      </FilterContainer>
      
      <BlogGrid>
        {filteredPosts.map((post, index) => (
          <BlogCard
            key={post.id}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogImage image={post.image} />
            <BlogContent>
              <BlogMeta>
                <span>{post.date}</span>
                <span>{post.category}</span>
              </BlogMeta>
              <Typography variant="h3">
                <span>{post.title}</span>
              </Typography>
              <Typography variant="body">
                <span>{post.excerpt}</span>
              </Typography>
              <TagsContainer>
                {post.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagsContainer>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
      
      {filteredPosts.length === 0 && (
        <CenteredText>
          <Typography variant="body">
            <span>No blog posts found in this category.</span>
          </Typography>
        </CenteredText>
      )}
    </PageTemplate>
  );
} 