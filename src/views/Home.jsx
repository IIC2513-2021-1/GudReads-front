import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Home() {
  const { currentUser, handleUserLogout } = useAuth();

  return (
    <div>
      <div>
        <h2>
          Welcome to Gud Reads
          {' '}
          {currentUser?.firstName}
        </h2>
        <Link to="/authors">Authors</Link>
      </div>
      <div>
        {currentUser ? (
          <>
            <h3>Logout from your current account in order to log in</h3>
            <button type="button" onClick={handleUserLogout}>Logout</button>
          </>
        ) : (
          <>
            <h3>Have an account? Log In</h3>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}
