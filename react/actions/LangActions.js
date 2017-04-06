import { createTypes } from 'reduxsauce';

export const Types = createTypes(`
  CHANGE_LANGUAGE
`);

export default (dispatch) => {
  const changeLanguage = lang => dispatch({ type: Types.CHANGE_LANGUAGE, lang });
  return {
    changeLanguage,
  };
};
