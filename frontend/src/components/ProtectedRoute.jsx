import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProfile } from '../api/auth';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      // Check if user is logged in (has valid user data in localStorage)
      const userData = localStorage.getItem('user');
      
      if (!userData) {
        // User is not logged in, redirect to login
        setIsAuthenticated(false);
        setIsChecking(false);
        return;
      }

      // Validate that user data is valid JSON and has required fields
      let parsedUser;
      try {
        parsedUser = JSON.parse(userData);
        if (!parsedUser || !parsedUser.id || !parsedUser.email) {
          // Invalid user data, clear it
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setIsChecking(false);
          return;
        }
      } catch (error) {
        // Invalid JSON, clear it
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setIsChecking(false);
        return;
      }

      // Verify user exists in backend
      try {
        const response = await getProfile(parsedUser.id);
        if (response.success && response.profile) {
          // User exists in backend, allow access
          setIsAuthenticated(true);
        } else {
          // User not found in backend, clear localStorage and redirect
          localStorage.removeItem('user');
          setIsAuthenticated(false);
        }
      } catch (error) {
        // Check if it's a 404 (user not found) or network error
        if (error.response?.status === 404) {
          // User not found in backend, clear localStorage and redirect
          localStorage.removeItem('user');
          setIsAuthenticated(false);
        } else {
          // Network error or other API error - allow access but Dashboard will verify again
          // This prevents blocking users due to temporary network issues
          console.warn('ProtectedRoute: API verification failed, allowing access (will verify in Dashboard):', error);
          setIsAuthenticated(true);
        }
      }
      
      setIsChecking(false);
    };

    verifyUser();
  }, []);

  // Show nothing while checking (prevents flash of content)
  if (isChecking) {
    return null;
  }

  // User is not logged in or doesn't exist in backend, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // User is logged in and verified, allow access to protected route
  return children;
}

export default ProtectedRoute;
