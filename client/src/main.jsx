import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ScrollRestoration } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Newpost from './pages/Newpost.jsx';
import Post from './pages/Post.jsx';
import App from './App.jsx';

// Assuming you want to keep using axios setup in App or move it elsewhere suitable
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> }, // Home at root
            { path: 'newpost', element: <Newpost /> },
            { path: 'post/:postID', element: <Post /> },
        ],
    },
    // Add other routes as needed
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}>
            <App /> {/* App is now for setup */}
            <ScrollRestoration
                getKey={(location, matches) => {
                    return location.pathname;
                }}
            /> {/* Include ScrollRestoration within the router context */}
        </RouterProvider>
    </React.StrictMode>
);
