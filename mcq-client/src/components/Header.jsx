import React, { useState } from 'react';
import { useAuth } from '../context/authContext';

export default function Header() {
    const [showButton, setShowButton] = useState(false);

    const { logout, user } = useAuth();

    const handleProfileClick = () => {
        setShowButton(!showButton);
    };

    return (
        <div className='fixed px-10 py-6 w-full flex items-center justify-between'>
            <img src='/assets/logo.png' alt='logo' className='w-[240px] h-fit' />
            {user &&
                <div className='relative'>
                    <img
                        src='/assets/profile.png'
                        alt='profile'
                        className='w-16 h-16 bg-gray-300 rounded-full cursor-pointer'
                        onClick={handleProfileClick}
                    />
                    {showButton && (
                        <button
                            className="absolute top-full mt-2 right-0 btn btn-error shadow-md"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    )}
                </div>
            }
        </div>
    );
}
