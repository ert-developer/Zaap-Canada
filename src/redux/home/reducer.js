// reducers.js
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  TOGGLE_CATEGORY,
  FETCH_SPOTLIGHT_REQUEST,
  FETCH_SPOTLIGHT_SUCCESS,
  FETCH_SPOTLIGHT_FAILURE,
} from '../ActionTypes';

const initialState = {
  categories: [],
  loading: false,
  error: null,
  jobs: [],
  selectedCategories: [],
  spotLight: [],
  currentPage: 1,
  pageSize: 10,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_JOBS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TOGGLE_CATEGORY:
      const category = action.payload;
      const selectedCategories = state.selectedCategories.includes(category)
        ? state.selectedCategories.filter(item => item !== category)
        : [...state.selectedCategories, category];
      return {...state, selectedCategories};

    case FETCH_SPOTLIGHT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SPOTLIGHT_SUCCESS:
      return {
        ...state,
        spotLight: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_SPOTLIGHT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default homeReducer;
