import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';
import { Outlet } from 'react-router-dom'; // Import Outlet

const Layout = () => {
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
