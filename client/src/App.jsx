import React, { useEffect } from 'react';
import './App.css'; // Keep your global styles here
import axios from 'axios';
import FeedbackDrawer from "./components/FeedbackDrawer.jsx";

const App = () => {
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

    // Return children, a provider, or simply null if it's just for initialization
    return null;
};

export default App;
