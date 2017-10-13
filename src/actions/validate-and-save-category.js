import { saveCategory } from 'src/actions/save-category';
import {
    clearCategoryEditor,
} from 'src/actions/category-editor';
import { reset } from 'src/actions/category-modal';
import getCategories from 'src/actions/category-actions';


export const validateAndSaveCategory = () => (dispatch, getState) => {
    const {
        categoryEditor = { ...categoryEditor }
    } = getState();

    const { categoryEdits } = categoryEditor;

    return dispatch(saveCategory(categoryEdits))
        .then((savedCategory) => {
            // const { projectId } = savedProject;
            dispatch(clearCategoryEditor());
            dispatch(reset());
            dispatch(getCategories());
        })
}
