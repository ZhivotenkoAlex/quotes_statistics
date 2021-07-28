function getStandardDeviation(array) {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  ).toFixed(3);
}

function getAverageValue(array) {
  const n = array.length;
  const averageValue = array.reduce((a, b) => a + b) / n;
  return averageValue.toFixed(3);
}

function getMode(array) {
  return array
    .sort(
      (a, b) =>
        array.filter((v) => v === a).length -
        array.filter((v) => v === b).length
    )
    .pop();
}

function getMedian(array) {
  array.sort(function (a, b) {
    return a - b;
  });
  let median = 0;

  if (array.length % 2 === 0) {
    median = (array[array.length / 2 - 1] + array[array.length / 2]) / 2;
  } else {
    median = array[(array.length - 1) / 2];
  }

  return median;
}

function getLostQuotes(arr) {
  const lostQuotes = arr.reduce((acc, currentEl, currentIndex) => {
    let prev =
      currentIndex === arr.length - 1 ? currentIndex : currentIndex + 1;

    let delta = arr[prev]?.id - currentEl?.id - 1;
    return delta > 1 ? (acc += delta) : (acc += 0);
  }, 0);

  return lostQuotes;
}

export default function getStatistisc(data, startTime, setStatistics) {
  const averageValue = getAverageValue(data);
  const standartDeviation = getStandardDeviation(data);
  const mode = getMode(data);
  const median = getMedian(data);
  const lostQuotes = getLostQuotes(data);
  const settlementTime = (performance.now() - startTime).toFixed(3);
  return {
    averageValue,
    standartDeviation,
    mode,
    median,
    lostQuotes,
    settlementTime,
  };
}
