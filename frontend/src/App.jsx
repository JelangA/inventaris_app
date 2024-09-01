import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './Router.jsx'; // Import routing dari file terpisah
import './App.css'
import { ContextProvider } from './contexts/ContextProvider.jsx'

const App = () => {
    return (
        <ContextProvider>
            <RouterProvider router={routes} />
        </ContextProvider>
    );
};

export default App;
