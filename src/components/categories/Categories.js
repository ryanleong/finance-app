import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {
    Col, Card, CardBody, CardTitle, Button, CardText,
} from 'reactstrap';

const Categories = ({ categories, doDelete }) => {
    if (!_.isEmpty(categories)) {
        return _.map(categories, (category, id) => (
            <Col lg="3" md="4">
                <Card>
                    <CardBody>
                        <CardTitle>{category.name}</CardTitle>
                        <CardText>Card Description</CardText>
                        <Button tag={Link} to={`/categories/edit/${id}`}>Edit</Button>
                        <Button color="danger" onClick={() => { if (window.confirm('Confirm deletion?')) doDelete(id); }}>Delete</Button>
                    </CardBody>
                </Card>
            </Col>
        ));
    }

    return null;
};

export default Categories;
