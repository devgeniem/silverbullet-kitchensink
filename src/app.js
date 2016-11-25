
/*
  Here is the main react application used in react-based views.
  This is used in urls defined by routes.js and initialized in
  config/http.js middleware.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, createMemoryHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
import Iso from 'iso';

import {I18nextProvider} from "react-i18next"
import getI18n from "./services/i18n"

import routes from './routes';
import reducers from './reducers';

export default class App extends React.Component {

  static propTypes = {
    state: React.PropTypes.obj,
    req: React.PropTypes.obj,
  };

  constructor(props) {
    super(props);
    if (process.browser) {
      this.initStoreClientSide();
    } else {
      this.initStoreServerSide();
    }
  }

  initStoreClientSide() {
    Iso.bootstrap((state) => {
      const io = sailsIOClient(socketIOClient);

      this.store = createStore(
                combineReducers({ ...reducers, routing: routerReducer }),
                state,
                compose(
                  applyMiddleware(thunk),
                  window.devToolsExtension ? window.devToolsExtension() : f => f
                )
            );

      this.history = syncHistoryWithStore(browserHistory, this.store);

            //keep server session in sync with store
      this.store.subscribe(() => {
        const storeState = this.store.getState();
        if (storeState) {
          io.socket.post('/api/session', { state: storeState }, (body, JWR) => {
            if (JWR.statusCode === 200) {
            } else {
              console.error('Failed to save session state: ', JWR.statusCode);
            }
          });
        }
      });
    });
  }

  initStoreServerSide() {
    const memoryHistory = createMemoryHistory(this.props.req.url);
    this.store = createStore(
            combineReducers({ ...reducers, routing: routerReducer }),
            this.props.state,
            applyMiddleware(thunk)
        );
    this.history = syncHistoryWithStore(memoryHistory, this.store);
  }

  render() {
    const isLoggedIn = !!this.store.getState().user.isLoggedIn;
    return (
      <I18nextProvider i18n={getI18n(this.store.getState().lang.lang)}>
        <Provider store={this.store}>
          <Router history={this.history} routes={routes} />
        </Provider>
      </I18nextProvider>
    );
  }
}

if (process.browser) {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
} else {
  module.exports = App;
}
