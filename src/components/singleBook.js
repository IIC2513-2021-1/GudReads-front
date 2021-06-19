
function SingleBook(props) {
    const { book } = props;
    return (
        <li className="SingleBook">
        <h3> {book.title} </h3>
        <img src= {book.img}/>
      </li>
    );
   }
    
   export default SingleBook;