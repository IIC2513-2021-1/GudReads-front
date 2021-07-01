import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import useAuth from '../hooks/useAuth';
import CreateAuthor from '../components/CreateAuthor';

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/authors`)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' })
          .deserialize(data, (_error, authorList) => setAuthors(authorList));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const addAuthor = (author) => setAuthors((prevState) => [...prevState, author]);

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
          {currentUser && (
          <p>
            Logged in as
            {' '}
            {currentUser.email}
          </p>
          )}
          <h2>Authors</h2>
          {authors.map(({ id, firstName, lastName }) => <div key={id}><Link to={`/authors/${id}`}>{`${firstName} ${lastName}`}</Link></div>)}
          <CreateAuthor addAuthor={addAuthor} />
        </div>
      )}
    </div>
  );
}
