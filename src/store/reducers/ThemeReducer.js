import { COLORS } from '../../styles/colors.styles';

const initialState = {
  themeColor: COLORS.default,
};

const Theme = (state=initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default Theme;