const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET

// GET entire task list
router.get('/', (req, res) => {
  // Set queryText
  const queryText = `SELECT * FROM "task_list" ORDER BY "id";`;

  pool
    .query(queryText)
    .then((result) => {
      console.log('Received query results from DB:', result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.error(`ERROR in '/' GET query: ${err}`);
      res.sendStatus(500);
    });

});


// POST

// PUT

// DELETE

module.exports = router;
