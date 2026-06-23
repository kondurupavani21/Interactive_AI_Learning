import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="page-loader">Preparing your learning space...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}
