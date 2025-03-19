import React, { use, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { getQuestions } from '../../services/api';

export default function Test() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getQuestions(); // Axios already parses JSON
                console.log(response.data); // Log the questions data
            } catch (error) {
                console.error('Error fetching questions:', error.message);
            }
        };

        fetchQuestions(); // Call the async function
    }, []);

    return (
        <div>
            <button onClick={logout}  className="btn btn-error">Logout</button>
            Test


        </div>
    )
}
