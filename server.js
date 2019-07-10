const express = "express";

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

module.exports = server;
