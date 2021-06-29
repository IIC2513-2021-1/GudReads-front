import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import Books from '../components/Books';

export default function AuthorDetail() {
  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/authors/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return {};
        }
        return response.json();
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, authorData) => setAuthor(authorData));
      })
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
          <h2>{`${author.firstName} ${author.lastName}`}</h2>
          <p>{`The author was born in ${author.birthDate}`}</p>
          <img src={author.imageUrl} alt={`${author.firstName} ${author.lastName}`} />
          <Books />
        </div>
      )}
    </div>
  );
}
