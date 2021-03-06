import React from 'react';

function SingleBook(props) {
  const { book } = props;
  return (
    <li className="single-book">
      <h3>{book.title}</h3>
      <img alt="book" src={book.img} />
    </li>
  );
}

export default SingleBook;
