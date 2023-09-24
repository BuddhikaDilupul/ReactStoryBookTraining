import React, { ReactNode } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

export interface AlertProps {
    text: string;
    variant?: string;
    children?: ReactNode;
}

const Alert: React.FC<AlertProps> = ({ text, variant, children }) => {
    return (
        <BootstrapAlert variant={variant}>
            {text}
            {children} 
        </BootstrapAlert>
    );
};

export default Alert;
