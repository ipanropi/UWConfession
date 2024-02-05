import React from 'react';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import {Outlet} from "react-router-dom";

const Layout = () => {

    return (
        <div className="flex flex-col justify-between p-4 min-h-screen">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;