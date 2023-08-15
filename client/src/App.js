import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  AdminRoute,
  Main,
  PrivateRoute,
  ForgotPassword,
  Login,
  Signup,
} from './components/index';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route path='/admin' element={<AdminRoute />} />
          <Route path='/dashboard' element={<PrivateRoute />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
