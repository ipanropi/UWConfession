import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { Helmet } from "react-helmet";

const Newpost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const navigate = useNavigate();

    const handleCancel = (e) => {
        e.preventDefault()
        setTitle('');
        setContent('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        grecaptcha.ready(async () => {
            const token = await grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
                action: 'submit'
            })
            const response = await axios.post("/api/createPost", {
                title: title,
                content: content,
                honeypot: honeypot,
                token: token
            })
            if (response.data.error) {
                alert(response.data.error)
                return
            }

            if (window.rdt) {
                window.rdt('track', 'Lead'); // Track the story submission event
            }

            navigate('/');
        })


    }

    return (
        <div className="flex-grow flex justify-center items-center gap-8 w-full h-full pt-4">
            <div className="flex flex-col justify-evenly h-full rounded-lg min-h-96 w-full  lg:w-3/5 mx-auto ">
                <div className="flex w-full xl:w-3/4 xl:justify-start mx-auto mb-4">
                    <h1 className="text-2xl font-bold">Add New Post</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col justify-center gap-1">
                        <label className="w-full xl:w-3/4 mx-auto text-lg ">Title</label>
                        <div className="flex justify-start w-full xl:w-3/4 mx-auto">
                            <input required placeholder="Title" className="w-full lg:w-3/5 border rounded-lg px-4 py-3"
                                   type="text"
                                   value={title}
                                   onChange={(e) => setTitle(e.target.value)}/>
                            <input type="hidden" value="" onChange={(e) => setHoneypot(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <div className="w-full xl:w-3/4 mx-auto flex flex-col">
                            <label className="text-lg">Content</label>
                            <label className="text-red-700 text-sm italic -mt-1.5">Reminder: don't use real names</label>
                        </div>
                        <div className="flex justify-start w-full xl:w-3/4 mx-auto">
                                <textarea required placeholder="Tell us your story"
                                          className="w-full border rounded-lg p-4 min-h-32"
                                          value={content}
                                          onChange={(e) => setContent(e.target.value)}/>
                        </div>
                        <div className="border w-full xl:w-3/4 mx-auto mt-4">
                        </div>
                    </div>

                    <div className="flex items-center mx-auto w-full xl:w-3/4 justify-between md:justify-end gap-8">
                        <button className="px-4 py-2 rounded-xl hover:bg-red-700 hover:text-white" onClick={handleCancel}>Cancel</button>
                        <button className="border px-4 py-2 rounded-xl bg-blue-700 text-white drop-shadow-md">Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Newpost;
