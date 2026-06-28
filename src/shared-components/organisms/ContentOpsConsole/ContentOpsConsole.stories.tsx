import type { Meta, StoryObj } from '@storybook/react';

import { contentOpsFixture } from '../../../content-ops/fixtures';

import { ContentOpsConsole } from './ContentOpsConsole';

const meta = {
  title: 'Content Ops Console/07 Full Journey',
  component: ContentOpsConsole,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ContentOpsConsole>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullJourney: Story = {
  args: {
    snapshot: contentOpsFixture,
    mode: 'full',
  },
};

export const Overview: Story = {
  name: '01 Overview',
  args: {
    snapshot: contentOpsFixture,
    mode: 'overview',
  },
};

export const NeedsScheduling: Story = {
  name: '02 Needs Scheduling',
  args: {
    snapshot: contentOpsFixture,
    mode: 'scheduling',
  },
};

export const ScheduleBoard: Story = {
  name: '03 Schedule Board',
  args: {
    snapshot: contentOpsFixture,
    mode: 'scheduling',
  },
};

export const ReadinessAndBlockers: Story = {
  name: '04 Readiness And Blockers',
  args: {
    snapshot: contentOpsFixture,
    mode: 'readiness',
  },
};

export const AgentActions: Story = {
  name: '05 Agent Actions',
  args: {
    snapshot: contentOpsFixture,
    mode: 'agent',
  },
};

export const Receipts: Story = {
  name: '06 Receipts',
  args: {
    snapshot: contentOpsFixture,
    mode: 'receipts',
  },
};
