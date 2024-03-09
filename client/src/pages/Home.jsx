import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import {Link} from "react-router-dom";
import axios from "axios";
import Pagination from "../components/Pagination.jsx";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const length = Math.ceil(posts.length / 6);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`/api/posts`);
            setPosts(response.data);
        }
        fetchPosts();
    }, []);

    return (
        <>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-6 pt-8 lg:p-8 min-h-screen">
                {posts.slice(startIndex, startIndex + 6).map(({post_id, title, content, to_char, views}) => (
                    <Link to={`/post/${post_id}`} key={post_id}
                          className="border border-gray-200 rounded-lg overflow-hidden aspect-[9/14] md:aspect-square flex flex-col justify-center items-center transition duration-150 ease-out hover:-translate-y-1 hover:shadow-2xl">
                        <div className="flex flex-1 w-full justify-center items-center border-b border-gray-200 bg-[#F0F0F0]">
                            <h1 className="text-lg text-center p-4">
                                {content.split(" ").slice(0, 10).join(" ")}
                            </h1>
                        </div>
                        <div className="flex flex-col pl-4 pr-4 pb-4 w-full h-2/5 md:h-1/3">
                            <div className="flex justify-between pt-2">
                                <h3 className="text-xs ">{to_char}</h3>
                                <div className="flex gap-2 justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>
                                    <h3 className="text-xs text-center">{views}</h3>
                                </div>
                            </div>
                            <h1 className="text-lg md:text-xl font-bold pt-2 capitalize">{title}</h1>
                            <p className="text-sm pt-2 first-letter:capitalize whitespace-pre-line line-clamp-4">{content}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <Pagination length={length} setCurrentPage={setCurrentPage} currentPage={currentPage}
                        setStartIndex={setStartIndex}/>
        </>


    );
};

export default Home;
