import React, { useContext, useEffect, useState } from "react";
import Book3D from '../components/Book3D';
import { getBookBySelfLink, getBooksLinksBySubject } from "../helpers/booksAPI";
import { genres } from "../helpers/genres";
import { useColor } from 'color-thief-react';
import { addToShelf } from "../helpers/database";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import coverBookIcon from '../assets/images/matchbook-cover-icon.png';
import './styles/match.scss';

export default function Match() {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [genre, setGenre] = useState();
  const [results, setResults] = useState();
  const [resultsChanged, setResultsChanged] = useState(false);
  const [book, setBook] = useState();
  const [bookIndex, setBookIndex] = useState(0);

  const [dominantColor, setDominantColor] = useState();
  
  const [show, setShow] = useState('');
  const [likeOrSkip, setLikeOrSkip] = useState('');

  const { data } = useColor( (book && book.imageLinks && `http://localhost:8081/${book.imageLinks.thumbnail}`) || 'images/default-profile.png' , 'rgbArray', {crossOrigin: 'anonymous'});

  useEffect(() => {
    setDominantColor(data);
  }, [data]);

  useEffect(() => {
    getNewBook();
  }, [resultsChanged]);
  
  const getNewBook = () => {
    setBookIndex(prev => prev + 1);
    if (results) {
      setShow('--show');
      setTimeout(() => {
        getBookBySelfLink(results[bookIndex].selfLink)
        .then(res => {
          setBook(res.data.volumeInfo);
          setShow('');
        });
      }, 1200);
    }
  }

  const handlePickGenre = (category) => {
    // If current genre already selected, do nothing
    if (genre === category) return;
    setLikeOrSkip('');
    setGenre(category);
    setBookIndex(0);
    getBooksLinksBySubject(category)
    .then(res => {
      setResults(res.data.items);
      setResultsChanged(prev => !prev);
    });
  }

  const handleLikeBook = () => {
    if (book && book.industryIdentifiers) {
      addToShelf(user.id, book.industryIdentifiers[0].identifier, 'want_to_reads');
    }
    setLikeOrSkip('liked');
    getNewBook();
  }

  const handleSkipBook = () => {
    setLikeOrSkip('skipped');
    getNewBook();
  }

  const getGenres = (genres) => {
    return genres.map((category, index) => {
      return (
        <div
          key={index}
          className={`genre ${genre === category && 'selected'}`}
          onClick={() => handlePickGenre(category)}
        >
          {category}
        </div>
      );
    });
  }

  return (
    <>
      <div className="matchbook__tag-line">🔥 <em>Ignite your passion for reading!</em></div>
      <div className="matchbook__main-container">
        <div className="genres-container">
          Pick a genre:
          {getGenres(Object.keys(genres))}
        </div>
        <div className="matchbook__container">
          <div className={`loading-cover${show} ${likeOrSkip}`}><img className="loading-cover-icon" src={coverBookIcon} alt="Cover Book Icon"></img></div>
          <div className="matchbook__canvas-container">
            <Book3D coverImage={(book && book.imageLinks && book.imageLinks.thumbnail) || 'images/no-book-thumbnail.png'} pages={(book && book.pageCount) || 300} dominantColor={dominantColor} />
            {/* <Book3D coverImage={'images/no-book-thumbnail.png'} pages={(book && book.pageCount) || 300} dominantColor={dominantColor} /> */}
          </div>
            <header className="basic-info-container">
              <div className="basic-info-title">{book && book.title}</div>
              <div>📖 {(book && book.pageCount && `${book.pageCount} pages`) || 'No pages'}</div>
              <div>🗓 {(book && book.publishedDate && book.publishedDate.split('-')[0]) || 'No year'}</div>
              <div>⭐️ {(book && book.averageRating) || 'No reviews'} {book && book.ratingsCount && `(${book.ratingsCount} reviews)`}</div>
              <div>👤 {(book && book.authors && book.authors[0]) || 'No author'}</div>
              <div style={{marginTop: 10}}>Description</div>
              <div className="basic-info-description" dangerouslySetInnerHTML={{__html: (book && book.description) || 'No description'}}></div>
            </header>
            <footer className="icons-container">
              <div className="skip-icon" onClick={() => handleSkipBook()}></div>
              <div className="like-icon" onClick={() => handleLikeBook()}></div>
            </footer>
        </div>
      </div>
    </>
  );
}