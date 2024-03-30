import React, {useState} from 'react';
import FeedbackDrawer from "./FeedbackDrawer.jsx";

const FeedbackButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="text-center">
                <button
                    className="fixed top-1/2 right-0 transform -translate-y-1/2 translate-x-9 -rotate-90 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="button" data-drawer-target="drawer-contact" data-drawer-show="drawer-contact"
                    aria-controls="drawer-contact"
                    onClick={() => setIsOpen(!isOpen)}>
                    Feedback
                </button>
            </div>

            {isOpen && <FeedbackDrawer isOpen={isOpen} setIsOpen={setIsOpen}/>}
        </>

    );
};

export default FeedbackButton;
