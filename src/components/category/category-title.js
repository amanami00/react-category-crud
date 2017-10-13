import React, { Component, PropTypes } from 'react';

const propTypes = {
    onChange: PropTypes.func.isRequired,
    categoryTitle: PropTypes.string
};

const CategoryTitle = ({
    categoryTitle,
    onChange
}) => {
    return (
        <input
            className="form-control"
            onChange={ onChange }
            value={ categoryTitle }

        />
    );
};

CategoryTitle.propTypes = propTypes;

export default CategoryTitle;
