import Home from './components/Home';
import Foo from './components/Foo';
import Bar from './components/Bar';
import Layout from './components/Layout';

export default {
  childRoutes: [{
    path: '/',
    component: Layout,
    indexRoute: Home,
    childRoutes: [
      { path: 'foo', component: Foo },
      { path: 'bar', component: Bar },
    ],
  }],
};
