const http = require("http");
var CronJob = require("cron").CronJob;

const tweet = require("./tweet.js");

const hostname = "127.0.0.1";
const port = 4343;

const time = "1 22 * * *"; // time for cron
let job;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  job = new CronJob(
    time,
    function () {
      console.log("You will see this message at 9:12pm");
      tweet();
    },
    null,
    true,
    "America/Los_Angeles"
  );
});

server.close(function () {

  if (job) {
    console.log("job stopped");
    job.stop();
  }
});
