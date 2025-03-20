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
      <div className='flex flex-col items-center justify-center h-[80vh]'>
        <h1 className='text-[74px] font-bold'>Welcome to TSEEP Mastery Box</h1>
        <p className='text-[28px]'>Unlock the potential with AI inspired tool</p>
      </div>
      <div className='flex justify-between mx-28 pt-10  border-t border-t-gray-400'>
        <div className='flex items-center gap-3'>
          <input
            type="checkbox"
            className="checkbox checkbox-primary rounded"
            onChange={handleCheckboxChange}
          />
          <p className='text-[18px] font-medium'>
            I confirm that I have read and accept the terms and conditions and privacy policy.
          </p>
        </div>
        <button
          className={`btn btn-primary w-[180px]`}
          onClick={handleButtonClick}
          disabled={!isChecked} 
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
