import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { getBookBySelfLink } from "../helpers/booksAPI";
import { addToClubCurrentBook, addToShelf } from "../helpers/database";
import "./styles/BookInfoCard.scss";

export default function BookInfoCard(props) {

  const { user } = useContext(UserContext);

  const { selfLink, setBookSelfLink } = props;
  const [book, setBook] = useState();
  const [showCard, setShowCard] = useState('');
  const [showShelves, setShowShelves] = useState('');

  useEffect(() => {
    getBookBySelfLink(selfLink)
    .then(res => {
      console.log(res);
      setBook(res.data.volumeInfo);
      setShowCard('--show');
      setShowShelves('');
    });
  }, []);

  const closeBookCardFull = () => {
    setShowCard('');
    setShowShelves('');
    setBookSelfLink(null);
  }

  const handlePickShelf = (shelf) => {
    addToShelf(user.id, book.industryIdentifiers[0].identifier, shelf);
    setShowShelves('');
  }

  return (
    <div className={`book-full${showCard}`}>
      <div className="book-full-overlay">
        <div className="book-full-container">
          <img className="book-full-close-btn" onClick={() => closeBookCardFull()} src="images/close-full-book.png" alt="Close Button"/>
          <div className="book-full-left">
            {book && book.title && <div style={{fontWeight: 900, fontSize: "x-large"}}>{book.title}</div>}
            {book && book.subtitle && <div style={{fontWeight: 700}}>{book.subtitle}</div>}
            {book && book.pageCount && <div className="book-full-info"><span>Pages: </span>{book.pageCount}</div>}
            {book && book.categories && <div className="book-full-info"><span>Genre: </span>{book.categories[0]}</div>}
            {book && book.publishedDate && <div className="book-full-info"><span>Date published: </span>{book.publishedDate}</div>}
            {book && book.authors && <div className="book-full-info"><span>Author: </span>{book.authors[0]}</div>}
            {book && book.publisher && <div className="book-full-info"><span>Publisher: </span>{book.publisher}</div>}
            {book && book.industryIdentifiers && <div className="book-full-info"><span>ISBN: </span>{book.industryIdentifiers[0].identifier}</div>}
            {book && book.description && <div style={{fontWeight: 600}}>Description:</div>}
            {book && book.description && <div className="book-full-description" dangerouslySetInnerHTML={{__html: book.description}}></div>}
          </div>

          <div className="book-full-right">
            <img
              className="book-full-cover"
              src={( book && book.imageLinks && 
                // (
                // book.imageLinks.large ||
                // book.imageLinks.medium ||
                // book.imageLinks.small ||
                // book.imageLinks.thumbnail )
                book.imageLinks.thumbnail
                ) ||
                "images/no-book-thumbnail.png"}
              alt="Full Book Cover"
            />
            <div style={{fontWeight: 800}}>Add to:</div>
            <div className={`shelf-btns-container${showShelves}`}>
              <div className="shelf-btn" onClick={() => handlePickShelf('current_reads')}>Currently Reading</div>
              <div className="shelf-btn" onClick={() => handlePickShelf('want_to_reads')}>Want To Read</div>
              <div className="shelf-btn" onClick={() => handlePickShelf('have_reads')}>Finished Reading</div>
            </div>
            <div className="add-to-btn" onClick={() => setShowShelves(showShelves === '' ? '--show' : '')}>My Shelf</div>
            <div className="add-to-btn" onClick={() => addToClubCurrentBook(user.id, book.industryIdentifiers[0].identifier)}>Bookclub's Currently Reading</div>
          </div>

        </div>
      </div>
    </div>
  );


}