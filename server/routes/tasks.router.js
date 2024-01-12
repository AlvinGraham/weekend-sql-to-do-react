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
      console.log('Received query results from DB:');
      console.table(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.error(`ERROR in '/' GET query: ${err}`);
      res.sendStatus(500);
    });
});


// POST
// POST new task
router.post('/', (req, res) => {
  // Set queryText
  const queryText = `INSERT INTO task_list (title, description, priority, complete)
                    VALUES ($1, $2, $3, $4);`;
  // assemle data packet / queryArgs
  const queryArgs = [
    req.body.title,
    req.body.description,
    req.body.priority,
    req.body.complete
  ];

  pool
    .query(queryText, queryArgs)
    .then((response) => {
      console.log('Task successfuly created:');
      console.table(queryArgs);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(`ERROR in '/' POST query: ${err}`);
      res.sendStatus(500);
    });
  

});  

// PUT
// UPDATE to mark complete route
router.put('/markComplete/:taskID', (req, res) => {
// Set queryText
const queryText = `UPDATE task_list SET complete = 'true' WHERE id = $1;`;
const queryArgs = [req.params.taskID];

pool
  .query(queryText, queryArgs)
  .then((result) => {
    console.log(`Task with ID ${req.params.taskID} marked complete in DB.`);
    res.sendStatus(201);
  })
  .catch((err) => {
    console.error(`ERROR in '/markComplete:taskID' query: ${err}`);
    res.sendStatus(500);
  });


});

// DELETE

module.exports = router;
