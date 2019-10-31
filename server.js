const express = require('express');
const helmet = require('helmet')
const server = express();
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

server.use(helmet());
server.use(express.json())
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use('/api/users', logger, userRouter)
server.use('/api/posts', logger, postRouter)

//custom middleware

function logger(req, res, next) {
  console.log(new Date().toISOString());
  console.log('HTTP Method: ', req.method)
  console.log('Original URL: ', req.originalUrl)
  
  next()
};

module.exports = server;
