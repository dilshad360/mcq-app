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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="card w-full max-w-3xl bg-base-100 shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-primary">Test Results</h2>

                {result && (
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-xl font-semibold">
                                🏅 Score:
                                <span className="text-green-500"> {result.score}</span> /
                                <span className="text-blue-500"> {result.answers.length * 5}</span>
                            </p>
                            <p className="text-sm text-gray-500">Test ID: {result._id}</p>
                        </div>



                        <div className="mt-6">
                            <h3 className="text-xl font-bold text-center">Feedback</h3>
                            <FeedbackForm userId={user.user.id}  />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Result;
