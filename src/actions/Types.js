// A list of all actions in the system.
import { createTypes } from 'reduxsauce';
//TODO write better comments here
export default createTypes(`
  CREATE_LIST
  REMOVE_LIST
  MODIFY_LIST
  REFRESH_LIST
  CHANGE_LANGUAGE
  LOGIN_USER
  LOGOUT_USER
  REGISTER_USER
  ACTIVATE
`);
