import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import {Link} from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`/api/posts`);
            setPosts(response.data);
        }
        fetchPosts();
    }, []);

    return (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 p-8 min-h-screen">
                {posts.map(({post_id, title, content, to_char}) => (
                    <Link to={`/post/${post_id}`} key={post_id}
                          className="aspect-square flex flex-col justify-center items-center gap-4 min-h- transition duration-150 ease-out hover:-translate-y-1 hover:shadow-2xl">
                        <div className="flex flex-1 w-full justify-center items-center bg-gray-400" >
                            <h1>
                                {title.slice(0, 10)}
                            </h1>
                        </div>
                        <div className="flex flex-col pl-4 pr-4 pb-4 w-full h-2/5">
                            <h3 className="text-xs pt-2">{to_char}</h3>
                            <h1 className="text-xl font-bold pt-2 capitalize">{title}</h1>
                            <p className="text-sm pt-2 first-letter:capitalize whitespace-pre-line line-clamp-4">{content}</p>
                        </div>
                    </Link>
                ))}
            </div>
    );
};

export default Home;
