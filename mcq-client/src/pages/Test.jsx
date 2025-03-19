import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function Test() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    return (
        <div>
            <button onClick={logout}  className="btn btn-error">Logout</button>
            Test


        </div>
    )
}
