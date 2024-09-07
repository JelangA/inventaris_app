import { createBrowserRouter, Navigate, Link } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';
import Home from './pages/Home';
import Layout from './components/Layout';
import GuestLayout from './components/GuestLayout';
import RuanganPage from './pages/RuanganPage';
import JurusanPage from './pages/JurusanPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import MasterPage from './pages/MasterPage';
import FormPage from './pages/FormPage';
import GaleriPage from './pages/GaleriPage';

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
                // Add/Edit Ruangan/Barang from RuanganPage/JurusanPage
                path: '/form/:param/:idRJ/:id?',
                element: (
                    <ProtectedRoute allowedRoles={['admin', 'kep_jurusan', 'kep_bengkel']}>
                        <FormPage />
                    </ProtectedRoute>
                )
            },
            {
                // Add/Edit Ruangan/Barang
                path: '/form/:param/:id?',
                element: (
                    <ProtectedRoute allowedRoles={['admin', 'kep_jurusan', 'kep_bengkel']}>
                        <FormPage />
                    </ProtectedRoute>
                )
            },
            {
                path:'/ruangan/:id',
                element: (
                    <ProtectedRoute allowedRoles={['admin', 'staf_tu']}>
                        <RuanganPage />
                    </ProtectedRoute>
                )
            },
            {
                path: '/galeri/:id',
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <GaleriPage />
                    </ProtectedRoute>
                )
            },
            {
                path:'/jurusan/:id',
                element: <JurusanPage />,
            },
            {
                path: '/master/:param',
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                      <MasterPage />
                    </ProtectedRoute>
                )
            },
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
