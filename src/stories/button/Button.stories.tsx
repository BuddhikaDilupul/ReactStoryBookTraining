import { Meta, StoryFn } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const PlayGround = Template.bind({});
PlayGround.args = {
  label: 'Primary Button',
  variant: 'Primary',
  onClick: () => {alert('Primary Button Clicked')},
};
