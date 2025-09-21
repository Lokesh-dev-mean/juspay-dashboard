import  { type RouteObject } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom';
import { ECommerce } from './pages/ECommerce/ECommerce';
import { OrderPage } from './pages/OrderPage';
import { NotFound } from './pages/NotFound'; 
import { Layout } from './components/layout/Layout';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout><Outlet /></Layout>,
    children: [
      {
        path: '',
        element: <Navigate to="/ecommerce" replace />,
      },
      {
        path: 'ecommerce',
        element: <ECommerce />,
      },
      {
        path: 'default',
        element: <OrderPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
