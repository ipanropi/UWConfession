import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Newpost from "./pages/Newpost.jsx";
import Post from "./pages/Post.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
        <Route path={'/'} element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="/newpost" element={<Newpost />}/>
            <Route path="/post/:postID" element={<Post />}/>
        </Route>
    </Routes>
  )
}

export default App
