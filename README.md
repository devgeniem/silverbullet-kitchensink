# Silver bullet boilerplate
a [Sails](http://sailsjs.org) application

## About

This is a starter boilerplate app using [Sails](http://sailsjs.org) and [React](https://facebook.github.io/react/).

## Goal

- Universal (isomorphic) sails app with react support
- Keep all Sails features working
- Proper development and production builds
- Use Redux and React Router along with Sails routing

## Technologies used

- Sails
- React
- Redux
- React Router
- Webpack

## Added funtionality

- Sass support
- DustJs support

## Handle react routes via http.config no new node_modules

Most changes reside in config/http.js

A simpler way to render react with in sails, same source in the server side and client side.

## Views

See .dust and .ejs examples how react application is embedded within view

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
