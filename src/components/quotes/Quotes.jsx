import React, { useState, useRef } from "react";
import "./quotes.css";
import getStatistisc from "../../utils/stats";

export default function Quotes() {
  const [data] = useState({});
  const [statistics, setStatistics] = useState({});
  const [active, setActive] = useState(true);

  const socket = useRef();

  //variable for calculating a settlement time
  let startTime = 0;

  //Fills in state "data". when key is in object,
  //function increase value of corresponding key by 1
  function fillData(key) {
    if (!data.hasOwnProperty(key)) {
      data[key] = 1;
    } else {
      data[key]++;
    }
  }

  //started webSocket-session

  const startSocket = () => {
    socket.current = new WebSocket(
      "wss://trade.trademux.net:8800/?password=1234"
    );
    socket.current.onopen = () => {
      startTime = performance.now();
    };
    socket.current.onmessage = (event) => {
      let response = JSON.parse(event.data).value;
      fillData(response);
      setActive(false);
    };
    socket.current.onclose = () => {};
    socket.current.onerror = (error) => {
      console.log(`${error.message}`);
      socket.onclose();
    };
  };

  //assigns a value for statistics handler and writes to state results of statistic calculations

  const statisticHandler = () => {
    let stats = getStatistisc(data, startTime);
    setStatistics(stats);
  };

  return (
    <div className="quotes">
      <h1 className="quotes__title">Stock quotes statistics</h1>
      <div className="quotes__buttons">
        <button className="button" onClick={startSocket}>
          Start
        </button>
        <button className="button" disabled={active} onClick={statisticHandler}>
          Statistics
        </button>
      </div>

      <div className="stats">
        <div className="stats__row">
          <p className="stats__item">Average value:</p>
          <p className="stats__item">
            {statistics.averageValue ? statistics.averageValue : 0}
          </p>
        </div>
        <div className="stats__row">
          <p className="stats__item"> Standard deviation:</p>
          <p className="stats__item">
            {statistics.standartDeviation ? statistics.standartDeviation : 0}
          </p>
        </div>
        <div className="stats__row">
          <p className="stats__item"> Mode:</p>
          <p className="stats__item">{statistics.mode ? statistics.mode : 0}</p>
        </div>
        <div className="stats__row">
          <p className="stats__item"> Median:</p>
          <p className="stats__item">
            {statistics.median ? statistics.median : 0}
          </p>
        </div>
        <div className="stats__row">
          <p className="stats__item"> Number of lost quotes:</p>
          <p className="stats__item">
            {statistics.lostQuotes ? statistics.lostQuotes : 0}
          </p>
        </div>
        <div className="stats__row">
          <p className="stats__item"> Settlement time:</p>
          <p className="stats__item">
            {statistics.settlementTime ? statistics.settlementTime : 0}
          </p>
        </div>
      </div>
    </div>
  );
}
