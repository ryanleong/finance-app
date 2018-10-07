import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import convertIdToName from '../Utilities';

const renderRows = ({
    transactions, accounts, categories, pageNum, perPage,
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
                const transaction = transactions[i].data();

                // Display proper string
                const category = convertIdToName(categories, transaction.category);
                const account = convertIdToName(accounts, transaction.account);
                const date = new Date(transaction.date.seconds * 1000);

                returnJSX.push(
                    <tr key={id}>
                        <td>{date.toISOString().substring(0, 10)}</td>
                        <td>{transaction.name}</td>
                        <td>{transaction.amount}</td>
                        <td>{account}</td>
                        <td>{category}</td>
                        <td>{transaction.description}</td>
                        <td>
                            <Link to={`/transactions/edit/${id}`}>Edit</Link>
                        </td>
                        {/* <td>
                            <span onClick={() => { doDelete(id); }} data-key={id}>Delete</span>
                        </td> */}
                    </tr>,
                );
            }
        }

        return returnJSX;
    }

    return null;
};

const Transactions = props => (
    <React.Fragment>
        <h3>
            Page:
            {' '}
            {props.pageNum + 1}
        </h3>
        <table>
            <thead>
                <tr>
                    <td>Date</td>
                    <td>Name</td>
                    <td>Amount</td>
                    <td>Account</td>
                    <td>Category</td>
                    <td>Description</td>
                </tr>
            </thead>

            <tbody>
                {renderRows(props)}
            </tbody>
        </table>
    </React.Fragment>
);

Transactions.propTypes = {
    pageNum: PropTypes.number.isRequired,
};

export default Transactions;
