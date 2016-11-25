# Silver bullet - The ultimate Sails/React boilerplate

A [Sails](http://sailsjs.org) application

## About

This is a starter boilerplate app using [Sails](http://sailsjs.org) and [React](https://facebook.github.io/react/).

## Goals
- ~~Isomorphic~~ [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) react redux application in sails environment
- Sails remains usable for API and static pages
- Proper development and production builds
- Use Redux and React Router along with Sails routing

## Work in progress
- finish login-rework branch
  - activation screen for entering activation code
  - finish registration page
  - generate user login on successful auth and save to session
- tie todoItems - model to user
- set policies to require authentication everywhere
- documentation and code review

## Technologies used
- Sails
- [React](https://github.com/facebook/react)
- [Redux](https://github.com/rackt/redux)
- [React Router](https://github.com/rackt/react-router)
- [React Router Redux](https://github.com/reactjs/react-router-redux)
- [Webpack](http://webpack.github.io)
- [Babel](http://babeljs.io)
- [ESLint](http://eslint.org)

## Added functionality
- Sass support
- DustJs support

## Running the application
- Edit config/env/development.js and config/env/production.js to hold your email config (or use config/local.js).
- Run `npm install`
- `npm start` will start the sails server and webpack watcher,
  after this the react application can be developed without restarting the sails server
- Nodemon is also available, via `npm run-script nodemon`, restarting the sails
  server as files are changed while also rebuilding jsx resources in src folder using the dev configuration.
- Production build is started with `npm run pm2-start` which runs the app with pm2. Stop the server with `npm run pm2-stop`.
- Build uses `NODE_ENV` environment variable to choose how to build the application. Use `development` for dev build and `production` for build optimized for production.

## Views

Sails - views are still enabled and will take precedence over the react routing.
We are currently using dust templates, for more options and information, read [the sails documentation on views](http://sailsjs.org/documentation/concepts/views)

## Serverside redux store (socket.io)

Redux store is completely synced to serverside session. See example react application how to connect and use it.

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
