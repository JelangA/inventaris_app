import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Ruangan from './pages/RuanganPage';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path:'/ruangan/:namaRuanganSlug',
                element: <Ruangan />,
            }
        ],
    },
]);

export default routes;
