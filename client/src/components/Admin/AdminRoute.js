import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Admin } from '../index';
import { ADMIN_EMAIL } from '../../constants/constants';

export default function AdminRoute() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  if (currentUser.email !== ADMIN_EMAIL) {
    return <Navigate to='/dashboard' />;
  }

  return <Admin />;
}
