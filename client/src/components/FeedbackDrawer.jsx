import React, {useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

const FeedbackDrawer = (props) => {
    const {isOpen, setIsOpen} = props;
    const [honeypot, setHoneypot] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        grecaptcha.ready(async () => {
            const token = await grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
                action: 'submit'
            })
            const response = await axios.post("/api/submitFeedback", {
                feedback: feedback,
                honeypot: honeypot,
                token: token
            })
            if (response.data.error) {
                alert(response.data.error)
                return
            }

            if (location.pathname === "/") {
                alert("Thank you for your feedback. We appreciate it!")
                window.location.reload();
            }else{
                alert("Thank you for your feedback. We appreciate it!")
                navigate('/');
            }


        })


    }

    return (
        <>
            <div id="drawer-contact"
                 className="fixed top-0 left-0 z-50 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800"
                 tabIndex="-1" aria-labelledby="drawer-contact-label">
                <h5 id="drawer-label"
                    className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
                    Feedback
                </h5>
                <button onClick={() => setIsOpen(!isOpen)} type="button" data-drawer-hide="drawer-contact" aria-controls="drawer-contact"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <form className="mb-6" onSubmit={handleSubmit}>
                    <input type="hidden" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}/>
                    <div className="mb-6">
                        <label htmlFor="message"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">How can we improve?</label>
                        <textarea required="true" value={feedback} id="message" rows="4" onChange={(e) => setFeedback(e.target.value)}
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Your feedback..."></textarea>
                    </div>
                    <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block">Send
                        feedback
                    </button>
                </form>
            </div>
        </>
    );
};

export default FeedbackDrawer;
