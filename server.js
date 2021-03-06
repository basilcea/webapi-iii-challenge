const express = require ("express");
const router = require('./users/userRouter')

const server = express();

const Port = process.env.PORT || 2020

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log({
    Request_Method: req.method,
    Request_Url: req.url,
    Timestamp: new Date().toISOString(),
  });
  next();
}

server.use(express.json());
server.use(logger);
server.use(express.urlencoded({ extended: true }));
server.use('/api/users', router )

server.listen(Port , ()=> {
  console.log('Listening into the future - 2020')
})
module.exports = server;
