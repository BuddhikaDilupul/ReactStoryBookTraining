import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai';
import Button from '../button/Button';

export interface TableProps {
    headers?: string[];
    data?: string[][];
    onViewClick?: (rowData: {}) => void;
    onEditClick?: (rowData: {}) => void;
    onDeleteClick?: (rowData: {}) => void;
}

const CustomTable: React.FC<TableProps> = ({ headers, data, onViewClick, onEditClick, onDeleteClick }) => {
    return (
        <BootstrapTable striped bordered hover>
            <thead>
                <tr>
                    {headers &&
                        headers.length > 0 &&
                        headers.map((value, index) => (
                            <th key={index}>{value}</th>
                        ))}
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {data && headers &&
                    data.length > 0 &&
                    data.map((rowData: object | undefined, rowIndex: number) => {
                        if (typeof rowData === "object" && rowData !== null) {
                            // If rowData is an object
                            const propertyValues = Object.values(rowData);
                            return (
                                <tr key={rowIndex}>
                                    {propertyValues.map((value: string, cellIndex: number) => (
                                        <td key={cellIndex}>{value}</td>
                                    ))}
                                    <td>
                                        <Button
                                            label={<AiFillEye />}
                                            variant="link"
                                            onClick={() => onViewClick && onViewClick(rowData)}
                                            type='button'
                                            style={{ color: 'primary' }}
                                        />
                                        <Button
                                            label={<AiFillEdit />}
                                            variant="link"
                                            onClick={() => onEditClick && onEditClick(rowData)}
                                            type='button'
                                            style={{ color: 'primary' }}
                                        />
                                        <Button
                                            label={<AiFillDelete />}
                                            variant="link"
                                            onClick={() => onDeleteClick && onDeleteClick(rowData)}
                                            type='button'
                                            style={{ color: 'red' }}
                                        />
                                    </td>
                                </tr>
                            );
                        } else {
                            return (
                                <tr key={rowIndex}>
                                    <td colSpan={headers.length + 1}>Invalid data</td>
                                </tr>
                            );
                        }
                    })}
            </tbody>



        </BootstrapTable>
    );
};

export default CustomTable;
