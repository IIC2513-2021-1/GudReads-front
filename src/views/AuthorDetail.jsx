import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Books from '../components/Books';

export default function AuthorDetail() {
  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return {};
        }
        return response.json();
      })
      .then(setAuthor)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <Link to="/authors">Authors</Link>
      {error ? (
        <h2>Something went wrong, please try again later</h2>
      ) : (
        <div>
          <h2>{author.name}</h2>
          <Books />
        </div>
      )}
    </div>
  );
}
