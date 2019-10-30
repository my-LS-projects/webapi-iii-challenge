const express = require('express');
const postDb = require('./postDb')
const router = express.Router();
const {
    get,
    getById,
    insert,
    update,
    remove,
  } = postDb;

router.get('/', (req, res) => {
    get().then(posts => res.status(200).json(posts)).catch(error => res.status(500).json({ error: "Failed to get posts" }))
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;