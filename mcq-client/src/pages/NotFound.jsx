import React from 'react'

export default function NotFound() {
    return (
        <div className='flex justify-center items-center flex-col min-h-screen'>
            <img src='/assets/404.png' width="700" height="286" alt='not found' ></img>
            <p className='text-[45px] font-light mt-6' >Sorry, it looks like the page get lost </p>
            <a href="/">
                <button className='btn btn-primary mt-6 w-[180px]'  >Back to Home</button>
            </a>
        </div>
    )
}
