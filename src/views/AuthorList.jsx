import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then(setAuthors)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <Link to="/">Home</Link>
      {error ? (
        <h2>Something went wrong, please try again later</h2>
      ) : (
        <div>
          <h2>Authors</h2>
          {authors.map(({ id, name }) => <div key={id}><Link to={`/authors/${id}`}>{name}</Link></div>)}
        </div>
      )}
    </div>
  );
}
