import { createTypes } from 'reduxsauce';
import api from '../services/api';

export const Types = createTypes(`
  LOGIN_USER
  LOGOUT_USER
  REGISTER_USER
  ACTIVATE
`);

export default (dispatch) => {
  const loginUser = data =>
    api.login(data)
      .then(response => dispatch({ type: Types.LOGIN_USER, response }));

  const registerUser = data =>
    api.post('/user', { name: data.name, email: data.email, password: data.password })
      .then(response => dispatch({ type: Types.REGISTER_USER, response }));

  const logoutUser = () => dispatch({ type: Types.LOGOUT_USER });

  const activate = (user, code) =>
    api.post('/user/activate/' + user, { activationCode: code })
      .then(() => dispatch({ type: Types.Types.ACTIVATE }));

  return {
    loginUser,
    registerUser,
    logoutUser,
    activate,
  };
};
