const express = 'express';
const helmet = require('helmet')
const server = express();

server.use(helmet());
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};

module.exports = server;
