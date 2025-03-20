import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Test from './pages/Test';
import { AuthProvider, useAuth } from './context/authContext';
import Result from './pages/Result';
import Onboard from './pages/Onboard';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location.pathname }} />;
  }

  return children;
};

const GuestRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    // Don't hardcode the redirect destination
    const redirectTo = location.state?.from || '/test';
    return <Navigate to={redirectTo} />;
  }

  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Guest Routes */}
          <Route path="/" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
          <Route path="/onboard" element={<GuestRoute><Onboard /></GuestRoute>} />

          {/* Protected Routes */}
          <Route path="/test" element={<ProtectedRoute><Test /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />

          {/* Catch-all route for debugging */}
          <Route path="*" element={<div>Page not found. Available routes: /, /register, /test, /result</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;