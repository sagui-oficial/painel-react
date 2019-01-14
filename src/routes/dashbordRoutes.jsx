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
    menuText: 'Dashboard',
    pageTitle: 'Dashboard',
    icon: DashboardIcon,
    component: DashboardPage,
  },
  {
    id: 2,
    path: '/guias',
    menuText: 'Guias',
    pageTitle: 'Guias Odontológicas',
    icon: LibraryBooksIcon,
    component: DashboardPage,
  },
  {
    id: 3,
    path: '/pacientes',
    menuText: 'Pacientes',
    pageTitle: 'Pacientes Cadastrados',
    icon: PersonIcon,
    component: DashboardPage,
  },
  {
    id: 4,
    path: '/procedimentos',
    menuText: 'Procedimentos',
    pageTitle: 'Lista de Procedimentos',
    icon: ListAltIcon,
    component: DashboardPage,
  },
  {
    id: 5,
    path: '/planos',
    menuText: 'Planos',
    pageTitle: 'Planos / Convênios',
    icon: LayersIcon,
    component: DashboardPage,
  },
];

export default dashboardRoutes;
