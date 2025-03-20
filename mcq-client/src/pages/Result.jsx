import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackForm from '../../components/FeedbackForm';
import { useAuth } from '../context/authContext';
import { getResults } from '../../services/api';

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
                    <div>
                        <span>Score :</span>
                        <span className="text-green-500"> {result.score}</span> /
                        <span className="text-blue-500"> {result.answers.length * 5}</span>

                        <p className="text-sm text-gray-500">Test ID: {result._id}</p>
                    </div>
                    <div className="mt">
                        <FeedbackForm userId={user.user.id} />
                    </div>

                </div>
            )}
        </div>
    );
};

export default Result;
