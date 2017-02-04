import { Main, Todo } from './containers';
import { CreateList,
         Login,
         Register } from './components';

/*
This is the router configuration file for the
underlying react-router used by the react application.

Routes defined here come second in priority, the first being
sails routes defined in config/routes.js

For more information about react routing, go to
https://github.com/ReactTraining/react-router

The router itself is initialized in src/app.js according to
this object.  For more information about the object configuration, go to
https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md#configuration-with-plain-routes
*/

const checkLogin = (nextState, replace, isLoggedIn) => {
  if (!isLoggedIn) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

export default isLoggedIn => ({
  path: '/',
  component: Main,
  indexRoute: {
    component: Todo,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn),
  },
  childRoutes: [{
    path: 'list/:listId',
    component: CreateList,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn),
  }, {
    path: 'create-list',
    component: CreateList,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn),
  }, {
    path: 'login',
    component: Login,
  }, {
    path: 'register',
    component: Register,
  }],
});
