import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Newpost from "./pages/Newpost.jsx";
import Post from "./pages/Post.jsx";
import Layout from "./components/Layout.jsx";
import axios from "axios";
import {useEffect} from "react";

function App() {
    axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, [location.pathname]);

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home/>}/>
                <Route path="/newpost" element={<Newpost/>}/>
                <Route path="/post/:postID" element={<Post/>}/>
            </Route>
        </Routes>
    )
}

export default App
