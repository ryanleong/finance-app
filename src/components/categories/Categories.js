import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Categories = ({ categories, doDelete }) => {
    if (!_.isEmpty(categories)) {
        return _.map(categories, (category, id) => (
            <li key={id}>
                {category.name}
                {' '}
                <Link to={`/categories/edit/${id}`}>Edit</Link>
                <span onClick={() => { if (window.confirm('Confirm deletion?')) doDelete(id); }} data-key={id}>Delete</span>
            </li>
        ));
    }

    return null;
};

export default Categories;
