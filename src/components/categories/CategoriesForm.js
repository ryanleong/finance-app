import React from 'react';
import PropTypes from 'prop-types';
import {
    Form, FormGroup, Label, Input, Button,
} from 'reactstrap';

const CategoriesForm = props => (
    <Form onSubmit={props.onSubmit}>
        <FormGroup>
            <Label for="name">Category Name</Label>
            <Input type="text" name="name" value={props.state.name} onChange={props.onChange} />
        </FormGroup>
        <FormGroup>
            <Button color="primary">Submit</Button>
        </FormGroup>
    </Form>
);

CategoriesForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
};

export default CategoriesForm;
