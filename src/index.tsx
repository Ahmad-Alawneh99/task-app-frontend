import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import AddTaskPage from './pages/AddTaskPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TasksPage/>,
  },
  {
    path: '/sign-up',
    element: <SignUpPage/>,
  },
  {
    path: '/sign-in',
    element: <SignInPage/>,
  },
  {
    path: '/add-task',
    element: <AddTaskPage/>,
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
