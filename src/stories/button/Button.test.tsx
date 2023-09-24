import Button from "./Button";
import { fireEvent, render, screen } from "@testing-library/react"

test('should render and button element with the label', () => {
    const { getByText } = render(<Button label={"Click me"} type="button" style={{}} />);
    const buttonElement = getByText("Click me");
    expect(buttonElement).toBeInTheDocument();
})

test('should render and executes onClick callback when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Button label={"Click me"} type="button" style={{}} onClick={onClickMock}/>);
    const buttonElement = getByText("Click me");
    fireEvent.click(buttonElement)
    expect(onClickMock).toHaveBeenCalledTimes(1);
})

