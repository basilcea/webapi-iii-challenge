const express = require ("express");
const router = require('./users/userRouter')

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log({
    Request_Method: req.method,
    Request_Url: req.url,
    Timestamp: new Date().toISOString(),
    Origin: req.get("Origin")
  });

  next();
}
server.use('/api/users',logger(), router)

server.listen(2020 , ()=> {
  console.log('Listening into the future - 2020')
})
module.exports = server;
