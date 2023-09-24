import Alert from "./Alert";
import { render, screen } from "@testing-library/react"

test('should render and alert element with the content', () => {
    render(
        <Alert
            text="This testing text" variant="success"
        />
    );
    const textContent = screen.getByText("This testing text");
    expect(textContent).toBeInTheDocument();
})