import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {
    Col, Card, CardBody, CardTitle, Button, CardText,
} from 'reactstrap';

const Accounts = ({ accounts }) => {
    if (!_.isEmpty(accounts)) {
        return _.map(accounts, (account, id) => (
            <Col lg="3" md="4" key={id}>
                <Card>
                    <CardBody>
                        <CardTitle>{account.name}</CardTitle>
                        <CardText>Card Description</CardText>
                        <Button tag={Link} to={`/accounts/edit/${id}`}>Edit</Button>
                    </CardBody>
                </Card>
            </Col>
        ));
    }

    return null;
};

export default Accounts;
