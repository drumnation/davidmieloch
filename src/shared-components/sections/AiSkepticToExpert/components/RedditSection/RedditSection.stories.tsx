import type { Meta, StoryObj } from '@storybook/react';
import { RedditSection } from './RedditSection';

const meta = {
  title: 'Pages/01-WhitePaper/01-AiSkepticToExpert/01-RedditSection',
  component: RedditSection,
  parameters: {
    layout: 'centered',
  },
  args: {
    url: "https://www.reddit.com/r/ExperiencedDevs/comments/1j7aqsx/ai_coding_mandates_at_work/?share_id=Dhejf8gsX_-YUsuIH1nNE&utm_medium=ios_app&utm_name=ioscss&utm_content=share&utm_term=1",
    title: "AI coding mandates at work?",
    commentCount: 286,
    upvoteCount: 283,
    subreddit: "ExperiencedDevs"
  }
} satisfies Meta<typeof RedditSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomSubreddit: Story = {
  args: {
    subreddit: "programming"
  }
}; 