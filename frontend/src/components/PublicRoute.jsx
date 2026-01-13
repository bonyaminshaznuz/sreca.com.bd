import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  // Check if user is logged in (has user data in localStorage)
  const user = localStorage.getItem('user');
  
  if (user) {
    // User is already logged in, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  // User is not logged in, allow access to public route (login/signup)
  return children;
}

export default PublicRoute;
