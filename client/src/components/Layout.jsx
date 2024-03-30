import React, {useEffect} from 'react';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import {Outlet} from "react-router-dom";
import FeedbackButton from "./FeedbackButton.jsx";
import axios from "axios";

const Layout = () => {
    useEffect(() => {
        // Set up axios base URL
        axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

        // Dynamically load scripts or perform other global side effects
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
        script.async = true;
        document.body.appendChild(script);

        return () => document.body.removeChild(script);
    }, []);

    return (
        <div className="flex flex-col justify-between p-4 min-h-screen bg-[#fafafa]">
            <Navbar/>
            <FeedbackButton/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;
