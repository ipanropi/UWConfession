import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Newpost from "./pages/Newpost.jsx";
import Post from "./pages/Post.jsx";
import Layout from "./components/Layout.jsx";
import axios from "axios";

function App() {
    axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

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
