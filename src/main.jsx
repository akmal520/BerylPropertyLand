import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AboutLayout from './components/About';
import DetailLayout from './components/Layouts/DetailProperty';
import AdminPages from './pages/Admin/AdminPages';
import HomePage from './pages/HomePage';
import PropertyPage from './pages/PropertyPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/property',
        element: <PropertyPage />,
    },
    {
        path: '/property/detail/:id',
        element: <DetailLayout />,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
