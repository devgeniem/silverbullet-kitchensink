/* small testing app to make react router work with sails*/

'use strict';
import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory, createMemoryHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware,compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import routes from "./routes";
import * as reducers from './reducers';
import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
import Iso from "iso";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        if (process.browser) {
            this.initStoreClientSide();
        } else {
            this.initStoreServerSide();
        }
    }

    initStoreClientSide() {
        Iso.bootstrap((state, node) => {
            let io = sailsIOClient(socketIOClient);

            this.store = createStore(
                combineReducers({...reducers, routing: routerReducer}),
                state,
                compose(
                  applyMiddleware(thunk),
                  window.devToolsExtension ? window.devToolsExtension() : f => f
                )
            );

            this.history = syncHistoryWithStore(browserHistory, this.store);

            //keep server session in sync with store
            this.store.subscribe(() => {
                let storeState = this.store.getState();
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
            combineReducers({...reducers, routing: routerReducer}),
            this.props.state,
            applyMiddleware(thunk)
        );
        this.history = syncHistoryWithStore(memoryHistory, this.store)
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
