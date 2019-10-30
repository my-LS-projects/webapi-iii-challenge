const express = require('express');
const userDb = require('./userDb');
const router = express.Router();
const {
    get,
    getById,
    getUserPosts,
    insert,
    update,
    remove
} = userDb;

router.post('/', (req, res) => {
    insert(req.body)
    .then(user => res.json())
    .catch()
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
