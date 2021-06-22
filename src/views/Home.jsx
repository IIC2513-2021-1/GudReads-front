import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h2>Welcome to Gud Reads</h2>
      <Link to="/authors">Authors</Link>
    </div>
  );
}
