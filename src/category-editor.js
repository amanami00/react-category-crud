import {
    CLEAR_CATEGORY_EDITOR,
    CATEGORY_FIELD_UPDATED
} from 'src/action-types';

export const clearCategoryEditor = () => ({ type: CLEAR_CATEGORY_EDITOR });

const _updateCategoryField = (field, value) => ({
    type: CATEGORY_FIELD_UPDATED,
    field,
    value
});

export default const updateCategoryField = (field, value) => dispatch =>
    alert('h1ll');
    // dispatch(_updateCategoryField(field, value));
