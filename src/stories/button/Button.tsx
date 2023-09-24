import React, { ReactNode } from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

export interface ButtonProps {
  label: string | any;
  variant?: string;
  onClick?: () => void;
  children?: ReactNode;
  type: 'submit' | 'reset' | 'button';
  style: {} | undefined
}

const Button: React.FC<ButtonProps> = ({ label, variant, onClick, children, type, style }) => {
  return (
    <BootstrapButton variant={variant} onClick={onClick} type={type} style={style}>
      {label}
      {children}
    </BootstrapButton >
  );
};

export default Button;
