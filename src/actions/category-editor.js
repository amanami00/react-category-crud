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

export const updateCategoryField = (field, value) => dispatch =>
    dispatch(_updateCategoryField(field, value));
