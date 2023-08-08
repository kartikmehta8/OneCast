import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Main from './components/Main';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route path='/dashboard' element={<PrivateRoute />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
