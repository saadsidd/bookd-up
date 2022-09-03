import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBook from "../components/SearchBook";
import BookInfoCard from "../components/BookInfoCard";
import { UserContext } from "../context/UserContext";
import { cleanUpSearchResults, getBooksBySearch } from "../helpers/booksAPI";
import Button from '../components/Button';
import BookLoader from '../components/BookLoader';
import "./styles/search.scss";

export default function Search() {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [result, setResult] = useState([]);
  const [bookSelfLink, setBookSelfLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const startSearch = () => {
    setResult([]);
    setIsLoading(true);
    getBooksBySearch(search, page, filter)
    .then(res => {
      setTimeout(() => {
        setResult(cleanUpSearchResults(res.data.items));
        setIsLoading(false);
      }, 1000);
    });
  };

  useEffect(() => {
    if (search) {
      startSearch();
    }
  }, [page]);

  const getResults = (results) => {
    return results.map((result, index) => {
      return (
      <SearchBook
        key={index}
        thumbnail={(result.imageLinks && result.imageLinks.thumbnail) || "images/no-book-thumbnail.png"}
        title={result.title}
        year={result.publishedDate && result.publishedDate.split("-")[0]}
        author={result && result.authors && result.authors[0]}
        selfLink={result && result.selfLink}
        setBookSelfLink={setBookSelfLink}
        />
      );
    });
  };

  const checkSearchStatus = () => {
    if (isLoading && result.length === 0) {
      return (
        <div style={{width: '180px', margin: 'auto', marginTop: '150px'}}><BookLoader /></div>
      );
    }
    if (result.length === 0) {
      return (
        <img style={{width: '400px', display: 'block', marginRight: 'auto', marginLeft: 'auto', marginTop: '75px'}} src="images/magnifying-glass.png" alt="Magnifying Glass"/>
      );
    }
  }

  return (
    <>
      <div className="search__container">
        <h2 style={{marginRight: '140px'}}>Find a book:</h2>
        <form className="search__form" onSubmit={event => event.preventDefault()} autoComplete="off">
          <input className="search__input" placeholder="Search" value={search} onChange={event => setSearch(event.target.value)}/>
          <div className="search__btn-container">
            <Button text="Search" handleClick={startSearch} />
          </div>
        </form>
        <div className="search__filters-container">
          <input defaultChecked type="radio" name="filter" onClick={() => setFilter('')}/>All&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" name="filter" onClick={() => setFilter('intitle:')}/>Title&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" name="filter" onClick={() => setFilter('subject:')}/>Genre&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" name="filter" onClick={() => setFilter('inauthor:')}/>Author&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>

      {checkSearchStatus()}

      <div className="results__container">{result.length > 0 && getResults(result)}</div>
      
      <div className={`results__pagination-btn${result.length > 0 ? '--show' : ''}`}>
        <Button text="Prev" handleClick={() => page > 1 ? setPage(page - 1) : null} />
        <span style={{fontWeight: '800', margin: '20px'}}>{page}</span>
        <Button text="Next" handleClick={() => setPage(page + 1)} />
      </div>

      {bookSelfLink && <BookInfoCard setBookSelfLink={setBookSelfLink} selfLink={bookSelfLink} />}
    </>
  );
}
