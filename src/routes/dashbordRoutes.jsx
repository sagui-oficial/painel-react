// Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonIcon from '@material-ui/icons/Person';
import LayersIcon from '@material-ui/icons/Layers';

// Pages
import DashboardPage from '../views/Dashboard';

const dashboardRoutes = [
  {
    id: 1,
    path: '/dashboard',
    text: 'Dashboard',
    icon: DashboardIcon,
    component: DashboardPage,
  },
  {
    id: 2,
    path: '/guias',
    text: 'Guias',
    icon: LibraryBooksIcon,
    component: DashboardPage,
  },
  {
    id: 3,
    path: '/pacientes',
    text: 'Pacientes',
    icon: PersonIcon,
    component: DashboardPage,
  },
  {
    id: 4,
    path: '/procedimentos',
    text: 'Procedimentos',
    icon: ListAltIcon,
    component: DashboardPage,
  },
  {
    id: 5,
    path: '/planos',
    text: 'Planos',
    icon: LayersIcon,
    component: DashboardPage,
  },
];

export default dashboardRoutes;
