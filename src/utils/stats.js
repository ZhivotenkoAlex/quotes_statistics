function getAverageValue(obj) {
  let values = Object.entries(obj);
  let quotesSumm = 0;
  let numOfQuotes = 0;
  for (const entry of values) {
    quotesSumm += entry[0] * entry[1];
    numOfQuotes += entry[1];
  }

  const averageValue = quotesSumm / numOfQuotes;
  return [averageValue.toFixed(3), numOfQuotes];
}

function getStandardDeviation(obj) {
  let data = getAverageValue(obj);
  let array = Object.keys(obj);

  return Math.sqrt(
    array.map((x) => Math.pow(x - data[0], 2)).reduce((a, b) => a + b) / data[1]
  ).toFixed(3);
}

function getMode(obj) {
  let entries = Object.entries(obj);
  let max = 0;
  let mode = 0;
  entries.map(([key, value]) => {
    if (value > max) {
      max = value;
      mode = key;
    }
    return true;
  });
  return mode;
}

function getMedian(obj) {
  let entries = Object.entries(obj);

  let median = 0;
  let NumberOfQuotes = 0;

  for (let entry of entries) {
    NumberOfQuotes += entry[1];
  }
  let halfNumberOfQuotes = Math.round(NumberOfQuotes / 2);

  for (let entry of entries) {
    halfNumberOfQuotes -= entry[1];
    if (halfNumberOfQuotes <= 0) {
      median = entry[0];
      break;
    }
  }
  return median;
}

//I could not come up with lost quotes in this case. I think in this case there will be no lost quotes.

function getLostQuotes(arr) {
  //it`s previous code)))

  // const lostQuotes = arr.reduce((acc, currentEl, currentIndex) => {
  //   let prev =
  //     currentIndex === arr.length - 1 ? currentIndex : currentIndex + 1;

  //   let delta = arr[prev]?.id - currentEl?.id - 1;
  //   return delta > 1 ? (acc += delta) : (acc += 0);
  // }, 0);

  // return lostQuotes;
  return 0;
}

export default function getStatistisc(data, startTime) {
  const averageValue = getAverageValue(data);
  const standartDeviation = getStandardDeviation(data);
  const mode = getMode(data);
  const median = getMedian(data);
  const lostQuotes = getLostQuotes(data);
  const settlementTime = (performance.now() - startTime).toFixed(3);
  return {
    averageValue: averageValue[0],
    standartDeviation,
    mode,
    median,
    lostQuotes,
    settlementTime,
  };
}
