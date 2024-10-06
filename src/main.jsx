import AboutLayout from './components/Layouts/About';
import Login from './components/Layouts/Admin/Auth/Login';
import DetailLayout from './components/Layouts/DetailProperty';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ContactUsLayout from './components/Layouts/Contact-Us';
import AddPropertyPage from './pages/Admin/AddPropertyPage';
import AdminPages from './pages/Admin/AdminPages';
import EditPropertyPage from './pages/Admin/EditPropertyPage';
import FaqPage from './pages/Admin/FaqPage';
import PrivacyPage from './pages/Admin/PrivacyPage';
import TermsPage from './pages/Admin/TermsPage';
import HomePage from './pages/HomePage';
import PropertyPage from './pages/PropertyPage';

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
        path: '/privacy',
        element: <PrivacyPage />,
    },
    {
        path: '/terms',
        element: <TermsPage />,
    },
    {
        path: '/faq',
        element: <FaqPage />,
    },
    {
        path: '/property/detail/:id',
        element: <DetailLayout />,
    },
    {
        path: '/about',
        element: <AboutLayout />,
    },
    {
        path: '/contact-us',
        element: <ContactUsLayout />,
    },
    {
        path: '/admin',
        element: <AdminPages />,
    },
    {
        path: '/admin/add-property',
        element: <AddPropertyPage />,
    },
    {
        path: '/admin/edit-property/:uuid',
        element: <EditPropertyPage />,
    },
    {
        path: '/beryl/login',
        element: <Login />,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
