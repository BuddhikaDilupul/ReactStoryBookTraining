import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface ModalProps {
    show: boolean;
    onClose: () => void;
    data: {};
    modalHeader: string;
}

const CustomModal: React.FC<ModalProps> = ({ show, onClose, data, modalHeader }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{modalHeader}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <tr>
                    <Modal.Body>
                        <table>
                            <tbody>
                                {Object.entries(data).map(([key, value]) => (
                                    <tr key={key}>
                                        <td>{key}:</td>
                                        <td>{String(value)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Modal.Body>
                </tr>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
