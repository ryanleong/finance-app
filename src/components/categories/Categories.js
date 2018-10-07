import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Categories = ({ categories }) => {
    if (!_.isEmpty(categories)) {
        return _.map(categories, (category, id) => (
            <li key={id}>
                {category.name}
                {' '}
                <Link to={`/categories/edit/${id}`}>Edit</Link>
            </li>
        ));
    }

    return null;
};

export default Categories;
