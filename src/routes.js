import Layout from './components/Layout';
import Lists from './pages/Lists';
import CreateList from './pages/CreateList';


export default {
  path: '/reactDemo',
  component: Layout,
  indexRoute: {component: Lists},
  childRoutes: [{
    path: 'create-list',
    component: CreateList
  }]
}
