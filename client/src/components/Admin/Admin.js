import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AllAnnouncements from './AllAnnouncements';
import Users from './Users';

export default function Admin() {
  const [error, setError] = useState('');
  const [active, setActive] = useState(true);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');

    try {
      navigate('/login');
      await logout();
    } catch {
      setError('Failed to Log Out');
    }
  }

  return (
    <div>
      {' '}
      {error && <div className=''>{error}</div>}
      <div className='flex justify-between px-12 pt-8'>
        <span
          className='flex p-12 pl-0 pt-0 pb-0 font-bold signUp-font'
          style={{ fontSize: '50px' }}
        >
          OneCast.
        </span>
        <div className='flex'>
          <span className='font-bold signUp-font' style={{ fontSize: '20px' }}>
            {currentUser.email}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {currentUser.email === 'kartikmehta202@gmail.com' ? (
            <button
              onClick={() => navigate('/dashboard')}
              className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold h-8 px-2  rounded focus:outline-none focus:shadow-outline signUp-font'
            >
              Dashboard
            </button>
          ) : (
            <div></div>
          )}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            variant='link'
            onClick={handleLogout}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-8 px-2  rounded focus:outline-none focus:shadow-outline signUp-font'
          >
            Log Out
          </button>
        </div>
      </div>
      {currentUser.email === 'kartikmehta202@gmail.com' ? (
        <div
          className='signUp-font ml-12 text-gray-900 text-lg'
          style={{ marginTop: '-15px' }}
        >
          administrator
        </div>
      ) : (
        <div></div>
      )}
      <div className='flex justify-center gap-8 signUp-font text-2xl'>
        <div
          className={active === true ? 'text-blue-700 font-bold' : ''}
          onClick={() => setActive(true)}
          style={{ cursor: 'pointer' }}
        >
          All Announcements
        </div>
        <div
          className={active === false ? 'text-blue-700 font-bold' : ''}
          onClick={() => setActive(false)}
          style={{ cursor: 'pointer' }}
        >
          Users
        </div>
      </div>
      <div>
        {active ? (
          <div>
            <AllAnnouncements />
          </div>
        ) : (
          <div>
            <Users />
          </div>
        )}
      </div>
    </div>
  );
}
