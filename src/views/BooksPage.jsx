import Book from '../components/Book.jsx';
import Header from '../components/Header.jsx';
import { useSelector } from 'react-redux';
import { selectBooks } from '../store/booksSlice.js';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase/config.js';
import { useEffect, useState } from 'react';

function BooksPage() {

  //const books = useSelector(selectBooks);
  const [books, setBooks] = useState([]);
  const pageTitle = "📖 Book List with Router, Redux & Firebase";

  useEffect(() => {

    const fetchBooks = async () => {
      const q = query(collection(db, "books"));
      const querySnapshot = await getDocs(q);
      let bookList = [];
      querySnapshot.forEach((doc) => {
        bookList.push({id: doc.id, ...doc.data()})
      });
      setBooks(bookList);
    }

    fetchBooks();
  })



  return (
    <>
      <div className="container">
        <Header pageTitle={pageTitle} />
        <div className="books-container">
          <div className="books-list">

            {books.map(book =>

              <Book key={book.id} book={book} />

            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default BooksPage
