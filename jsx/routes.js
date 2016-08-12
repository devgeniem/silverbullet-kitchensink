import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'

const App = ({ children }) => (
  <div>
    <header>
      Links:
      {' '}
      <a href="/">Back to sails (non react page)</a>
      {' '}
      <Link to="/reactDemo">ReactDemo (react)</Link>
      {' '}
      <Link to="/foo">Foo (react)</Link>
      {' '}
      <Link to="/bar">Bar (react)</Link>
    </header>
    {children}
  </div>
)

const Home = () => (<div>REACT APP Home!</div>)
const Foo = () => (<div>Foo!</div>)
const Bar = () => (<div>Bar!</div>)

const routes = (
  <Route path="/reactDemo" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/foo" component={Foo}/>
    <Route path="/bar" component={Bar}/>
  </Route>
)

export default routes
