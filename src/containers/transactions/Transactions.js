import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navigation from '../../components/Navigation';
import RenderTransactions from '../../components/transactions/Transactions';
import fetchData from '../../actions/userDataActions';

class Transactions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNum: 0,
        };
    }

    componentDidMount() {
        this.props.fetchData();
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


                {this.props.userData.transactions.length < 1 ? null : <RenderTransactions pageNum={this.state.pageNum} perPage={10} accounts={this.props.userData.accounts} categories={this.props.userData.categories} transactions={this.props.userData.transactions} />}
            </div>
        );
    }
}

Transactions.propTypes = {
    fetchData: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userData: state.userData,
});

export default connect(mapStateToProps, { fetchData })(Transactions);
