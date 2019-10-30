const express = require('express');
const helmet = require('helmet')
const server = express();
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

server.use(helmet());
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

//custom middleware

function logger(req, res, next) {

};

module.exports = server;
