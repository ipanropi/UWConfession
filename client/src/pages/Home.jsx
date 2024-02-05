import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import {Link} from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`/posts`);
            setPosts(response.data);
        }
        fetchPosts();
    }, []);


    return (
            <div className="grid md:grid-cols-2 gap-4">
                {posts.map(({post_id, title, content, to_char}) => (
                    <Link to={`/post/${post_id}`} key={post_id}
                          className="flex flex-col justify-center items-center min-h-72 p-4 gap-2  transition duration-150 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-gray-200 hover:rounded-md">
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/624b3c6d692bd24ce26121ca/1649097848557-WK8UT5I9K54FX8569LNW/03_20160720S1_WEATHERBY_ANGLERS_160.jpg?format=2500w"
                            alt="picture"/>
                        <div className="flex flex-col p-0  w-full">
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