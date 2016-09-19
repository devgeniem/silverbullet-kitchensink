import Home from './pages/home';

import Bar from './components/Bar';
import Layout from './components/Layout';
import Lists from './pages/Lists';


export default {
  path: '/reactDemo',
  component: Layout,
  indexRoute: {component: Home},
  childRoutes: [{
    path: 'lists',
    component: Lists
  }, {
    path: 'bar',
    component: Bar
  },
  ],
}
