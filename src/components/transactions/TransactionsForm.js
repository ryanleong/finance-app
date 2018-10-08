import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    Row, Col, Form, FormGroup, Label, Input, Button,
} from 'reactstrap';

const TransactionForm = props => (
    <Form onSubmit={props.onSubmit}>
        <Row form>
            <Col>
                <FormGroup>
                    <Label for="name">Transaction Name</Label>
                    <Input type="text" name="name" id="name" value={props.state.name} onChange={props.onChange} />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="date">Date</Label>
                    <Input type="date" name="date" id="date" value={props.state.date} onChange={props.onChange} />
                </FormGroup>
            </Col>
        </Row>
        <Row form>
            <Col>
                <FormGroup>
                    <Label for="amount">Amount</Label>
                    <Input type="text" name="amount" id="amount" value={props.state.amount} onChange={props.onChange} />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="category">Category</Label>
                    <Input type="select" name="category" id="category" value={props.state.category} onChange={props.onChange}>
                        <option value="-1">Select a Category</option>
                        {_.map(props.userData.categories, (category, key) => <option key={key} value={key}>{category.name}</option>)}
                    </Input>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label for="account">Account</Label>
                    <Input type="select" name="account" id="account" value={props.state.account} onChange={props.onChange}>
                        <option value="-1">No Account</option>
                        {_.map(props.userData.accounts, (account, key) => <option key={key} value={key}>{account.name}</option>)}
                    </Input>
                </FormGroup>
            </Col>
        </Row>
        <Row form>
            <Col>
                <FormGroup>
                    <Label for="description">Text Area</Label>
                    <Input type="textarea" name="description" id="description" value={props.state.description} onChange={props.onChange} />
                </FormGroup>
            </Col>
        </Row>
        <Row form>
            <Col>
                <FormGroup>
                    <Button>Submit</Button>
                </FormGroup>
            </Col>
        </Row>
    </Form>
);

TransactionForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
};

export default TransactionForm;
