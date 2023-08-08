import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [error, setError] = useState('');
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
      {error && <div className=''>{error}</div>}
      <div>Email: {currentUser.email}</div>
      <button variant='link' onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}
