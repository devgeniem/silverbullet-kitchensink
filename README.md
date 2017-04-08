# Silverbullet - Sails v1.0 React Kitchensink

A [Sails](http://sailsjs.org) kitchensink with React and Webpack.

## About

This is a starter kitchensink app using [Sails](http://sailsjs.org) and [React](https://facebook.github.io/react/).

## Goals
- ~~Isomorphic~~ [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) react redux application in sails environment
- Sails remains usable for API and static pages
- Proper development and production builds with webpack
- Use Redux and React Router along with Sails routing

## Frontend features
- React App along side with SailsJS
- Redux with Immutable state
- React Router
- Sync relevant parts of Redux state to server with Socket.io
- Webpack as build tool (no Grunt)

## Backend features
- User register / activate / login
- Token service, [JWT](https://jwt.io)
- Email service
- Sessions
- React app server side rendering with styles and initialized redux state

## Work in progress
- Sails code upgrade to v1.0
- Validate token on server side
- Secure API endpoints with policies
- Clean and update code (also sails) with eslint rules
- Refactor React app with Redux/Immutable best practises
- Facebook / Google / Twitter etc login/register
- Test with MySQL
- Documentation and code review
- Automated tests

## Technologies used
- [Sails](http://sailsjs.org)
- [React](https://github.com/facebook/react)
- [Redux](https://github.com/rackt/redux)
- [ImmutableJS](https://facebook.github.io/immutable-js)
- [React Router](https://github.com/rackt/react-router)
- [React Router Redux](https://github.com/reactjs/react-router-redux)
- [Webpack](http://webpack.github.io)
- [Babel](http://babeljs.io)
- [ESLint](http://eslint.org)

## Added functionality
- Sass support
- DustJs support

## Install

### Requirements:
- Node 4.x ->

## Running the application
- Edit config/env/development.js and config/env/production.js to hold your email config (or use config/local.js).
- Run `npm install`
- `npm start` will start the sails server and webpack watcher,
  after this the react application can be developed without restarting the sails server
- Build uses `NODE_ENV` environment variable to choose how to build the application. Use `development` for dev build and `production` for build optimized for production.

## Views

Sails - views are still enabled and will take precedence over the react routing.
Template engine is currently dust, for more options and information, read [the sails documentation on views](http://sailsjs.org/documentation/concepts/views)

## Serverside redux store (socket.io)

The parts of the redux store, that are needed by server side rendering, are synced to sails session using socket.io. In the example, user and lang are synced. The parts that are synced are marked with { sync: true } flag.

## Sails routes and views still work as expected

The order in which react router and sails router are run can be adjusted from
confing/http.js

## Recommended Sublime Text configuration

- Make sure you have latest eslint installed globally `npm install -g eslint`
- Install these packages from Sublime Text Package Control (https://packagecontrol.io/installation)
  - EditorConfig (to support .editorconfig settings)
  - Babel (Syntax definitions for ES6 with React JSX extensions)
  - SublimeLinter (version 3)
  - SublimeLinter-contrib-eslint
  - SublimeLinter-csslint
  - SublimeLinter-json
  - Sass
  - DustBuster (support Dust.js templating if using Dust.js templates)
- Remove all jshint & jsxhint etc conficting javascript linters
