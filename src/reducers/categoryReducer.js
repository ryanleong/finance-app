import {
    ADD_CATEGORY, EDIT_CATEGORY, FETCH_CATEGORIES, START_FETCH_CATEGORIES, END_FETCH_CATEGORIES,
} from '../actions/types';

const initialState = {
    categoryData: {},
    isFetchingCategories: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_CATEGORY:
    case EDIT_CATEGORY:
        return {
            ...state,
            categoryData: {
                ...state.categoryData,
                [action.id]: action.payload,
            },
        };

    case FETCH_CATEGORIES:
        return {
            ...state,
            categoryData: {
                ...action.payload,
            },
        };

    case START_FETCH_CATEGORIES:
        return { ...state, isFetchingCategories: true };

    case END_FETCH_CATEGORIES:
        return { ...state, isFetchingCategories: false };

    default:
        return state;
    }
}
