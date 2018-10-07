import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navigation from '../../components/Navigation';
import RenderTransactions from '../../components/transactions/Transactions';
import fetchData from '../../actions/userDataActions';
import { deleteTransaction } from '../../actions/transactionsActions';

class Transactions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNum: 0,
            totalPages: -1,
        };

        this.doPaginate = this.doPaginate.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        // Set total number of pages
        if (state.totalPages === -1 && props.userData.transactions.length > 0) {
            return {
                ...state,
                totalPages: Math.ceil(props.userData.transactions.length / process.env.REACT_APP_TRANSACTIONS_PER_PAGE),
            };
        }

        return null;
    }

    componentDidMount() {
        this.props.fetchData();
    }

    doPaginate(evt) {
        const { pageNum, totalPages } = this.state;
        const newPage = evt.target.id === 'prev' ? pageNum - 1 : pageNum + 1;

        if (newPage >= 0 && newPage < totalPages) {
            this.setState({
                pageNum: newPage,
            });
        }
    }

    render() {
        return (
            <div>
                <Navigation />
                <h1>Transactions</h1>

                <div className="pagination">
                    <span onClick={this.doPaginate} id="prev">Previous</span>
                    <span onClick={this.doPaginate} id="next">Next</span>
                </div>


                {this.props.userData.transactions.length < 1 ? null : <RenderTransactions pageNum={this.state.pageNum} perPage={process.env.REACT_APP_TRANSACTIONS_PER_PAGE} accounts={this.props.userData.accounts} categories={this.props.userData.categories} transactions={this.props.userData.transactions} doDelete={this.props.deleteTransaction} />}
            </div>
        );
    }
}

Transactions.propTypes = {
    fetchData: PropTypes.func.isRequired,
    deleteTransaction: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userData: state.userData,
});

export default connect(mapStateToProps, { fetchData, deleteTransaction })(Transactions);
