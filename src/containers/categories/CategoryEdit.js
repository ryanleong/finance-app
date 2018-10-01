import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { db } from '../../firebase';
import Navigation from '../Navigation';
import { fetchCategory, editCategory } from '../../actions/categoryActions';

class CategoryEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (!_.isEmpty(props.categories.categoryData) && state.name === '') {
            return {
                ...state,
                name: props.categories.categoryData[props.match.params.id].name,
            };
        }

        return { ...state };
    }

    componentDidUpdate() {
        // Fetch categories
        this.props.fetchCategory(this.props.authentication.uid);
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    onSubmit(evt) {
        evt.preventDefault();

        db.collection('users').doc(this.props.authentication.uid).collection('categories').doc(this.props.match.params.id)
            .update({
                name: this.state.name,
            })
            .then(() => {
                this.props.editCategory(this.state, this.props.match.params.id);

                this.props.history.push('/categories');
            });
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <h1>Edit Category</h1>

                <form onSubmit={this.onSubmit}>
                    <input type="text" name="name" placeholder="Category Name" value={this.state.name} onChange={this.onChange} />
                    <input type="submit" value="Update" />
                </form>
            </React.Fragment>
        );
    }
}

CategoryEdit.propTypes = {
    fetchCategory: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    authentication: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
    categories: state.categories,
});

export default connect(mapStateToProps, { fetchCategory, editCategory })(CategoryEdit);
