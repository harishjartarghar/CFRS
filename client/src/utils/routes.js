import Dashboard from '../views/dashboard';
import Account from '../views/account';
import MailIcon from '@material-ui/icons/Mail';

var routes = [
  {
    path: "",
    name: "Dashboard",
    icon: <MailIcon/>,
    component: Dashboard,
    layout: "/dashboard",
    type:'donor',
  },

  {
    path: "/account",
    name: "My Account",
    icon: <MailIcon/>,
    component: Account,
    layout: "/dashboard",
    type:'donor',
  },

  

];
export default routes;
