import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Submissions from './pages/Submissions'
import Validator from './pages/Validator'
import Reports from './pages/Reports'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'submissions', element: <Submissions /> },
      { path: 'validator', element: <Validator /> },
      { path: 'reports', element: <Reports /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/logout', element: <Navigate to="/login" replace /> },
  { path: '*', element: <NotFound /> },
])

const App = () => <RouterProvider router={router} />

export default App