import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

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
        this.jumpToPage = this.jumpToPage.bind(this);
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

    jumpToPage(evt) {
        this.setState({
            pageNum: parseInt(evt.target.getAttribute('data-page'), 10),
        });
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />

                <Container>
                    <Row>
                        <Col>
                            <h1>Transactions</h1>
                        </Col>
                    </Row>

                    {this.props.userData.transactions.length < 1 ? <Col><h4>No Transactions</h4></Col> : <RenderTransactions pageNum={this.state.pageNum} perPage={process.env.REACT_APP_TRANSACTIONS_PER_PAGE} accounts={this.props.userData.accounts} categories={this.props.userData.categories} transactions={this.props.userData.transactions} doDelete={this.props.deleteTransaction} doPaginate={this.doPaginate} totalPages={this.state.totalPages} jumpToPage={this.jumpToPage} />}
                </Container>
            </React.Fragment>
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
