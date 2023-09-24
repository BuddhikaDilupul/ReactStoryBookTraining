import Modal from "./Modal";
import { render, screen } from "@testing-library/react"

test('should render and modal element with the content', () => {
    const mockOnClose = jest.fn();
    const sampleData = { id: 1, name: 'John' };
    const sampleModalHeader = 'Sample Modal';
    render(
        <Modal
            modalHeader={sampleModalHeader}
            data={sampleData}
            show={true}
            onClose={mockOnClose} />
    );
    
    const modalHeader = screen.getByText('Sample Modal');
    expect(modalHeader).toBeInTheDocument();
})


