import { createBrowserRouter, Navigate, Link } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';
import Home from './pages/Home';
import Layout from './components/Layout';
import GuestLayout from './components/GuestLayout';
import Ruangan from './pages/RuanganPage';
import Jurusan from './pages/JurusanPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import MasterPage from './pages/MasterPage';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { user } = useStateContext();
    if (!allowedRoles.includes(user.tipe_user)) {
        return <Navigate to="/unauthorized" />;
    }
    return children;
}

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
                element: (
                    <ProtectedRoute allowedRoles={['admin', 'staf_tu']}>
                        <Ruangan />
                    </ProtectedRoute>
                )
            },
            {
                path:'/jurusan/:namaJurusanSlug',
                element: <Jurusan />,
            },
            {
                path: '/master/:param',
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                      <MasterPage />
                    </ProtectedRoute>
                )
            }
        ],
    },
    {
        path: '/unauthorized',
        element: <h1>Anda tidak memiliki akses ke halaman ini. <Link to='/'>Kembali</Link> </h1>
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            }
        ]
    }
]);

export default routes;
