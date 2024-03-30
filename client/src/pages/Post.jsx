import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Share from "../components/Share.jsx";

const Post = () => {
    const [post, setPost] = useState({});
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [honeypot, setHoneypot] = useState("");
    const [loading, setLoading] = useState(true)
    const {postID} = useParams();
    const navigate = useNavigate();

    
    useEffect(() => {



        const fetchPosts = async () => {
            const response = await axios.get("/api/singlePost", {
                params: {
                    id: postID
                }
            });
            setPost(response.data);
        }

        const fetchComments = async () => {
            const response = await axios.get("/api/getComments", {
                params: {
                    id: postID
                }
            });
            setComments(response.data);
        }

        const updatePosts = async () => {
            const response = await axios.put(`/api/updatePost?id=${postID}`);
        }
        fetchPosts();
        fetchComments();

        const timer = setTimeout(() => {
            updatePosts();
        }, 1750);

        return () => clearTimeout(timer);

    }, [postID]);

    console.log(comments);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        grecaptcha.ready(async () => {
            const token = await grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
                action: 'submit'
            })
            const response = await axios.post("/api/createComment", {
                post_id: postID,
                content: comment,
                honeypot: honeypot,
                token: token
            })

            if(response.data.error) {
                alert(response.data.error)
                return
            }

            const updatedComments = await axios.get("/api/getComments", {
                params: {
                    id: postID
                }
            })

            setComments(updatedComments.data);
            setComment('');
        })




    }

    return (
        <div className="flex justify-center ">
            <div className="w-full max-w-screen-md">
                <div className="grid grid-rows-auto w-full">
                    <div className="w-full p-4">
                        <div className="text-3xl capitalize font-bold">
                            {post?.title ? post.title : "Loading..."}
                        </div>
                        <div className="flex justify-start gap-4 items-center pt-4">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-12 h-12 border rounded-full">
                                    <path fillRule="evenodd"
                                          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className="">
                                <div className="text-base pb-1 capitalize">
                                    {post?.post_id ? "user" + post.post_id.split('-')[0] : "Loading..."}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {post?.to_char ? post.to_char : "Loading..."}
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 whitespace-pre-line font-serif text-lg">
                            {post?.content ? post.content : "Loading..."}
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="w-full p-4 border-t">
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-xl font-bold pb-4">
                                Comments
                            </p>
                            <Share/>
                        </div>
                        <div className="mb-8">
                            <form onSubmit={handleSubmitComment} >
                        <textarea required value={comment} onChange={(e) => setComment(e.target.value)} rows="6"
                                  placeholder="Write a comment..."
                                  className="border rounded-lg px-4 py-2 w-full mb-2 min-h"/>
                                <input type="hidden" value="" onChange={(e) => setHoneypot(e.target.value)}/>
                                <button
                                    type="submit"
                                    className="text-sm border px-4 py-3 rounded-xl bg-blue-600 text-white text-center drop-shadow-sm hover:bg-blue-800">
                                    Post comment
                                </button>
                            </form>
                        </div>
                        {comments && comments.map(({comment_id, content, to_char}) => {
                            return (
                                <div key={comment_id}>
                                    <div
                                        className="flex justify-start gap-2 items-center pt-8 whitespace-pre-line font-serif text-lg">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                 fill="currentColor"
                                                 className="w-8 h-8 border rounded-full">
                                                <path fillRule="evenodd"
                                                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                        <div className="text-sm pb-1 capitalize">
                                            {"comment" + comment_id.split('-')[0]}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {to_char}
                                        </div>
                                    </div>
                                    <div className="pt-2 text-lg first-letter:capitalize">
                                        {content}
                                    </div>
                                    <div className="border w-full mx-auto mt-8">
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Post;
