import React from 'react';
import SingleBook from './SingleBook';
import '../styles/books.css';

function Books() {
  const bookArray = [
    {
      bookId: 1,
      title: 'Libro 1',
      img: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105',
    },
    {
      bookId: 2,
      title: 'Libro 2',
      img: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/classic-novel-kindle-book-cover-design-template-59f47ff5c79cbd1d5fa0c14e585217eb_screen.jpg?ts=1561444051',

    },
    {
      bookId: 3,
      title: 'Libro 3',
      img: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1594616847',
    },
    {
      bookId: 4,
      title: 'Libro 4',
      img: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/thriller-fantasy-book-cover-castle-mountain-design-template-890a4e62a2009241b05e70a59186240d_screen.jpg?ts=1599683486',
    },
  ];

  return (
    <div className="books">
      <div className="title">
        <h3>Books</h3>
      </div>

      <ul className="book-list">
        {bookArray.map((book) => (
          <SingleBook key={book.bookId} book={book} />
        ))}
      </ul>
    </div>
  );
}

export default Books;
