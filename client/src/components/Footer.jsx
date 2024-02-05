import React from 'react';
import {Link, useLocation} from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    return (
        <div className="flex flex-col justify-center mt-12">
            {location.pathname === "/" &&
                <div className="flex flex-col justify-center items-center text-center gap-4 min-w-full min-h-96 sm:h-96 xl:h-[40rem] bg-opacity-0 bg-center bg-cover bg-no-repeat bg-[url('https://www.conduit.consulting/wp-content/uploads/2018/10/gossip-pop-art-men-1firlo0-1200x640.jpg')]">
                <h1 className="text-4xl font-bold text-white ">Weekly UW Confession</h1>
                <p className="text-md text-white">Sign up your email to receive weekly updates</p>
                    <div className="flex flex-col md:flex-row justify-center gap-4 w-3/4">
                        <input type="email" placeholder="Email Address"
                               className="border-2 border-gray-500 rounded p-4 w-full md:w-3/6"/>
                        <button
                            className="bg-blue-600 text-white font-bold drop-shadow-lg rounded p-4 lg:w-1/6">Subscribe
                        </button>
                    </div>
                </div>
            }
            <div className="flex flex-col justify-center p-4 mt-12">
                <Link to={"/"} className="text-xl font-bold text-center mb-2">Home</Link>
            </div>
        </div>
    );
};

export default Footer;