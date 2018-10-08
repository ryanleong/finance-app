import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import Navigation from '../../components/Navigation';
import CatgoriesForm from '../../components/categories/CategoriesForm';
import fetchData from '../../actions/userDataActions';
import { editCategory } from '../../actions/categoryActions';

const INITIAL_STATE = {
    name: '',
};

class CategoriesEdit extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        // Get label name by id
        if (state.name === '') {
            const label = props.userData.categories[props.match.params.id];
            return {
                ...state,
                name: label === undefined ? '' : label.name,
            };
        }

        return state;
    }

    componentDidMount() {
        this.props.fetchData();
    }

    componentDidUpdate(prevProps) {
        // Redirect if successfully added
        if (prevProps.userData.isUpdatingCategory && !prevProps.userData.hasFailed
            && !this.props.userData.isUpdatingCategory && !this.props.userData.hasFailed) {
            this.props.history.push('/categories');
        }
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.props.editCategory(this.state.name, this.props.match.params.id);
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <Container>
                    <Row>
                        <Col>
                            <h1>Edit Category</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <CatgoriesForm onSubmit={this.onSubmit} onChange={this.onChange} state={this.state} />
                        </Col>
                    </Row>

                </Container>
            </React.Fragment>
        );
    }
}

CategoriesEdit.propTypes = {
    fetchData: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userData: state.userData,
});

export default connect(mapStateToProps, { fetchData, editCategory })(CategoriesEdit);
