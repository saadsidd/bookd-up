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

  // Getting single club by id
  router.get('/:id', (req, res) => {

    let club, members, creator, finished;

    // Get club + members count, then members names, then finished books
    // After promise all resolves get club creator name
    Promise.all([
      db.query(`
        SELECT bookclubs.*, count(members.user_id) as member_count
        FROM bookclubs LEFT JOIN members ON bookclubs.id = members.club_id
        WHERE bookclubs.id = $1
        GROUP BY bookclubs.id;
      `, [req.params.id]),
      db.query(`
        SELECT users.id, first_name, last_name
        FROM users
        JOIN members ON users.id = user_id
        WHERE user_id IN (SELECT user_id FROM members WHERE club_id = $1) AND club_id = $1
      `, [req.params.id]),
      db.query(`
        SELECT isbn
        FROM finished_books
        WHERE club_id = $1
      `, [req.params.id])
    ])
      .then(data => {
        club = data[0].rows[0];
        members = data[1].rows;
        finished = cleanUpISBNs(data[2].rows);
        return db.query(`
            SELECT id, first_name, last_name
            FROM users
            WHERE id = $1
        `, [club.user_id]);
      })
      .then(data => {
        creator = data.rows[0];
        res.json({ club, creator, members, finished });
      })
      .catch(error => res.status(500).json({error: error.message}));

  });
  
  // Getting all clubs and their # of members sorted by highest to lowest member count
  router.get('/', (req, res) => {

    db.query(`
      SELECT bookclubs.*, count(members.user_id) as member_count
      FROM bookclubs
      LEFT JOIN members ON bookclubs.id = members.club_id
      GROUP BY bookclubs.id
      ORDER BY member_count DESC;
    `)
      .then(data => res.json({clubs: data.rows}))
      .catch(error => res.status(500).json({error: error.message}));

  });

  // Creating a new club
  router.post('/', (req, res) => {

    const params = [
      req.body['user_id'],
      req.body['name'],
      req.body['description'],
      req.body['private'],
      req.body['image_url']
    ];

    db.query(`
      INSERT INTO bookclubs (user_id, name, description, private, image_url)
      VALUES ($1, $2, $3, $4, $5) RETURNING id;
    `, params)
      .then(data => {
        return db.query(`
          INSERT INTO members(club_id, user_id)
          VALUES ($1, $2)
        `, [data.rows[0].id, req.body['user_id']]
        );
      })
      .then(() => res.json({message: 'club created successfully'}))
      .catch(error => res.status(500).json({error: error.message}));

  });

  // Joining a bookclub
  router.post('/:id', (req, res) => {
    Promise.all([
      db.query(`
        DELETE FROM members WHERE club_id = $1 AND user_id = $2
      `, [req.params.id, req.body['user_id']]),
      db.query(`
        INSERT INTO members(club_id, user_id)
        VALUES ($1, $2)
    `, [req.params.id, req.body['user_id']])
    ])
      .then(() => res.json({message: 'joined club successfully'}))
      .catch(error => res.status(500).json({error: error.message}));
  });

  // Remove book from current_book and add to finished_books
  router.post('/:id/complete', (req, res) => {
    Promise.all([
      db.query(`
        UPDATE bookclubs SET current_book = null WHERE id = $1
      `, [req.params.id]),
      db.query(`
        INSERT INTO finished_books(club_id, isbn)
        VALUES ($1, $2)
      `, [req.params.id, req.body.isbn])
    ])
      .then(() => res.json({message: 'successfully moved to finished'}))
      .catch(error => res.status(500).json({error: error.message}));
  });

  // Adding book to current_book
  router.post('/:id/current', (req, res) => {
    db.query(`
      UPDATE bookclubs SET current_book = $1 WHERE id = $2
    `, [req.body.isbn, req.params.id])
      .then(() => res.json({message: 'added to club current_book'}))
      .catch(error => res.status(500).json({error: error.message}));
  });

  return router;
};