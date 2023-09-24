import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import FormGroup, { FormGroupProps } from './TextFeild';

export default {
  title: 'FormGroup',
  component: FormGroup,
} as Meta;

const Template: StoryFn<FormGroupProps> = (args: FormGroupProps) => <FormGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  controlId: 'formGridExample',
  type: 'text',
  placeholder: 'Enter value',
  name: 'exampleField',
  handleChange: () => { },
  handleBlur: () => { },
  isValid: true,
  isInvalid: false,
  value: 'Example Value',
  feedbackText: 'This field is required.',
  className:'mb-3'
};
