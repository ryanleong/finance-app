import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { db } from '../../firebase';
import Navigation from '../Navigation';
import { addCategory } from '../../actions/categoryActions';

const INITIAL_STATE = {
    name: '',
};


class CategoryAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(evt) {
        evt.preventDefault();

        db.collection('users').doc(this.props.authentication.uid).collection('categories')
            .add({
                name: this.state.name,
            })
            .then((docRef) => {
                this.props.addCategory(this.state, docRef.id);

                this.props.history.push('/categories');
            });
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <h1>Add Category</h1>

                <form onSubmit={this.onSubmit}>
                    <input type="text" name="name" placeholder="Category Name" value={this.state.name} onChange={this.onChange} />
                    <input type="submit" value="Submit" />
                </form>
            </React.Fragment>
        );
    }
}

CategoryAdd.propTypes = {
    addCategory: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
});

export default connect(mapStateToProps, { addCategory })(CategoryAdd);
