import { Meta, StoryFn } from '@storybook/react';
import Alert, { AlertProps } from './Alert';

export default {
    title: 'Alert',
    component: Alert,
} as Meta;

const Template: StoryFn<AlertProps> = (args) => { return (<Alert {...args} />); }


export const Playground = Template.bind({});
Playground.args = {
    text: 'This is an alert',
    variant: 'primary',
};