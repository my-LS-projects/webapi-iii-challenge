const express = require("express");
const router = express.Router();
const userDb = require("./userDb");
const postDb = require("../posts/postDb");
const { get, getById, getUserPosts, insert, update, remove } = userDb;

router.post("/", validateUser, (req, res) => {
  insert(req.body.name)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json({ error: "Could not create user" }));
});

router.post("/:id/posts/", validateUserId, validatePost, (req, res) => {
  const blog = { text: req.body.text, user_id: req.user.id };
  console.log("hello");
  postDb
    .insert(blog)
    .then(post => res.status(201).json(post))
    .catch(() => res.status(500).json({ error: "Post not created" }));
});

router.get("/", (req, res) => {
  get()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({ error: "Could not get users" }));
});

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.user;
  getById(id)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json({ error: "Could not get user" }));
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.user;

  getUserPosts(id)
    .then(posts => res.status(200).json(posts))
    .catch(error =>
      res.status(500).json({ error: "Failed to get user posts" })
    );
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.user;

  remove(id)
    .then(user =>
      res.status(200).json({ message: `User with id of ${id} deleted` })
    )
    .catch(error => res.status(500).json({ error: "Could not delete user" }));
});

router.put("/:id", validateUser, (req, res) => {
  const { id } = req.user;

  update(id, req.body)
    .then(user => res.status(200).json({ message: "User updated" }))
    .catch(error => res.status(500).json({ error: "Unable to update user" }));
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;

  getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ error: "User ID does not exist" });
      }
    })
    .catch(() => res.status(400).json({ gang: "gang" }));
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  }
  next();
}

function validatePost(req, res, next) {
    console.log('REQ', req)
    console.log('REQ BODY', req.body)
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  }
  next();
}

module.exports = router;
