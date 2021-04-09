const http = require("http");
const interval = require("interval");
const tweet = require("./tweet.js");
const hostname = "127.0.0.1";
const port = 4343;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});
let timer;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  //   setInterval(tweet, interval({ days: 1 }));
  tweet();
});
