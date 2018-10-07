import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Row, Col, Table, Button, Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';

import convertIdToName from '../Utilities';

const renderRows = ({
    transactions, accounts, categories, pageNum, perPage, doDelete,
}) => {
    if (transactions.length > 0) {
        const returnJSX = [];
        const startIndex = pageNum * perPage;

        // Set endIndex to length of transaction or next set. whichever is samller
        let endIndex = startIndex + parseInt(perPage, 10);
        endIndex = endIndex > transactions.length ? transactions.length : endIndex;

        for (let i = startIndex; i < endIndex; i += 1) {
            if (transactions[i] !== undefined) {
                const { id } = transactions[i];
                const transaction = transactions[i];

                // Display proper string
                const category = convertIdToName(categories, transaction.category);
                const account = convertIdToName(accounts, transaction.account);

                returnJSX.push(
                    <tr key={id}>
                        <td>{transaction.date.toISOString().substring(0, 10)}</td>
                        <td>{transaction.name}</td>
                        <td>{transaction.amount}</td>
                        <td>{account}</td>
                        <td>{category}</td>
                        <td>{transaction.description}</td>
                        <td>
                            <Button color="primary" tag={Link} to={`/transactions/edit/${id}`}>Edit</Button>
                        </td>
                        <td>
                            <Button color="danger" onClick={() => { if (window.confirm('Confirm deletion?')) doDelete(id); }}>Delete</Button>
                        </td>
                    </tr>,
                );
            }
        }

        return returnJSX;
    }

    return null;
};

const renderPagination = (totalPages, jumpToPage) => {
    const paginationNumbers = [];

    for (let i = 0; i < totalPages; i += 1) {
        paginationNumbers.push(
            <PaginationItem key={i}>
                <PaginationLink onClick={jumpToPage} data-page={i}>{i + 1}</PaginationLink>
            </PaginationItem>,
        );
    }

    return paginationNumbers;
};

const Transactions = props => (
    <React.Fragment>
        <Row>
            <Col>
                <h3>
                Page:
                    {' '}
                    {props.pageNum + 1}
                </h3>
            </Col>
        </Row>

        <Row>
            <Col>
                <Table responsive>
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Name</td>
                            <td>Amount</td>
                            <td>Account</td>
                            <td>Category</td>
                            <td>Description</td>
                            <td />
                            <td />
                        </tr>
                    </thead>

                    <tbody>
                        {renderRows(props)}
                    </tbody>
                </Table>
            </Col>
        </Row>

        <Row>
            <Pagination aria-label="Page navigation example">
                <PaginationItem>
                    <PaginationLink previous onClick={props.doPaginate} id="prev" />
                </PaginationItem>
                {renderPagination(props.totalPages, props.jumpToPage)}
                <PaginationItem>
                    <PaginationLink next onClick={props.doPaginate} id="next" />
                </PaginationItem>
            </Pagination>
        </Row>

    </React.Fragment>
);

Transactions.propTypes = {
    doPaginate: PropTypes.func.isRequired,
    jumpToPage: PropTypes.func.isRequired,
    pageNum: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
};

export default Transactions;
