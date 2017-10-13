import React, { Component, PropTypes } from 'react';
import { reset } from 'src/actions/category-modal';
import { updateCategoryField } from 'src/actions/category-editor';
import { validateAndSaveCategory } from 'src/actions/validate-and-save-category';
import * as categoryAddModal from 'src/actions/category-modal';
import { connect } from 'react-redux';
import CategoryTitle from './category-title.js';
import CategoryDescription from './category-description.js';

class AddCategory extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        isOpen: PropTypes.bool,
        categoryEdits: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    handleSaveCategory = () => {
        const { dispatch } = this.props;
        return dispatch(validateAndSaveCategory());
    };

    handleFieldChange(field, event) {
        return this.props.dispatch(updateCategoryField(field, event.target.value));
    }

    render() {
        const {
            categoryEdits,
            isOpen,
            dispatch
        } = this.props;

        const categoryDetails = {
            ...categoryEdits
        };

        const {
            categoryTitle = '',
            categoryDescription = '',
        } = categoryDetails;

        return (
            <div>
              <Modal isOpen={ isOpen } onRequestHide={ () => dispatch(categoryAddModal.reset()) }>
                    <ModalHeader>
                      <ModalClose onClick={ () => dispatch(categoryAddModal.reset()) }/>
                      <ModalTitle>Add Category</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <form role="form">
                            <div className="form-group">
                                <label>Title</label>
                                <CategoryTitle
                                    categoryTitle={ categoryTitle }
                                    onChange ={ this.handleFieldChange.bind(this, 'categoryTitle') }
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <CategoryDescription
                                    categoryDescription = { categoryDescription }
                                    onChange ={ this.handleFieldChange.bind(this, 'categoryDescription') }
                                />
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className='btn btn-default'
                            onClick={ () => dispatch(categoryAddModal.reset()) }
                        >
                        Close
                      </button>
                      <input type='button' onClick={this.handleSaveCategory.bind(this)} className='btn btn-primary' value='Save' />
                    </ModalFooter>
                  </Modal>
                </div>
        );
    }
}

const mapStateToProps = (store) => ({
    categoryEdits: store.categoryEditor.categoryEdits,
});

export default connect(mapStateToProps)(AddCategory);
