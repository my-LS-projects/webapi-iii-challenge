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
    get()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json({ error: "Failed to get posts" }))
});

router.get('/:id', validatePostId, (req, res) => {
    const { id } = req.params
    getById(id)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(500).json({ error: "Failed to get post" }))
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    remove(id)
    .then(post => res.status(200).json({ message: `Post with id of ${id} deleted`}))
    .catch(error => res.status(500).json({ error: "The post could not be deleted" }))
});

router.put('/:id', validatePostId, (req, res) => {
    const { id } = req.post
    console.log('REQ BODY', req.body)

    if (!req.post) {
        res.status(400).json({ message: "Please provide post text to update." })
    } else {
        update(id, req.body)
        .then(post => res.status(200).json(`Post updated`, { post }))
        .catch(error => res.status(500).json({ error: "Post could not be updated." }))
    }
});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params

    getById(id)
    .then(post => {
       if (post) {
           req.post = post
           next()
       } else {
           res.status(400).json({ message: "The post with the specified ID does not exist" })
       }
    })
    .catch(error => res.status(400).json({ error: "Post does not exist" }))
};

module.exports = router;