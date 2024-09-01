import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';
import { Outlet, Navigate } from 'react-router-dom'; // Import Outlet
import { useStateContext } from '../contexts/ContextProvider';

const Layout = () => {
    const { token } = useStateContext();
    if (!token) {
        return <Navigate to='/login' />
    }
    return (
        <div className="wrapper">
            <Header />
            <SideNav />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
