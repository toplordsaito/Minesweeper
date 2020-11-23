import { SWITCH_THEME } from '../actions/switchTheme';
import { THEMES } from '../../styles/theme';

const initialState = {
  colorData: THEMES.default,
};

const themeReducer = (state=initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case SWITCH_THEME:
      switch(action.theme) {
        case 'Default':
          return { colorData: THEMES.default };
        case 'Metal':
          return { colorData: THEMES.metal };
        case 'Candy':
          return { colorData: THEMES.candy };
      }
    default:
      return state;
  }
};

export default themeReducer;