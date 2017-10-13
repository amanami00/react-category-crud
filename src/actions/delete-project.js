import axios from 'axios';
import { clearCategoryState } from 'src/actions/clear-category-state';
import getCategories from 'src/actions/category-actions';
import { CATEGORY_ENDPOINT } from 'src/constants';

export const deleteCategory = categoryId => dispatch => {
    console.log(categoryId);
    console.log(`${CATEGORY_ENDPOINT}?id=${categoryId}`);
    return axios.delete(`${CATEGORY_ENDPOINT}?id=${categoryId}`).then((response) => {
        dispatch(clearCategoryState());
        return dispatch(getCategories());
    });
};
