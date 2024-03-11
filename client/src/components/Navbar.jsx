import React, {useEffect, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const [active, setActive] = useState('/');
    const location = useLocation();
    const [prompt, setPrompt] = useState('');

    useEffect( () => {
        setActive(location.pathname);
    }, [location]);

    useEffect(() => {
        const fetchPrompt = async () => {
            const today = new Date().toISOString().slice(0, 10); // Get current date as YYYY-MM-DD
            const cachedPrompt = localStorage.getItem('dailyPrompt');
            const cachedDate = localStorage.getItem('promptDate');

            // Check if there's a cached prompt for today
            if (cachedPrompt && cachedDate === today) {
                setPrompt(JSON.parse(cachedPrompt));
            } else {
                // If not, fetch a new prompt and cache it
                const response = await axios.get('/api/getPrompt');
                localStorage.setItem('dailyPrompt', JSON.stringify(response.data));
                localStorage.setItem('promptDate', today);
                setPrompt(response.data);
            }
        };

        fetchPrompt();

        // Calculate milliseconds until the start of the next day
        const now = new Date();
        const msUntilTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

        // Set up a timer to refresh the prompt at the start of the next day
        const timer = setTimeout(() => {
            localStorage.removeItem('dailyPrompt'); // Clear cached prompt
            localStorage.removeItem('promptDate'); // Clear cached date
            fetchPrompt(); // Fetch and cache a new prompt
        }, msUntilTomorrow);

        // Clear the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []);

    const styles = (to) => {
        if (active === to) {
            return "flex gap-2 md:px-4 md:py-2 font-bold border-b-2 border-black text-center justify-center items-center";
        }

        return "flex gap-2 md:px-4 md:py-2 font-bold text-center"
    }



    return (
        <div className="flex flex-col">
            <div className="flex justify-between gap-4 mb-3 p-4 sm:w-full xl:w-5/6 xl:mx-auto ">
                <Link to={"/home"} className={styles("/home")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path
                            d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z"/>
                        <path
                            d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z"/>
                    </svg>
                    <h1>OffMyChest</h1>
                </Link>
                <div className="flex justify-center">
                    <Link to={"/newpost"} className={styles("/newpost")}>
                        <h1>Add post</h1>
                    </Link>
                </div>
            </div>
            <div id="banner" tabIndex="-1"
                 className="flex z-50 gap-8 justify-center items-center py-3 px-4 w-full bg-gray-50 sm:items-center lg:py-4 border-t border-b border-gray-200 mb-8">
                <p className="text-sm font-mono md:text-center">Don't know what to write? Check out our daily prompts! <br/><br/>
                    <span className="text-blue-500">{prompt}</span>
                </p>
            </div>
        </div>

    );
};

export default Navbar;
