import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Modal, { ModalProps } from './Modal';

export default {
  title: 'Modal',
  component: Modal,
} as Meta;

const Template: StoryFn<ModalProps> = (args) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow}>Open Modal</button>
      <Modal {...args} show={show} onClose={handleClose} />
    </>
  );
};

export const PlayGround = Template.bind({});
PlayGround.args = {
  show: false, 
};
