import React, { Component, PropTypes } from 'react';
import getCategories, {
    editCategory,
    updateCategory,
    deleteCategory,
    saveCategory
} from 'src/actions/category-actions';
import * as categoryAddModal from 'src/actions/category-modal';
import { connect } from 'react-redux';
import Categories from './categories';
import AddCategory from './add-category';
import EditCategory from './edit-category';
import { Alert, Pagination } from 'react-bootstrap';
import { RECENT_CATEGORIES_HEADER } from 'src/constants'

class Content extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        categories: PropTypes.array,
        page: PropTypes.number,
        isOpen: PropTypes.bool,
    };

    componentWillMount() {
        this.props.dispatch(getCategories());
    }

    handleDeleteCategory = (id) => {
        this.props.dispatch(deleteCategory(id));
    }

    handleEditCategory = (id) => {
        this.props.dispatch(editCategory(id));
    }

    handleUpdateCategory = (category, id) => {
        this.props.dispatch(updateCategory(category, id));
    }

    handleHideAlert = () => {
        this.props.dispatch(hideAlert());
    }

    render() {
        const {
            categories,
            categoryEditor,
            isOpen,
            dispatch,
         } = this.props;
        let headers = RECENT_CATEGORIES_HEADER;
        return (
            <div id="page-wrapper" className="page-flower">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">
                                Categories <small>List</small>
                            </h1>
                            <ol className="breadcrumb">
                                <li className="active">
                                    <i className="fa fa-dashboard"></i> Categories
                                </li>
                            </ol>
                            <div className="row">


                                <button
                                    type="button"
                                    onClick={ () => this.props.dispatch(categoryAddModal.opened()) }
                                    className="btn btn-primary add-category-btn"
                                >
                                    ADD CATEGORY
                                </button>


                                <AddCategory
                                    isOpen={ isOpen }
                                    dispatch= { dispatch }
                                />

                                <Categories
                                    header={ headers }
                                    rows={ categories }
                                    dispatch= { dispatch }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => ({
    categories: store.categories,
    categoryEditor: store.categoryEditor.categoryEdits,
    isOpen: store.modal.isOpen,
});

export default connect(mapStateToProps)(Content);
