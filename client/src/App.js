import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Main from './components/Main';
import AdminRoute from './components/Admin/AdminRoute';

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
