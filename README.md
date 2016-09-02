# Silver bullet boilerplate
a [Sails](http://sailsjs.org) application

## sails.js, react, react-redux, s

Koska  Sails react boilerplatet olivat "susia", teimme uuden.

Tavoitteet:
- aidosti isomorfinen React redux ympästö joka ei muuta sails projektin rakennetta
- Sails toimii kuten ennenkin
- redux store
- redux react router
- keep it simple with browserify (no oligatory webpack)

## handle react routes via http.config no new node_modules

Most changes reside in config/http.js


a simpler way to render react with in sails, using browserify-middleware to babelify clientside
from same source as serverside.

## views

see .dust and .ejs examples how react application is embedded within view

## serverside redux store (socket.io)

redux store is completely syncend to serverside session. see example react application
how to connect and use it.

## sails routes and views still work as expected

the order in which react router and sails router are run can be adjusted from
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
