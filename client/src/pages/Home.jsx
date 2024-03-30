import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Share from "../components/Share.jsx";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [range, setRange] = useState(6);
    const [loading, setLoading] = useState(true);
    const scrollPositionRef = useRef(0);
    const location = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`/api/posts`);
                setPosts(response.data);
                console.log(response.data);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
        setRange(sessionStorage.getItem('range') ? parseInt(sessionStorage.getItem('range')) : 6);
    }, []);

    useEffect(() => {
        // Restore scroll position when component mounts
	console.log(scrollPositionRef.current);
        window.scrollTo(0, scrollPositionRef.current);
    }, [location]);

    useEffect(() => {
        // Save scroll position when component unmounts
        return () => {
            scrollPositionRef.current = window.pageYOffset;
	    console.log(scrollPositionRef.current);
        };
    }, []);

    const onLoadMore = () => {
        setRange(range + 6);
        const newRange = range + 6;
        sessionStorage.setItem('range', newRange.toString());
        console.log(newRange);
    };



    return (
        <div className="grid grid-cols-12">
            {posts.slice(startIndex, startIndex + range).map((post) => {
               return (
                   <div
                         className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-4 lg:col-span-6 flex flex-col flex-1 p-2 mt-8 border-b border-gray-200 hover:border-gray-400">
                       <Link to={`/post/${post.post_id}`} className="flex justify-between">
                           <Link to={`/post/${post.post_id}`} className="text-sm">
                               {post.to_char}
                           </Link>
                           <Link to={`/post/${post.post_id}`} className="flex items-center space-x-2">
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                   <path strokeLinecap="round" strokeLinejoin="round"
                                         d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                   <path strokeLinecap="round" strokeLinejoin="round"
                                         d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                               </svg>
                               <Link to={`/post/${post.post_id}`} className="text-sm">
                                   {post.views}
                               </Link>
                           </Link>
                       </Link>
                       <Link to={`/post/${post.post_id}`} className="text-xl font-bold first-letter:capitalize font-['Helvetica Neue']">
                           {post.title}
                       </Link>
                       <Link to={`/post/${post.post_id}`}>
                           <p className="text-sm whitespace-pre-line line-clamp-2">
                               <span className="first-letter:capitalize">{post.content}</span>
                           </p>
                       </Link>
                       <div className="flex justify-between items-center mt-2">
                           <Link to={`/post/${post.post_id}`}
                                 className="text-sm font-mono cursor-pointer text-blue-400 hover:underline">
                               <p>Read More &gt;</p>
                           </Link>
                           <Share post_id={post.post_id}/>
                       </div>
                   </div>
               )
            })}
            <div
                className="col-span-12 flex flex-col flex-1 p-4 border-gray-200 mt-8 text-xl font-bold text-center cursor-pointer"
                onClick={onLoadMore}>
                <p className="first-letter:capitalize">
                    {range > posts.length - 1 ? "No more posts" : "Load more"
                    }
                </p>
            </div>
        </div>

    );
};

export default Home;
