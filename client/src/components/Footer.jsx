import React from 'react';
import {Link, useLocation} from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    return (
        <div className="flex flex-col justify-center mt-12">
                <Link to={"/"} onClick={() => location.pathname === "/" && window.scrollTo(0, 0)} className="text-xl font-bold text-center mb-2">Home</Link>
        </div>
    );
};

export default Footer;
