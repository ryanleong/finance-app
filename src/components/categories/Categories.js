import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Categories = ({ categories }) => {
    if (!_.isEmpty(categories)) {
        return _.map(categories, category => (
            <li key={category.id}>
                {category.data().name}
                {' '}
                <Link to={`/categories/edit/${category.id}`}>Edit</Link>
            </li>
        ));
    }

    return null;
};

export default Categories;
