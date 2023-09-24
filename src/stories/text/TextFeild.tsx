import React from 'react';
import { Form, Col } from 'react-bootstrap';

export interface FormGroupProps {
    label: string;
    controlId: string;
    type: string;
    placeholder: string;
    name: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    isValid: boolean | undefined;
    isInvalid: boolean | undefined;
    value: string;
    feedbackText: string | undefined;
    className: string | any;
}

const FormGroup: React.FC<FormGroupProps> = ({
    controlId,
    type,
    placeholder,
    name,
    handleChange,
    handleBlur,
    isValid,
    isInvalid,
    value,
    feedbackText,
    label, className
}) => {
    return (
        <Form.Group as={Col} controlId={controlId}>
            <Form.Label><b>{label}</b></Form.Label>
            <Form.Control
                className={className}
                type={type}
                placeholder={placeholder}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={isValid}
                isInvalid={isInvalid}
                value={value}
            />
            <Form.Control.Feedback type="invalid">
                {feedbackText}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default FormGroup;
