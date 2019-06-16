// MATERIAL IMPORTS
import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonIcon from '@material-ui/icons/Person';
import LayersIcon from '@material-ui/icons/Layers';
import Book from '@material-ui/icons/Book';

// PAGES
import DashboardPage from '../views/Dashboard';
import Lotes from '../views/Lotes';
import Guias from '../views/Guias';
import Pacientes from '../views/Pacientes';
import Planos from '../views/Planos';
import Procedimentos from '../views/Procedimentos';

// FORMS
import LoteForm from '../views/Lotes/Form';
import GuiaForm from '../views/Guias/Form';
import PacienteForm from '../views/Pacientes/Form';
import PlanoForm from '../views/Planos/Form';
import ProcedimentoForm from '../views/Procedimentos/Form';

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
    path: '/lotes',
    menuText: 'Lotes',
    icon: Book,
    active: true,
    component: Lotes,
    editMode: LoteForm,
  },
  {
    id: 3,
    path: '/guias',
    menuText: 'Guias',
    icon: LibraryBooksIcon,
    active: true,
    component: Guias,
    editMode: GuiaForm,
  },
  {
    id: 4,
    path: '/pacientes',
    menuText: 'Pacientes',
    icon: PersonIcon,
    active: true,
    component: Pacientes,
    editMode: PacienteForm,
  },
  {
    id: 5,
    path: '/planos',
    menuText: 'Planos',
    icon: LayersIcon,
    active: true,
    component: Planos,
    editMode: PlanoForm,
  },
  {
    id: 6,
    path: '/procedimentos',
    menuText: 'Procedimentos',
    icon: ListAltIcon,
    active: true,
    component: Procedimentos,
    editMode: ProcedimentoForm,
  },
];

export default dashboardRoutes;
