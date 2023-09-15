# Book'd Up
A web app that allows a user to create and sort bookshelves, as well as create and join bookclubs.

Front end is developed using [React](https://github.com/facebook/react) (initialized using [create-react-app](https://github.com/facebook/create-react-app)). HTTP requests to APIs are achieved using [Axios](https://github.com/axios/axios).
<br>
Back end is built using [Express](https://github.com/expressjs/express) which communicates with a [PostgreSQL](https://www.postgresql.org/) database.
<br><br>
[Google Books API](https://developers.google.com/books) is used to retrieve book information and covers.
<br><br>
MatchBook🔥 is a Tinder-like feature for books, where the user is presented with books one by one to skip/save depending on the genre they choose. The 3D book view is created with [react-three-fiber](https://github.com/pmndrs/react-three-fiber). A [cors-anywhere](https://github.com/Rob--W/cors-anywhere) proxy runs alongside the Express server to allow using book cover images from Google Books API. The [color-thief-react](https://github.com/jonyw4/color-thief-react) library is used to obtain the book cover's dominant color to color the 3D book's back cover and spine.

## Screenshots
![Homepage example](https://raw.githubusercontent.com/saadsidd/bookd-up/main/docs/homepage.gif)
<p align="center" style="margin-top: -10px">Home page with banner and bookclubs listed by member count</p>

<br>

![Profile example](https://raw.githubusercontent.com/saadsidd/bookd-up/main/docs/profile.gif)
<p align="center" style="margin-top: -10px">Profile page showing created/joined bookclubs and 3 bookshelves</p>

<br>

![Creating bookclub example](https://raw.githubusercontent.com/saadsidd/bookd-up/main/docs/creating-bookclub.gif)
<p align="center" style="margin-top: -10px">Creating a bookclub</p>

<br>

![Picking bookclub book example](https://raw.githubusercontent.com/saadsidd/bookd-up/main/docs/picking-bookclub-book.gif)
<p align="center" style="margin-top: -10px">Using the Search feature to pick a new book for created bookclub's "Currently reading" shelf, then moving it to "Finished reading"</p>

<br>

![Joining bookclub example](https://raw.githubusercontent.com/saadsidd/bookd-up/main/docs/joining-bookclub.gif)
<p align="center" style="margin-top: -10px">Joining a bookclub</p>

<br>

![MatchBook example](https://raw.githubusercontent.com/saadsidd/bookd-up/main/docs/matchbook.gif)
<p align="center" style="margin-top: -10px">Using MatchBook🔥 to skip and save books to "Want To Read" shelf</p>

## Getting Started
1. Install dependencies for React and Express server using `npm install` inside their respective folders
2. Start React and the server using `npm start` also inside each folder
3. Go to http://localhost:3000 in your browser

## Dependencies
### Front End
- React
- react-router-dom
- Axios
- Sass
- react-three-fiber
- color-thief-react

### Back End
- Express
- pg
- cors-anywhere
- body-parser
- dotenv
