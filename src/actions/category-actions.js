import axios from 'axios';
import {
    CATEGORIES_FETCHED,
    CATEGORIES_FETCHED_FAILURE,
    SAVE_CATEGORY_COMPLETED,
    SAVE_CATEGORY_ERROR,
    EDIT_CATEGORY_STARTED,
    UPDATE_CATEGORY_COMPLETED,
    UPDATE_CATEGORY_ERROR,
    DELETE_CATEGORY_COMPLETED,
    DELETE_CATEGORY_ERROR,
    CATEGORY_FIELD_UPDATED,
    CATEGORY_UPDATED,
    CLEAR_CATEGORY_EDITOR,
    CATEGORY_ADD_MODAL_RESET
} from 'src/action-types';

export const categoryApi = 'http://react.schaudhari.mr.devorch.com/category.php';

const getCategories = () =>
    dispatch =>
        axios.get(`${categoryApi}`)
        .then((response) => {
            dispatch({ type: CATEGORIES_FETCHED, payload: response.data });
        })
        .catch((err) => {
            console.log('Error:' + err);
            dispatch({ type: CATEGORIES_FETCHED_FAILURE, payload: err.results });
        });

export default getCategories;

export const headers = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

export const clearCategoryEditor = () => ({ type: CLEAR_CATEGORY_EDITOR });

export const updateCategoryField = (field, value) => dispatch =>
    dispatch(_updateCategoryField(field, value));

const _updateCategoryField = (field, value) => ({
    type: CATEGORY_FIELD_UPDATED,
    field,
    value
});

const categoryUpdated = category => ({
    type: CATEGORY_UPDATED,
    category
});

const resetCategoryAddModal = () => ({
    type: CATEGORY_ADD_MODAL_RESET
});

export const saveCategory = () => (dispatch, getState) => {
    const {
        categoryEditor = { ...categoryEditor }
    } = getState();

    const { categoryEdits } = categoryEditor;
    axios.post(categoryApi, categoryEdits, headers)
        .then((response) => {
            dispatch(categoryUpdated(response.data.results));
            dispatch(clearCategoryEditor());
            dispatch(resetCategoryAddModal());
            dispatch(getCategories());
        });
}

// export const saveCategory = (category) =>
//     dispatch =>
//         axios.post(categoryApi, category, headers)
//         .then((response) => {
//             if (response.data.results) {
//             	dispatch({ type: SAVE_CATEGORY_COMPLETED, payload: response.data.results });
//                 dispatch(fetchCategories());
//            }
//             else {
//                 dispatch({ type: SAVE_CATEGORY_ERROR, payload: response.data.error });
//             }
//         });

export const editCategory = (id) =>
    dispatch =>
        dispatch({ type: EDIT_CATEGORY_STARTED, payload: id });

export const updateCategory = (category, id) =>
    dispatch =>
        axios.put(`${categoryApi}?id=${id}`, category, headers)
        .then((response) => {
            if (response.data.results){
                dispatch({ type: UPDATE_CATEGORY_COMPLETED, payload: response.data.results });
                dispatch(fetchCategories());
            }
            else {
                dispatch({ type: UPDATE_CATEGORY_ERROR, payload: response.data.error });
            }
        });

export const deleteCategory = (id) =>
    dispatch =>
        axios.delete(`${categoryApi}?id=${id}`)
        .then((response) => {
            dispatch({ type: DELETE_CATEGORY_COMPLETED, payload: response.data.results });
            dispatch(fetchCategories());
        })
        .catch((err) => {
            dispatch({ type: DELETE_CATEGORY_ERROR, payload: err });
        });
