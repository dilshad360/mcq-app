import React, { useState, useEffect } from 'react';

export default function Progress({ currentQuestion, questionsLength }) {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

    useEffect(() => {
        if (timeLeft <= 0) return; // Stop countdown at 0
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer); // Cleanup on unmount
    }, [timeLeft]);

    // Format seconds into MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className='flex gap-4 items-center justify-between pb-4'>
            <div className='w-[86%] flex items-center gap-4' >
            <progress
                className="progress progress-primary w-full"
                value={currentQuestion + 1}
                max={questionsLength}
            ></progress>
            <span className='text-xl font-semibold'>
                {currentQuestion + 1}/{questionsLength}
            </span>  
            </div>
            <div className='bg-[#fac167] py-1 px-2 rounded'>
                <span>{formatTime(timeLeft)}</span>
            </div>
        </div>
    );
}
