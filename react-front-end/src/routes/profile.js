import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { cleanUpShelf, getBooksByISBN } from "../helpers/booksAPI";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Bookshelf from "../components/Bookshelf";
import ShelfBook from "../components/ShelfBook";
import BookInfoCard from "../components/BookInfoCard";
import Button from '../components/Button';
import ClubCard from "../components/ClubCard";
import "./styles/profile.scss";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [clubs, setClubs] = useState({});
  const [shelves, setShelves] = useState({});
  const [bookSelfLink, setBookSelfLink] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    Promise.all([
      axios.get(`/api/users/${user.id}/clubs`),
      axios.get(`/api/users/${user.id}/shelves`)
    ]).then((res) => {
      setClubs(res[0].data);
      setIsLoading(true);

      // Send ISBNs to helper function and get back promises to get data from book API
      Promise.all([
        getBooksByISBN(res[1].data.current),
        getBooksByISBN(res[1].data.want),
        getBooksByISBN(res[1].data.have)
      ]).then((res) => {
        // Clean up the returned book data before setting state
        setShelves({
          current: cleanUpShelf(res[0]),
          want: cleanUpShelf(res[1]),
          have: cleanUpShelf(res[2]),
        });
        setIsLoading(false);
      });
    })
    .catch(error => console.log(error));
  }, []);

  const create = () => {
    navigate("/create");
  };

  const getClubs = (clubs) => {
    return clubs.map(club => {
      return (
        <ClubCard
          key={club.id}
          id={club.id}
          imageURL={club.image_url || "images/default-club.png"}
          name={club.name}
          memberCount={club.member_count}
          description={club.description}
        />
      );
    });
  };

  const getShelfBooks = (shelf) => {
    return shelf.map((book, index) => {
      return (
        <ShelfBook
          key={index}
          thumbnail={(book.imageLinks && book.imageLinks.thumbnail) || "images/no-book-thumbnail.png"}
          title={book.title}
          year={book.publishedDate.split("-")[0]}
          author={book && book.authors && book.authors[0]}
          selfLink={book && book.selfLink}
          setBookSelfLink={setBookSelfLink}
        />
      );
    });
  }

  return (
    <>
      <div className="profile__banner">
        <img className="profile__banner-image" src="images/default-profile.png" alt="Default Profile" />
        <h1>{user && user.first_name} {user && user.last_name}</h1>
      </div>

      <div className="profile__clubs-container">
        <h1>Created Club</h1>
        {clubs.created && clubs.created.length === 0 && (
          <div>
            Looks like you haven't created a bookclub yet!
            <div className="profile__start-club-btn"><Button text="Start a Bookclub" handleClick={create} /></div>
          </div>
        )}
      </div>

      <div className="profile__clubs">
        {clubs.created && clubs.created.length > 0 && getClubs(clubs.created)}
      </div>

      <div className="profile__clubs-container">
        <h1>Joined Clubs</h1>
      </div>
      <div className="profile__clubs">
        {(clubs.joined && clubs.joined.length > 0 && getClubs(clubs.joined)) || <div style={{width: '500px'}}>Join a bookclub to meet other book lovers just like you!</div>}
      </div>

      <div className="profile__bookshelves-container">
        <h1>My Bookshelves</h1>
        <div style={{border: '3px solid black'}}>
          <Bookshelf label="Currently Reading" isLoading={isLoading} books={shelves.current && getShelfBooks(shelves.current)} />
          <Bookshelf label="Want To Read" isLoading={isLoading} books={shelves.want && getShelfBooks(shelves.want)} />
          <Bookshelf label="Finished Reading" isLoading={isLoading} books={shelves.have && getShelfBooks(shelves.have)} />
        </div>
      </div>

      {bookSelfLink && <BookInfoCard setBookSelfLink={setBookSelfLink} selfLink={bookSelfLink} />}
    </>
  );
};