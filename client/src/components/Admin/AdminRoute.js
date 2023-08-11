import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Admin from './Admin';

export default function AdminRoute() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  if (currentUser.email !== 'kartikmehta202@gmail.com') {
    return <Navigate to='/dashboard' />;
  }

  return <Admin />;
}
