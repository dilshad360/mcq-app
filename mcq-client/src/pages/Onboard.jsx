import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboard() {
  const [isChecked, setIsChecked] = useState(false);
  const router = useNavigate();

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleButtonClick = () => {
    if (isChecked) {
      router('/');
    }
  };

  return (
    <div className=''>
      <div className='flex flex-col items-center justify-center px-2 md:px-0 h-[66vh] md:h-[80vh]'>
        <h1 className='text-2xl md:text-[74px] font-bold'>Welcome to TSEEP Mastery Box</h1>
        <p className='md:text-[28px]'>Unlock the potential with AI inspired tool</p>
      </div>
      <div className='flex md:flex-row flex-col justify-between md:mx-28 pt-10 px-2 md:px-0  border-t border-t-gray-400'>
        <div className='flex items-center gap-3'>
          <input
            type="checkbox"
            className="checkbox checkbox-primary rounded"
            onChange={handleCheckboxChange}
          />
          <p className='text-xs md:text-[18px] font-medium'>
            I confirm that I have read and accept the terms and conditions and privacy policy.
          </p>
        </div>
        <button
          className={`btn btn-primary w-[180px] mt-2 md:mt-0`}
          onClick={handleButtonClick}
          disabled={!isChecked} 
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
