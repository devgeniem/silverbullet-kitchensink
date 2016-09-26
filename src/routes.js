import Layout from './components/TodoLayout';
import TodoMain from './pages/TodoMain';
import TodoCreateList from './pages/TodoCreateList';

import TodoLogin from './pages/TodoLogin';
import TodoRegistration from './pages/TodoRegistration';

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
  // TODO: Uncomment when login works
  /*if (!isLoggedIn) {
    replace({
      pathname: '/reactDemo/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }*/
};

export default isLoggedIn => ({
  path: '/reactDemo',
  component: Layout,
  indexRoute: {
    component: TodoMain,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn),
  },
  childRoutes: [{
    path: 'list/:listId',
    component: TodoCreateList,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn),
  }, {
    path: 'create-list',
    component: TodoCreateList,
    onEnter: (nextState, replace) => checkLogin(nextState, replace, isLoggedIn),
  }, {
    path: '/reactDemo/login',
    component: TodoLogin,
  }, {
    path: 'register',
    component: TodoRegistration,
  }],
});
