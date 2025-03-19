import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Test from './pages/Test';
import { AuthProvider, useAuth } from './context/authContext';

// ✅ Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

// ✅ Redirect logged-in users away from login/register
const GuestRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/test" /> : children;
};

const App = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route path="/" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
          <Route path="/test" element={<ProtectedRoute><Test /></ProtectedRoute>} />
        </Routes>
    </AuthProvider>
      </BrowserRouter>
  );
};

export default App;
