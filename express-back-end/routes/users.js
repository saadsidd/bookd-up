const express = require('express');
const router = express.Router();

// Helper: takes array of objects of ISBNs and returns simple array of ISBNs
const cleanUpISBNs = function(array) {
  const isbns = [];
  for (const item of array) {
    isbns.push(item.isbn);
  }
  return isbns;
};

module.exports = (db) => {

  // Getting a specific user by id
  router.get('/:id', (req, res) => {

    db.query(`
        SELECT id, first_name, last_name
        FROM users
        WHERE id = $1
    `, [req.params.id])
      .then(data => res.json({user: data.rows[0]}))
      .catch(error => res.status(500).json({error: error.message}));

  });

  // Getting specific user's 3 shelves
  router.get('/:id/shelves', (req, res) => {
    Promise.all([
      db.query(`
        SELECT isbn
        FROM current_reads
        WHERE user_id = $1
    `, [req.params.id]),
      db.query(`
        SELECT isbn
        FROM want_to_reads
        WHERE user_id = $1
    `, [req.params.id]),
      db.query(`
        SELECT isbn
        FROM have_reads
        WHERE user_id = $1
    `, [req.params.id])
    ])
      .then(data => {
        const current = cleanUpISBNs(data[0].rows);
        const want = cleanUpISBNs(data[1].rows);
        const have = cleanUpISBNs(data[2].rows);
        res.json({current, want, have});
      })
      .catch(error => res.status(500).json({error: error.message}));
  });

  // Getting clubs created and joined by specific user
  router.get('/:id/clubs', (req, res) => {
    Promise.all([
      db.query(`
        SELECT bookclubs.*, count(members.user_id) as member_count
        FROM bookclubs
        LEFT JOIN members ON bookclubs.id = members.club_id
        WHERE bookclubs.user_id = $1
        GROUP BY bookclubs.id;
    `, [req.params.id]),
      db.query(`
        SELECT bookclubs.*, count(members.user_id) as member_count
        FROM bookclubs
        LEFT JOIN members ON bookclubs.id = members.club_id
        WHERE bookclubs.id IN (SELECT club_id FROM members WHERE user_id = $1) AND bookclubs.user_id <> $1
        GROUP BY bookclubs.id
        ORDER BY member_count DESC
    `, [req.params.id])
    ])
      .then(data => res.json({created: data[0].rows, joined: data[1].rows}))
      .catch(error => res.status(500).json({error: error.message}));

  });

  router.post('/:id/clubs/current', (req, res) => {
    db.query(`
      UPDATE bookclubs SET current_book = $1 WHERE user_id = $2;
    `, [req.body.isbn, req.params.id])
      .then(() => res.json({message: 'successfully added to bookclub current reading'}));
  });

  router.post('/:id/shelves', (req, res) => {
    const shelf = req.body.shelf;
    Promise.all([
      db.query(`
        DELETE FROM want_to_reads
        WHERE user_id = $1 AND isbn = $2
      `, [req.params.id, req.body.isbn]),
      db.query(`
        DELETE FROM have_reads
        WHERE user_id = $1 AND isbn = $2
    `, [req.params.id, req.body.isbn]),
      db.query(`
        DELETE FROM current_reads
        WHERE user_id = $1 AND isbn = $2
    `, [req.params.id, req.body.isbn]),
      db.query(`
        INSERT INTO ${shelf}(user_id, isbn)
        VALUES ($1, $2)
    `, [req.params.id, req.body.isbn])
    ])
      .then(() => res.sendStatus(200))
      .catch(error => res.status(500).json({error: error.message}));
  });

  // Creating a new user
  router.post('/', (req, res) => {

    const params = [
      req.body['first_name'],
      req.body['last_name'],
      req.body['email'].toLowerCase(),
      req.body['password']
    ];

    db.query(`
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name;
    `, params)
      .then((data) =>{
        res.json({message: 'user created successfully', user: data.rows[0]});
      })
      .catch(error => res.status(500).json({error: error.message}));
      
  });

  //Login
  router.post('/login', (req, res) => {

    const params = [
      req.body['email'],
      req.body['password']
    ];

    db.query(`
      SELECT id, first_name, last_name
      FROM users
      WHERE email = $1 AND password = $2
      `, params)
      .then((data) => {
        res.json({ user: data.rows[0] });
      })
      .catch(error => res.status(500).json({error: error.message}));

  });

  return router;
};