import React, { Component, PropTypes } from 'react';
import { deleteCategory } from 'src/actions/delete-project';
import DeleteConfirmationModal from '../delete-confirmation-modal/delete-confirmation-modal';
import { deleteConfirmationMessages } from './i18n';

class Categories extends Component {
    static propTypes = {
        header: PropTypes.array,
        rows: PropTypes.array,
        dispatch: PropTypes.func,
    };

    state = {
        categoryToDelete: 0,
        showConfirmationModal: false,
        deleteProjectInProgress: false
    }

    handleCancelDeleteCategory = () => {
        this.setState({ showConfirmationModal: false });
        return null;
    };

    handleDeleteCategory = () => {
        const { dispatch } = this.props;
        const { categoryToDelete } = this.state;
        this.setState({showConfirmationModal: false });
        return dispatch(deleteCategory(categoryToDelete));
    };

    handleDeleteCategoryConfirm = categoryId => {
        this.setState({ categoryToDelete: categoryId });
        this.setState({showConfirmationModal: true });
        return null;
    };

    render() {
        const {
            header,
            rows,
            dispatch
        } = this.props;

        const {
            showConfirmationModal,
            deleteProjectInProgress
         } = this.state;


        return (
            <form className="CategoryForm">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            {
                                header.map((col) =>
                                    <th key={ col }>{ col }</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map((row, index) =>
                                <tr
                                    key={ row.categoryId }
                                >
                                    <td key= { row.categoryId }>{ row.categoryId }</td>
                                    <td key= { row.categoryTitle }>{ row.categoryTitle }</td>
                                    <td key= { row.categoryDescription }>{ row.categoryDescription }</td>
                                    <td>
                                        <a
                                            href="#"
                                            className="btn btn-warning btn-formatter btn-sm"
                                            onClick={ () => dispatch(categoryAddModal.opened()) }
                                        >
                                            EDIT
                                        </a>
                                        <a
                                            href="#"
                                            className="btn btn-danger btn-formatter btn-sm"
                                            onClick={ this.handleDeleteCategoryConfirm.bind(this, row.categoryId) }
                                        >
                                            DELETE
                                        </a>
                                    </td>

                                </tr>
                            )
                        }
                    </tbody>
                </table>
               { showConfirmationModal &&
                    <DeleteConfirmationModal
                        isOpen={ showConfirmationModal }
                        onCancel={ this.handleCancelDeleteCategory }
                        onConfirmation={ this.handleDeleteCategory }
                        deleteInProgress={ deleteProjectInProgress }
                        messages={ {
                            header: { ...deleteConfirmationMessages.header },
                            main: deleteConfirmationMessages.main
                        } }
                    />
            }
            </form>
        );
    }
}

export default Categories;
