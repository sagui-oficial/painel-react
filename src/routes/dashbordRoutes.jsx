// MATERIAL IMPORTS
import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonIcon from '@material-ui/icons/Person';
import LayersIcon from '@material-ui/icons/Layers';

// PAGES
import DashboardPage from '../views/Dashboard';
import Guias from '../views/Guias/List';
import Pacientes from '../views/Pacientes';
import Procedimentos from '../views/Procedimentos';
import Planos from '../views/Planos';

const dashboardRoutes = [
  {
    id: 1,
    path: '/dashboard',
    menuText: 'Dashboard',
    icon: DashboardIcon,
    active: false,
    component: DashboardPage,
  },
  {
    id: 2,
    path: '/guias',
    menuText: 'Guias',
    icon: LibraryBooksIcon,
    active: true,
    component: Guias,
  },
  {
    id: 3,
    path: '/pacientes',
    menuText: 'Pacientes',
    icon: PersonIcon,
    active: true,
    component: Pacientes,
  },
  {
    id: 4,
    path: '/procedimentos',
    menuText: 'Procedimentos',
    icon: ListAltIcon,
    active: true,
    component: Procedimentos,
  },
  {
    id: 5,
    path: '/planos',
    menuText: 'Planos',
    icon: LayersIcon,
    active: true,
    component: Planos,
  },
];

export default dashboardRoutes;
