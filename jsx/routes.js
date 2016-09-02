import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'
import Home from "./pages/home";

const Layout = ({ children }) => (
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

const Foo = () => (<div>Foo! router test</div>)
const Bar = () => (<div>Bar! router test</div>)

const routes = (
  <Route path="/reactDemo" component={Layout}>
    <IndexRoute component={Home}/>
    <Route path="/foo" component={Foo}/>
    <Route path="/bar" component={Bar}/>
  </Route>
)

export default routes
