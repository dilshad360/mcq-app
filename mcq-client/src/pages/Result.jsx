import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackForm from '../components/FeedbackForm';
import { useAuth } from '../context/authContext';
import { getResults } from '../services/api';

const Result = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await getResults(user.user.id);  // Fetch results with token
                if (response.data.length === 0) {
                    navigate('/test');
                } else {
                    setResult(response.data[0]);
                }
            } catch (error) {
                console.error('❌ Error fetching results:', error);
                navigate('/test');
            }
        };

        fetchResults();
    }, [navigate, user]);


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 pb-6 pt-24">
            {result && (
                <div className=" flex flex-col items-center justify-center">
                    <img src="/assets/tick.svg" width={80} height={80} alt="" />
                    <p className='text-xl' >Congratulations you have Succesfully Completed The Test</p>
                    <div className='text-center py-2 text-xl font-semibold flex gap-4 items-center' >
                        <span >Score :</span>
                        <div className='bg-[#fac167] px-6 py-2 rounded-full' >
                            <span > {result.score}</span>/
                            <span >{result.answers.length * 5}</span>
                        </div>
                    </div>
                    <div className='bg-primary px-4 py-2 text-[24px] text-white font-semibold uppercase rounded-lg mt-2'>
                        <span>Your ID: {result._id.substring(0, 6)}</span>
                    </div>
                    <div className="mt-6">
                        <FeedbackForm userId={user.user.id} />
                    </div>

                </div>
            )}
        </div>
    );
};

export default Result;
