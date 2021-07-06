import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Home() {
  const { currentUser, handleUserLogout } = useAuth();

  return (
    <div>
      <h2>
        Welcome to Gud Reads
        {' '}
        {currentUser?.firstName}
      </h2>
      <Link to="/authors">Authors</Link>
      <div>
        {currentUser ? (
          <button type="button" onClick={handleUserLogout}>Logout</button>
        ) : (
          <>
            <h3>Have an account? Log In</h3>
            <Link to="/login">Login</Link>
            <h3>Do not have an account yet? Sign Up</h3>
            <Link to="/signup">Sign up!</Link>
          </>
        )}
      </div>
    </div>
  );
}
