import { Meta, StoryFn } from '@storybook/react';
import CustomTable, { TableProps } from './Table';

export default {
  title: 'Table',
  component: CustomTable,
} as Meta;

const Template: StoryFn<TableProps> = (args) => {
  return (
    <CustomTable {...args} />
  );
};

export const PlayGround = Template.bind({});
PlayGround.args = {
  headers: ['Header1', 'Header2'],
  data: [['data1', 'data2']],
};
