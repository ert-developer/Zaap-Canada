// themeReducer.js
import {TOGGLE_THEME} from '../ActionTypes';

const initialState = {
  isDark: false, // The initial theme is set to light
};

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        isDark: !state.isDark, // Toggle the theme
      };
    default:
      return state;
  }
};

export default ThemeReducer;
