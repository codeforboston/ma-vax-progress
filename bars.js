// given percentage, return number between 0 and 1
function getPopulationPercentage(dosesAdministrated, totalPopulation) {
  if (
    typeof dosesAdministrated !== "number" ||
    typeof totalPopulation !== "number" ||
    totalPopulation === 0
  ) {
    return 0;
  }

  let result = dosesAdministrated / totalPopulation;
  if (result < 0) {
    result = 0;
  } else if (result > 1) {
    result = 1;
  }
  return result;
}

const barCharacters = ["█", "▓", "░"]; // [100%, 50%, 0%]
function getBarString(totalCharactersOfBars = 20, percentage) {
  if (percentage < 0) {
    percentage = 0;
  }
  if (percentage > 1) {
    percentage = 1;
  }
  if (totalCharactersOfBars > 100) {
    totalCharactersOfBars = 100;
  }
  const blockValue = 100 / totalCharactersOfBars;
  const value = (100 * percentage) / blockValue;
  const fullChars = Math.trunc(value);
  const remainder = (value % 1) % blockValue;
  let bar = "";
  // from 0 to fullChars, set a full char
  let currIndex = 1;
  const [oneBlock, halfBlock, zeroBlock] = barCharacters;
  while (currIndex <= fullChars) {
    bar += oneBlock;
    currIndex++;
  }

  if (remainder >= 0.5) {
    bar += halfBlock;
    currIndex++;
  }
  while (currIndex < totalCharactersOfBars) {
    bar += zeroBlock;
    currIndex++;
  }
  // set next index to reaminder char
  // set remainder to none
  return bar;
}

// test
// getpercentage should return number
// console.log("test getPopulationPercentage");
// console.log(getPopulationPercentage(0, 10000)); // 0ß
// console.log(getPopulationPercentage(-10, 10000)); //negative
// console.log(getPopulationPercentage(10, 100)); //floating
// console.log(getPopulationPercentage(5, 1000));
// console.log(getPopulationPercentage(5000, 1000));
// console.log(getPopulationPercentage(100, 100));

// console.log("test getBarString---------");
// console.log(getBarString(20, 0.5));
// console.log(getBarString(20, 0.26));
// // console.log(getBarString(30, 0.5));
// // console.log(getBarString(40, 0.24));
// // console.log(getBarString(43, 0.25));
// // console.log(getBarString(100, 0));
// // console.log(getBarString(10, 0.26));
// console.log(getBarString(30, 0.26));

module.exports = { getBarString, getPopulationPercentage };
