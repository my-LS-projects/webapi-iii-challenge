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

router.get('/:id', (req, res) => {
    const { id } = req.params
    getById(id)
    .then(post => {
        !post
        ? res.status(404).json({ message: "The post with the specified ID does not exist" })
        : res.status(200).json(post)
    })
    .catch(error => res.status(500).json({ error: "Failed to get post" }))
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    remove(id)
    .then(post => {
        !post
        ? res.status(404).json({ message: "The post with the specified ID does not exist" })
        : res.status(200).json({ message: `Post with id of ${id} deleted`})
    .catch(error => res.status(500).json({ error: "The post could not be deleted" }))
})
});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;