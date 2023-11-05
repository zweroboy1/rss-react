import Main from './pages/Main';
import { NotFound } from './components/NotFound';

const routes = [
  {
    path: '/',
    Component: Main,
  },
  {
    path: '*',
    Component: NotFound,
  },
];

export default routes;
