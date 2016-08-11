/* small testing app to make react router work with sails*/

'use strict';
import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory, createMemoryHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware,compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { thunk } from 'redux-thunk';
import { Provider } from "react-redux";
import routes from "./routes";
import * as reducers from './reducers';


export default class App extends React.Component {

  constructor(props) {
    super(props);
        //session
        var session = process.browser ? window.session : props.session;
        var reducer = combineReducers({
            ...reducers,
            routing: routerReducer
          });

         //with devtools
        this.store = createStore(reducer, session.state, compose(
            typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
        ));
        if (process.browser) {
          this.history = syncHistoryWithStore(browserHistory, this.store);
        } else {
          const memoryHistory = createMemoryHistory(this.props.req.url);
          this.history =  syncHistoryWithStore(memoryHistory, this.store)
        }
  }

  render() {
    return (
      <Provider store={this.store}>
          <Router history={this.history} routes={routes} />
      </Provider>
    );
  }

}

if (process.browser) {
    ReactDOM.render(
      <App/>,
      document.getElementById('app')
    );
} else {
    module.exports = App;
}
