import Table from "./Table";
import { render, screen } from "@testing-library/react"

test('should render and table element with the labels and data', () => {
    const headers = ["id", "name"];
    const headersExpected = ["id", "name", "Action"];
    const data = [["1", "abc"], ["2", "abc"]];
    const onViewClick = jest.fn();
    const onEditClick = jest.fn();
    const onDeleteClick = jest.fn();
    render(
        <Table
            headers={headers}
            data={data}
            onViewClick={onViewClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
        />);
    // Check if the headers are present in the table
    headersExpected.forEach((headersExpected) => {
        const headerElement = screen.getByText(headersExpected);
        expect(headerElement).toBeInTheDocument();
    });

})


