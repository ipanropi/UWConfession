import React from 'react';
import { useLocation } from "react-router-dom";

const Share = ({post_id}) => {
    const location = useLocation();

    const isShareSupported = navigator.share;

    const shareContent = {
        title: 'Check out this confession on uwoffmychest!',
        url: `https://uwoffmychest.com/post/${post_id}`
    };

    const onClick = () => {
        if (isShareSupported) {
            navigator.share(shareContent)
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing:', error));
        } else {
            // Fallback for copying to clipboard
            navigator.clipboard.writeText(shareContent.url)
                .then(() => {
                    alert('URL copied to clipboard');
                    console.log('URL copied to clipboard');
                })
                .catch((err) => console.error('Error copying URL to clipboard:', err));
        }
    };

    return (
        <div>
            <button onClick={onClick} aria-label="Share this page" className="flex flex-row items-center gap-2">
                <p className="text-sm font-mono cursor-pointer">Share</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"/>
                </svg>
            </button>
        </div>
    );
};

export default Share;
