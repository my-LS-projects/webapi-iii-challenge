const express = 'express';
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