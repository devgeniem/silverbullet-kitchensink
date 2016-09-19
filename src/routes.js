import Home from './pages/home';
import Foo from './components/Foo';
import Bar from './components/Bar';
import Layout from './components/Layout';


export default {
  path: '/reactDemo',
  component: Layout,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
  ],
};
