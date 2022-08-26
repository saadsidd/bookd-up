# Book'd Up
A web app that allows a user to create and sort bookshelves, as well as create and join bookclubs.

The front end is developed using [React](https://github.com/facebook/react) and initially setup using [create-react-app](https://github.com/facebook/create-react-app). HTTP requests to APIs are achieved using [Axios](https://github.com/axios/axios).
<br>
The back end is built using [Express](https://github.com/expressjs/express) which communicates with a [PostgreSQL](https://www.postgresql.org/) database.
<br><br>
[Google Books API](https://developers.google.com/books) is used to retrieve book information and covers.
<br><br>
MatchBook🔥 is a Tinder-like feature for books, where the user is presented with books one by one to skip/save depending on the genre they choose. The 3D book view is created with [react-three-fiber](https://github.com/pmndrs/react-three-fiber). A [cors-anywhere](https://github.com/Rob--W/cors-anywhere) proxy runs alongside the Express server to allow using book cover images from Google Books API. [color-thief-react](https://github.com/jonyw4/color-thief-react) is used to obtain the cover's dominant color to use with the 3D book's back cover and spine.

## Screenshots

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