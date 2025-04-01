import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//

import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Application from './pages/Application';

import DashboardApp from './pages/DashboardApp';
import Issuer from './layouts/dashboard/issue';
import WorkflowDesigner from './layouts/dashboard/Generatelink';
import DocumentVerification from './layouts/dashboard/application';
import TemplatePage from './layouts/dashboard/Templatepage';
import DocumentVerificationComponent from './layouts/dashboard/verifydoc';
import CanvaEditor from './layouts/Editor';



// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'issuer', element: <Issuer /> },
        { path: 'Generatelink', element: <WorkflowDesigner /> },
        { path: 'application', element: <DocumentVerification /> },
        { path: 'template', element: <TemplatePage /> },
        { path: 'verifydoc', element: <DocumentVerificationComponent /> },
        // { path: 'application', element: <Application /> },
        { path: 'editor', element: <CanvaEditor /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
