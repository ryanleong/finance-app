import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { db } from '../../firebase';
import Navigation from '../Navigation';
import { fetchCategory } from '../../actions/categoryActions';

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidUpdate() {
        if (this.props.authentication.uid !== undefined) {
            db.collection('users').doc(this.props.authentication.uid).collection('categories').get()
                .then((results) => {
                    let categoryList = {};

                    results.docs.forEach((doc) => {
                        categoryList = {
                            ...categoryList,
                            [doc.id]: '',
                        };
                    });

                    this.props.fetchCategory(categoryList);
                });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <h1>Category</h1>

            </React.Fragment>
        );
    }
}

Category.propTypes = {
    fetchCategory: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
});

export default connect(mapStateToProps, { fetchCategory })(Category);
