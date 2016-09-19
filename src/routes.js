import Home from './components/Home';
import Bar from './components/Bar';
import Layout from './components/Layout';
import Lists from './pages/Lists';

export default {
  component: Layout,
  indexRoute: Home,
  childRoutes: [
    {path: 'lists', component: Lists},
    {path: 'bar', component: Bar},
  ],

};
