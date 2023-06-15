import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/angular';
import { TipComponent } from './tip.component';

export const actionsData = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

const meta: Meta<TipComponent> = {
  title: 'Task',
  component: TipComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: TipComponent) => ({
    props: {
      ...args,
      onPinTask: actionsData.onPinTask,
      onArchiveTask: actionsData.onArchiveTask,
    },
  }),
};

export default meta;
type Story = StoryObj<TipComponent>;

export const Default: Story = {
  args: {},
};

export const Pinned: Story = {
  args: {},
};
