import React, { Component, PropTypes } from 'react';

const propTypes = {
    onChange: PropTypes.func.isRequired,
    categoryDescription: PropTypes.string
};

const CategoryDescription = ({
    categoryDescription,
    onChange
}) => {
    return (
        <input
            className="form-control"
            onChange={ onChange }
            value={ categoryDescription }

        />
    );
};

CategoryDescription.propTypes = propTypes;

export default CategoryDescription;
