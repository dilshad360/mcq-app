import React, { useEffect, useState } from 'react'
import { getResults } from '../../services/api';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function Result() {
    const navigate = useNavigate();

    const { logout, user } = useAuth();

    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await getResults(user.user.id); // Fetch questions from API
                setResult(response.data[0]);
                if (response.data.length <= 0) {
                    navigate('/test')
                }
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching questions:', error.message);
                navigate('/test')
            }
        };

        fetchResults(); // Call the async function
    }, []);


    return (
        <div>Result
            {result && (
                <div>
                    <p>Score: {result.score} / {result.answers.length * 5} </p>
                    <p>id: {result._id}</p>
                </div>
            )}

        </div>
    )
}
