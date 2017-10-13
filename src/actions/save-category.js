import axios from 'axios';
import { CATEGORY_UPDATED } from 'src/action-types';
import { CATEGORY_ENDPOINT } from 'src/constants';

export const headers = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const categoryUpdated = category => ({
    type: CATEGORY_UPDATED,
    category
});

const sendCategory = category => {
    return axios.post(CATEGORY_ENDPOINT, category, headers);
}

export const saveCategory = category => dispatch => {
    return sendCategory(category)
    .then((response) => {
        let updatedCategory = response.data.results;
        dispatch(categoryUpdated(response.data.results));
        return updatedCategory;
    });
};
