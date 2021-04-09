const Twitter = require("twit");
const request = require("request");

require("dotenv").config();

const populations = require("./populations.json");
const { getBarString, getPopulationPercentage } = require("./bars.js");

const state = "Massachusetts";
const url =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/us_state_vaccinations.csv";

const T = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  strictSSL: true, //
});
function tweet() {
  const updateStatus = (newStatus) =>
    T.post(
      "statuses/update",
      { status: `${newStatus}` },
      function (err, data, response) {
        console.log(response.text, data);
        if (err) {
          console.log(err);
        }
      }
    );
  getRawData(url, state, updateStatus);
}
function getPopulation(state) {
  return parseInt(populations[state].pop) || 0;
}

function getRawData(url, state, tweet) {
  request(url, function (error, response, body) {
    const peopleVaccinated = getPeopleVaccinatedByState(body, state);
    const percentageVaccinated = getPopulationPercentage(
      peopleVaccinated,
      getPopulation(state)
    );
    const newStatus = getNewStatus(percentageVaccinated);
    tweet(newStatus);
  });
}
function getNewStatus(percentageVaccinated) {
  return `${getBarString(25, percentageVaccinated)} ${(
    percentageVaccinated * 100
  ).toFixed(4)}%`;
}
function getPeopleVaccinatedByState(lines, state) {
  lines = lines.split("\n");
  lines = lines.filter((line) => line.split(",")[1] === state);
  const peopleVaccinated = parseInt(lines[lines.length - 1].split(",")[4]);
  return peopleVaccinated;
}

module.exports = tweet;
