import React, { PropTypes } from 'react';

const CategoryItem = ({ onEdit, onDelete, category }) => {
    const editCategory = () => {
        onEdit(category.categoryId);
    };

    const deleteCategory = () => {
        onDelete(category.categoryId);
    };

    return (
        <tr>
            <td>{ category.categoryId }</td>
            <td>{ category.categoryTitle }</td>
            <td>{ category.categoryDescription }</td>
            <td>
                <a
                    href="#"
                    className="btn btn-warning btn-formatter"
                    onClick={ editCategory }
                >
                    EDIT
                </a>
                <a
                    href="#"
                    className="btn btn-danger btn-formatter"
                    onClick={ deleteCategory }
                >
                    DELETE
                </a>
            </td>
        </tr>
    );
};

CategoryItem.propTypes = {
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    category: PropTypes.object,
};

export default CategoryItem;
