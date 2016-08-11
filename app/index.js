import routes from './routes';
import clientRouter from 'sails-hook-react-router/lib/router/client';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import { addNotification } from './actions/notification';

const store = createStore(
  combineReducers({...reducers, routing: routerReducer}),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

clientRouter(
  routes, {}, // extra props to pass to router
  // options - see clientRouter docs
  {
    reactRootElementId: 'react-root',
    isomorphicStyleLoader: true,
    redux: {
      store: store
    }
  }
);
