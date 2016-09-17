import Home from './components/Home'
import Foo from './components/Foo'
import Bar from './components/Bar'
import App from '../app'
import Layout from './components/Layout'

export const routes = {
  childRoutes: [
    { path: 'foo', component: Foo },
    { path: 'bar', component: Bar },
  ]
}
