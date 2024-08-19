import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './Router.jsx'; // Import routing dari file terpisah
import './App.css'


const App = () => {
    return <RouterProvider router={routes} />;
};

export default App;
