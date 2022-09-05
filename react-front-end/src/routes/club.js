import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { cleanUpShelf, getBooksByISBN } from "../helpers/booksAPI";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import ShelfBook from "../components/ShelfBook";
import "./styles/club.scss";

export default function Club() {
  const { id } = useParams();

  const [bookclub, setBookclub] = useState({});
  const [alreadyJoined, setAlreadyJoined] = useState();
  const [currentBook, setCurrentBook] = useState([]);
  const [finishedBooks, setFinishedBooks] = useState([]);
  const [bookSelfLink, setBookSelfLink] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get(`/api/clubs/${id}`).then((res) => {
      setBookclub(res.data);
      for (const member of res.data.members) {
        if (member.id === user.id) {
          setAlreadyJoined(true);
        }
      }

      // Send ISBNs to helper function and get back promises to get data from book API
      Promise.all([
        getBooksByISBN([res.data.club.current_book]),
        getBooksByISBN(res.data.finished),
      ]).then((res) => {
        setCurrentBook(cleanUpShelf(res[0]));
        setFinishedBooks(cleanUpShelf(res[1]));
      });
    });
  }, []);

  // Check if user is creator to allow for picking/moving bookclub books
  useEffect(() => {
    if (bookclub.creator && user.id === bookclub.creator.id) {
      setIsAdmin(true);
    }
  }, [bookclub]);

  // Return <li>'s made from members array
  const getMembers = (members) => {
    return members.map((member) => (
      <li key={member.id}>{`${member.first_name} ${member.last_name}`}</li>
    ));
  };

  // Return array of finished books with image, title, and author
  const getFinishedBooks = (finished) => {
    return finished.map((book, index) => {
      return (
        <div key={index} className="club__finished-book">
          <ShelfBook
            thumbnail={book.imageLinks.thumbnail}
            title={book.title}
            year={book.publishedDate.split("-")[0]}
            author={book.authors && book.authors[0]}
            selfLink={book.selfLink}
            setBookSelfLink={setBookSelfLink}
          />
        </div>
      );
    });
  };

  const handleJoinClub = () => {
    axios.post(`/api/clubs/${bookclub.club.id}`, {
      user_id: user.id
    })
    .then(() => {
      const members = [...bookclub.members, user];
      const club = { ...bookclub.club, member_count: members.length}
      setBookclub({ ...bookclub, club, members });
      setAlreadyJoined(true);
    });
  }

  const moveToFinished = () => {
    axios.post(`/api/clubs/${bookclub.club.id}/complete`, {
        isbn: currentBook[0].industryIdentifiers[0].identifier,
      })
      .then((res) => {
        //clicking finished will remove the current read for BC to the finished
        setFinishedBooks([currentBook[0], ...finishedBooks]);
        setCurrentBook([]);
      });
  };

  const navigate = useNavigate();
  const pickNewBook = () => {
    navigate("/search");
  };

  return (
    <>
      <div className="club__banner">
        <div className="club__banner-image-container">
          <img
            className="club__banner-image"
            src={(bookclub && bookclub.club && bookclub.club.image_url) || "../images/default-club.png"}
            alt="Default Club"
          />
        </div>
        <div className="club__banner-info">
          <h1>{bookclub.club && bookclub.club.name}</h1>
          <p className="club__banner-description">{bookclub.club && <em>{bookclub.club.description}</em>}</p>
          <h4>{bookclub.creator && `Created by ${bookclub.creator.first_name} ${bookclub.creator.last_name}`}</h4>
          {!alreadyJoined && <Button text="Join Club" handleClick={handleJoinClub} />}
        </div>
      </div>
      <div className="club__container">
        <h1>
          Members {`(${bookclub.club && bookclub.club.member_count})`}
        </h1>
        {(bookclub.members && bookclub.members.length > 0 && (
          <ul className="club__members">{getMembers(bookclub.members)}</ul>
        )) || <p>No members yet</p>}

        <h1>Currently reading</h1>
        <div className="club__current-book">
          {(currentBook.length > 0 &&
          <ShelfBook
            thumbnail={currentBook[0].imageLinks.thumbnail}
            title={currentBook[0].title}
            year={currentBook[0].publishedDate.split("-")[0]}
            author={currentBook[0].authors && currentBook[0].authors[0]}
            selfLink={currentBook[0].selfLink}
            setBookSelfLink={setBookSelfLink}
          />) ||
          <p>Not currently reading a book</p>}

          {isAdmin && (
            <div className="club__pick-or-finished-btn">
              {currentBook.length > 0 ? (
                <Button text="Move To Finished" handleClick={moveToFinished} />
              ) : (
                <Button text="Pick A New Book" handleClick={pickNewBook} />
              )}
            </div>
          )}
          </div>

          <h1>Finished reading</h1>
          <div className="club__finished-books">
            {(finishedBooks.length > 0 && getFinishedBooks(finishedBooks)) ||
              <p>No finished books</p>}
          </div>

      </div>


    </>
  );
}
