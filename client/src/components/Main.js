import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className='flex p-12 pb-0 font-bold signUp-font'
        style={{ fontSize: '80px' }}
      >
        OneCast.
      </div>
      <div
        className='flex p-12 pt-0 font-bold text-gray-900 signUp-font'
        style={{ fontSize: '40px', marginTop: '-20px' }}
      >
        A Message Broadcast Service
      </div>
      <div className='flex px-12' style={{ justifyContent: 'space-between' }}>
        <div className='text-2xl signUp-font'>
          Elevate your message with precision using our innovative narrowcast
          service. <br />
          Reach your target audience directly, delivering personalized messages
          that resonate.{' '}
        </div>
      </div>
      <div className='flex justify-start gap-4 p-12 text-xl'>
        <span
          style={{ cursor: 'pointer' }}
          className='bg-blue-500 hover:bg-blue-700 text-white h-12 py-2 px-4 font-bold rounded focus:outline-none focus:shadow-outline signUp-font'
          onClick={() => navigate('signup')}
        >
          Sign Up
        </span>
        <span
          style={{ cursor: 'pointer' }}
          className='bg-blue-500 hover:bg-blue-700 text-white h-12 py-2 px-4 font-bold rounded focus:outline-none focus:shadow-outline signUp-font'
          onClick={() => navigate('login')}
        >
          Log In
        </span>
      </div>
    </div>
  );
}
